import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import icon from 'leaflet/dist/images/marker-icon.png';

class Categories extends Component {
    state = {}
    render() {
        let {data} = this.props
        return (
            <div style={{ ...this.props.style }}>
                <h1> Categorias </h1>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar size="small" src={icon} />}
                        title={item.title}
                        />
                    </List.Item>
                    )}
                />
                    {this.props.children}
            </div>
        );
    }
}

export default Categories;
