import React, { Component } from 'react';
import { Table, Icon, Button, Switch } from 'antd';
import { poiAPI, categoriesAPI } from '../api';
import axios from 'axios'


class BackofficePoints extends Component {
  state = { loading: {} }

  /*
  getPoints = () => poiAPI.all().then(points => this.setState({ points: points }))

  getCategories = () => categoriesAPI.all().then(
    categories => this.setState({ categories: categories })
  )
  componentDidMount() {
    this.getCategories()
    this.getPoints()
  }*/

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

  updatePoint = (point) => axios.put('http://localhost:4000/point/' + point._id, point)
  .then(res => {
    this.props.notifyPoiChange()
    //this.toggleLoading(point._id)
  }).catch( () => console.log("BackofficePoints failed to update point"));

  onChange = (checked, pointId) => {
    const { userContext } = this.props
    //this.toggleLoading(pointId)
    let pointToUpdate = this.props.points.find(point => point._id == pointId)
    pointToUpdate.visible = !checked
    this.updatePoint(pointToUpdate)
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
        title: 'Longitud', dataIndex: 'lng', width: 100,
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

    const { loading } = this.state;
    const { points, categories } = this.props;

    const data = points && categories && points.map(
      point => ({
        key: point._id,
        name: point.name,
        lat: point.position.lat,
        lng: point.position.lng,
        description: point.description,
        img: "unBoton a img",
        cat: point.categoryName,
        visible: <Switch loading={loading[point._id]} defaultChecked={point.visible} onChange={checked =>
          this.onChange(checked, point._id)
        } />,
        edit: <Button type="primary" shape="circle" icon="edit"></Button>,
        delete: <Button type="danger" shape="circle" icon="delete"></Button>
      })
    )

    return (<Table columns={columns} dataSource={data} scroll={{ y: 600 }} />);
  }
}

export default BackofficePoints;
