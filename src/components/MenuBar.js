import React, { Component } from 'react'
import {Button, Menu} from 'semantic-ui-react'
import { Outlet, Link } from "react-router-dom";

export default class MenuBar extends Component {

    render() {
        return (
            <Menu>
                <Menu.Item header>
                    <Link to="/" style={{color: 'black'}}> ImIn </Link>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button color='blue'>
                            <Link to="/login" style={{color: 'white'}}> Login </Link>
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
                <Outlet />
            </Menu>
        )
    }
}