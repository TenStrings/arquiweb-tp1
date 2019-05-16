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
    //console.log(res.data);
    this.setState({points : res.data});
  });

  onChange = (checked, pointId) => {
    const { userContext } = this.props

    const toggleLoading = () => this.toggleLoading(pointId)

    if (checked) {
      let pointToUpdate = this.props.points.find(point => point._id == pointId)
      pointToUpdate.visible = false
      console.log("showingngngngngn pointsssss")
      console.log(pointToUpdate)
      this.updatePoint(pointToUpdate)
    }
    else {
      let pointToUpdate = this.props.points.find(point => point._id == pointId)
      pointToUpdate.visible = true
      console.log("showingngngngngn pointsssss")
      console.log(pointToUpdate)
      this.updatePoint(pointToUpdate)

    }
    this.props.notifyPoiChange()
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

    const { loading } = this.state;
    const { points, categories } = this.props;

    const data = points && categories && points.map(
      point => ({
        key: point._id,
        name: point.name,
        lat: point.position.lat,
        long: point.position.long,
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
