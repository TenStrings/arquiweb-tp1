import React, { Component } from 'react';
import { Table, Icon, Button, Switch } from 'antd';
import { poiAPI, categoriesAPI } from '../api';

class BackofficePoints extends Component {
  state = { loading: {} }

  getPoints = () => poiAPI.all().then(points => this.setState({ points: points }))

  getCategories = () => categoriesAPI.all().then(
    categories => this.setState({ categories: categories })
  )

  componentDidMount() {
    this.getCategories()
    this.getPoints()
  }

  toggleLoading(pointId) {
    this.setState(
      prevState => {
        const { loading } = prevState
        const newLoading = Object.assign({}, loading)
        newLoading[pointId] = !loading[pointId]
        return { loading: newLoading }
      }
    )
  }

  onChange = (checked, pointId) => {
    const { userContext } = this.props

    const toggleLoading = () => this.toggleLoading(pointId)
    toggleLoading()

    if (checked) {
      poiAPI.hide(pointId, userContext.token).then(
        toggleLoading
      )
    }
    else {
      poiAPI.show(pointId, userContext.token).then(
        toggleLoading
      )
    }
  }

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

    const { points, categories, loading } = this.state;

    const data = points && categories && points.map(
      point => ({
        key: point.id,
        name: point.name,
        lat: point.position.lat,
        long: point.position.long,
        description: point.description,
        img: "unBoton a img",
        cat: categories.find(category => category.id == point.category).title,
        visible: <Switch loading={loading[point.id]} defaultChecked={point.visible} onChange={checked =>
          this.onChange(checked, point.id)
        } />,
        edit: <Button type="primary" shape="circle" icon="edit"></Button>,
        delete: <Button type="danger" shape="circle" icon="delete"></Button>
      })
    )

    return (<Table columns={columns} dataSource={data} scroll={{ y: 600 }} />);
  }
}

export default BackofficePoints;
