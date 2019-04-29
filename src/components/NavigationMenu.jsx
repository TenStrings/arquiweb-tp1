import React, { Component } from 'react';
import { Menu, Submenu, Icon, Button, Dropdown } from 'antd';

import { Link } from "react-router-dom";
import Login from '../pages/Login';

const SubMenu = Menu.SubMenu;

class NavigationMenu extends Component {
    state = { loginModalShow: false };

    handleClick = (e) => {
        let { onClick } = this.props
        onClick && onClick(e.key)
    }

    render() {
        let loginModalClose = () => this.setState({ loginModalShow: false });
        const menu_colaborate =
          <Menu>
            <Menu.Item>
              <a>Add marker</a>
            </Menu.Item>
            <Menu.Item>
              <a>Suggest new category</a>
            </Menu.Item>

          </Menu>
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="map">
                    <Link to="/">
                          <Icon type="pushpin" />Map
                    </Link>
                </Menu.Item>

                <SubMenu title={<span><Icon type="tags" />Colaborate</span>}>
                  <Menu.Item key="addPoint">Add new marker</Menu.Item>
                  <Menu.Item key="suggestCat"> Suggest new category</Menu.Item>
                </SubMenu>

                <SubMenu title={<span><Icon type="setting" />Backoffice</span>}>
                  <Menu.Item key="addPoint">
                      <Link to="/backoffice_points"></Link>
                      Manage markers
                  </Menu.Item>
                  <Menu.Item key="suggestCat">
                      <Link to="/backoffice_categories"></Link>
                      Manage categories
                  </Menu.Item>
                </SubMenu>

                <Menu.Item key="login">
                <Link to="/login">
                    <Icon type="login" />Login
                </Link>
                </Menu.Item>

                <Menu.Item key="signUp">
                    <Link to="/login">
                        <Icon type="form" />Sign up
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default NavigationMenu;
