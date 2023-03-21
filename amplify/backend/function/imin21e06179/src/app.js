/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["stripe_key"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	AUTH_IMIN154CCEF5_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const https = require('https');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const aws = require('aws-sdk')
let customer;
let userEmail;
let customerID;
let subscriptionID;

const app = express()
app.use(bodyParser.json({
  verify : function (req, res, buf) {
    req.rawBody = buf.toString()
  }
}))
app.use(awsServerlessExpressMiddleware.eventContext())
const getStripeSecret = async () => {
  const { Parameters } = await (new aws.SSM())
      .getParameters({
        Names: ["stripe_key"].map(secretName => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();
    return Parameters[0].Value
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// app.post('/webhook', async function(req, res) {
//   const stripeKey = "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"
//   const stripe = require('stripe')(stripeKey)
//   customer =  await stripe.customers.retrieve(req.body.data.object.customer)
//   console.log("customer object "+customer)
//   userEmail = customer.email
//   customerID = customer.id
//   stripe.subscriptions.list({ customer: customerID }, async (err, subscriptions) => {
//     if (err) {
//       console.error(err);
//       console.error("shit out of luck");
//     } else {
//       subscriptionID = subscriptions.data[0].id;
//       console.log(`The customer's subscription ID is: ${subscriptionID}`);
//     }
//   });
//   console.log('customer ID '+ customerID);
//   console.log('subscription ID '+ subscriptionID);
//   console.log('customer email '+ userEmail);
//
//   const cognito = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'})
//   return new Promise((resolve, reject) => {
//     cognito.adminCreateUser({
//       UserPoolId: process.env.AUTH_IMIN154CCEF5_USERPOOLID,
//       Username: userEmail,
//       DesiredDeliveryMediums: ['EMAIL'],
//       UserAttributes: [
//         {Name: 'email', Value: userEmail},
//       ],
//       ValidationData: [
//         {Name: 'email', Value: userEmail},
//       ],
//     }, function (err, data) {
//       if (err) {
//         console.log(err)
//         reject(err)
//       } else {
//         console.log(data)
//
//         resolve(data)
//       }
//     })
//     // res.json({success: 'post call succeed!', url: req.url, body: req.body})
//   }).then(() => {
//     // make API POST call here
//     // ...
//     console.log("we got to the API call");
//     const options = {
//       method: 'post'
//     };
//
//     const queryString = `?email=${userEmail}&customerID=${customerID}&subscriptionID=${subscriptionID}`;
//     const url = `https://61bwj007f6.execute-api.us-east-1.amazonaws.com/prod/updateImInDB${queryString}`;
//     console.log("right before the https request");
//     const req = https.request(url, options, res => {
//       console.log(`statusCode: ${res.statusCode}`);
//       console.log("in the https request")
//
//       res.on('data', d => {
//         let data = '';
//         data += d;
//         console.log(data);
//         console.log("Holy Shit it worked");
//       });
//     });
//
//     req.on('error', error => {
//       console.error(`There was a problem with the https request: ${error}`);
//     });
//
//     req.end();
//     res.sendStatus(200)
//   }).catch(err => {
//     console.log("Didnt work but tried")
//     console.log(err)
//   });
// });

app.post('/webhook', async function(req, res) {
  const stripeKey = "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"
  const stripe = require('stripe')(stripeKey)
  const customer = await stripe.customers.retrieve(req.body.data.object.customer)
  console.log("customer object "+customer)
  const userEmail = customer.email
  const customerID = customer.id
  let subscriptionID = null;
  stripe.subscriptions.list({ customer: customerID }, async (err, subscriptions) => {
    if (err) {
      console.error(err);
      console.error("shit out of luck");
    } else {
      subscriptionID = subscriptions.data[0].id;
      console.log(`The customer's subscription ID is: ${subscriptionID}`);
      console.log('customer ID '+ customerID);
      console.log('subscription ID '+ subscriptionID);
      console.log('customer email '+ userEmail);

      const queryString = `?email=${userEmail}&customerID=${customerID}&subscriptionID=${subscriptionID}`;
      const url = `https://61bwj007f6.execute-api.us-east-1.amazonaws.com/prod/updateImInDB${queryString}`;
      console.log("right before the https request");
      const req = await https.request(url, { method: 'post' }, response => {
        console.log(`statusCode: ${response.statusCode}`);
        console.log("in the https request")

        response.on('data', d => {
          let data = '';
          data += d;
          console.log(data);
          console.log("Holy Shit it worked");
        });
      });

      req.on('error', error => {
        console.error(`There was a problem with the https request: ${error}`);
      });

      req.end();
      res.sendStatus(200);

      const cognito = new aws.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'})
      try {
        const data = await cognito.adminCreateUser({
          UserPoolId: process.env.AUTH_IMIN154CCEF5_USERPOOLID,
          Username: userEmail,
          DesiredDeliveryMediums: ['EMAIL'],
          UserAttributes: [
            {Name: 'email', Value: userEmail},
          ],
          ValidationData: [
            {Name: 'email', Value: userEmail},
          ],
        }).promise();

        console.log(data)

      } catch (err) {
        console.log("Didnt work but tried")
        console.log(err)
      }
    }
  });
});






app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
