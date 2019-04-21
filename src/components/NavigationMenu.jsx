import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

import { Link } from "react-router-dom";

class NavigationMenu extends Component {
    state = {}

    handleClick = (e) => {
        let { onClick } = this.props
        onClick && onClick(e.key)
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="home">
                    <Link to="/">
                        <Icon type="home" />Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="login">
                    <Link to="/login">
                        <Icon type="login" />Login
                    </Link>
                </Menu.Item>
                <Menu.Item key="backoffice">
                    <Link to="/backoffice" >
                        <Icon type="setting" />Backoffice
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavigationMenu;