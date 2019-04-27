import React, { Component } from 'react';

import MainMap from '../components/MainMap';
import Categories from '../components/Categories';
import POIFilter from '../components/POIFilter'

import { Row, Col } from 'antd';

import { categoriesAPI, poiAPI } from '../api';

let defaultMapCenter = [39.9528, -75.1638];

class Home extends Component {
  state = {
    mapCenter: defaultMapCenter,
    categories: [],
    poi: [],
  }

  updateCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState((state, props) =>
        ({
          mapCenter: [position.coords.latitude, position.coords.longitude],
        })
      )
    })
  }

  onClick = (latlong) => {
    console.log(latlong)
  }

  componentDidMount() {
    this.updateCurrentPosition()

    categoriesAPI.all().then(
      categories => this.setState({ categories: categories })
    )

    poiAPI.all().then(
      poi => this.setState({ poi: poi })
    )
  }

  handlePOIFilterChange = poiFilter => {
    this.setState({ poiFilter: poiFilter })
  }

  handleCategorySubmit  = (event) => {
    event.preventDefault();
    const name = event.target[0].value
    /* aca habria que persistir la categoria*/
    this.setState(state => {
      let {categories} = state
      return { categories: [ ...categories, {title: name , icon: "idk4" }] }
    });
  }

  render() {
    const { poi, poiFilter } = this.state
    const poiMarkers =
      (poiFilter ? poiFilter(poi) : poi)
        .map(poi => ({
          position: poi.position,
          popUpContent: (<div> Nombre: {poi.name} </div>),
          key: poi.id,
        }))

    const markers = [...poiMarkers, {
      position: this.state.mapCenter, popUpContent: (<div> Title: test </div>), key: "mapCenter"
    }]

    return (
      <div className="App">
        <Row>
          <Col>
            <h1> Mapa mágico de categorías </h1>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={4}>
            <Categories
              data={this.state.categories} />
          </Col>
          <Col span={20}>
            <POIFilter onChange={this.handlePOIFilterChange} poi={poi}></POIFilter>
            <MainMap
              style={{ height: '400px' }}
              mapCenter={this.state.mapCenter} markers={markers}
              onClick={this.onClick} />
          </Col>
          <form onSubmit={this.handleCategorySubmit}>
          <label>
            Category name:
            <input type="text" name="name" />
          </label>
            <input type="submit" value="Add category" />
          </form>
        </Row>
      </div>
    );
  }
}

export default Home
