import os
import json
import stripe
import boto3
import requests

ssm = boto3.client('ssm')
cognito = boto3.client('cognito-idp')

stripe.api_key = os.environ['STRIPE_SECRET_KEY']
USER_POOL_ID = os.environ['AUTH_IMIN154CCEF5_USERPOOLID']


def lambda_handler(event, context):
    data = json.loads(event['body'])
    print('event data')
    print(data)
    customer_id = data['data']['object']['customer']
    print('customer_id')
    print(customer_id)
    customer = stripe.Customer.retrieve(customer_id)
    print('customer')
    print(customer)

    user_email = customer['email']
    print('user_email')
    print(user_email)
    subscription = stripe.Subscription.list(customer=customer_id).get('data')[0]
    subscription_id = subscription['id']
    print('subscription_id')
    print(subscription_id)

    # Update the database
    update_db_url = f"https://61bwj007f6.execute-api.us-east-1.amazonaws.com/prod/updateImInDB?email={user_email}&customerID={customer_id}&subscriptionID={subscription_id}"
    https_response = requests.post(update_db_url)

    if https_response.status_code == 200:
        print("Database updated successfully")
    else:
        print(f"Error updating database: {https_response.status_code}")

    # Create Cognito user
    try:
        response = cognito.admin_create_user(
            UserPoolId=USER_POOL_ID,
            Username=user_email,
            DesiredDeliveryMediums=['EMAIL'],
            UserAttributes=[
                {'Name': 'email', 'Value': user_email},
            ],
            ValidationData=[
                {'Name': 'email', 'Value': user_email},
            ],
        )
        print(response)
    except Exception as e:
        print("Error creating Cognito user")
        print(e)

    return {
        'statusCode': 200,
        'body': json.dumps('Webhook worked!')
    }
