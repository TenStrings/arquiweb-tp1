import React, { Component } from 'react';
import { Table, Icon, Button, Switch } from 'antd';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

class BackofficePoints extends Component {
  state = {  }
  render() {
      const columns = [
        {
          title: 'Nombre', width: 200, dataIndex: 'name',
        },
        {
          title: 'Descripción', width: 250, dataIndex: 'description',
        },
        {
          title: 'Latitud', dataIndex: 'lat', width: 100,
        },
        {
          title: 'Longitud', dataIndex: 'long', width: 100,
        },
        {
          title: 'Imagen', dataIndex: 'img', width: 50, //button with card or popUp with image
        },
        {
          title: 'Categoría', dataIndex: 'cat', width: 200,
        },
        {
          title: 'Visible', dataIndex: 'visible', width: 50, //button with card or popUp with image
        },
        {
          title: 'Editar', dataIndex: 'edit', width: 50,
        },
        {
          title: 'Borrar', dataIndex: 'delete', width: 50,
        }
      ];

      const data = [];
      for (let i = 0; i < 100; i++) {
        data.push({
          name: "La facultad",
          description: "Lugar de sabiduría",
          lat: 1.32 ,
          long: 1.34,
          img: "unBoton a img",
          cat: "Deportes",
          visible:   <Switch defaultChecked onChange={onChange}/>,
          edit: <Button type="primary" shape="circle" icon="edit"></Button>,
          delete:<Button type="danger" shape="circle" icon="delete"></Button>
        });
      }
      return ( <Table columns={columns} dataSource={data} scroll={{ y: 600 }} />);
  }
}

export default BackofficePoints;
