import React, { Component } from 'react';

import MainMap from '../components/MainMap';
import Categories from '../components/Categories';

import { Row, Col } from 'antd';

import { categoriesAPI, poiAPI } from '../api';

let defaultMapCenter = [39.9528, -75.1638];

class Home extends Component {
  state = { mapCenter: defaultMapCenter, categories: [], poi: [] }

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

  render() {

    let poiMarkers = this.state.poi.map(poi => ({
      position: poi.position,
      popUpContent: (<div> Title: super interesting point </div>),
      key: poi.id,
    }))

    let markers = [...poiMarkers, {
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
            <MainMap
              style={{ height: '400px' }}
              mapCenter={this.state.mapCenter} markers={markers}
              onClick={this.onClick} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home
