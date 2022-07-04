import React, { Component } from 'react'
import {Button, Container, Header} from "semantic-ui-react";
import '../styles/LandingPage.css'
import {Link} from "react-router-dom";
import MenuBar from "./MenuBar";

export default class LandingPage extends Component {

    render() {
        const TextContainer = () => (
            <div style={{marginTop : '10vh'}}>
                <Container textAlign='center' style={{color : 'white'}} fluid>
                    <Header as='h1' style={{color : 'white'}}>Welcome to ImIn</Header>
                    <h2>
                        the registration tool everyone has wanted is finally here

                    </h2>
                    <h2>
                        Never get locked out of your classes again with ImIn
                    </h2>
                </Container>
            </div>
        )
        return (
            <div className='container'>
                <MenuBar/>
                    <TextContainer />
                    <div className="Get-Started">
                        <Button size='big' color='white' inverted>

                            <Link to="/login" style={{color: 'white'}}> Start Registering </Link>

                        </Button>
                    </div>
            </div>
        )
    }
}