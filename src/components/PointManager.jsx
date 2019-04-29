import React from 'react';
import { Table } from 'antd';

class PointManager extends React.Component {

    state = {  }

    render() {
        const columns = [
          {
            title: 'Nombre', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
          },
          {
            title: 'Descripción', width: 100, dataIndex: 'age', key: 'age', fixed: 'left',
          },
          {
            title: 'Latitud', dataIndex: 'address', key: '1', width: 150,
          },
          {
            title: 'Longitud', dataIndex: 'address', key: '2', width: 150,
          },
          {
            title: 'Imagen', dataIndex: 'address', key: '3', width: 150,
          },
          {
            title: 'Categoría', dataIndex: 'address', key: '4', width: 150,
          },
          {
            title: 'Editar', dataIndex: 'address', key: '5', width: 150,
          },
          {
            title: 'Borrar', dataIndex: 'address', key: '6', width: 150,
          }
        ];

        const data = [];
        for (let i = 0; i < 100; i++) {
          data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
          });
        }
        return ( <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />);
    }
}

export default PointManager;
