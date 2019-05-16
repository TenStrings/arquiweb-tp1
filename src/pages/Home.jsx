import React, { Component } from 'react';

import MainMap from '../components/MainMap';
import Categories from '../components/Categories';
import POIFilter from '../components/POIFilter'
import axios from 'axios'
import CategoryFilter from '../components/CategoryFilter'

import { Row, Col, Menu, Button, Dropdown, Card, Tag, Layout, Icon, Checkbox } from 'antd';

import { categoriesAPI, poiAPI } from '../api';

let defaultMapCenter = [39.9528, -75.1638];


class Home extends Component {
  NoFilter = function(points){return points}

  state = {
    mapCenter: defaultMapCenter,
    nameFilter: this.NoFilter,
    categoryFilter : this.NoFilter,
    currentPointId: 9
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

  }

  setNameFilter = aFilter => {
    this.setState({ nameFilter: aFilter })
  }

  setCategoryFilter = aFilter => {
    this.setState({ categoryFilter: aFilter })
  }


  handleCategorySubmit  = event => {
    event.preventDefault();
    const name = event.target[0].value
    /* aca habria que persistir la categoria*/
    this.setState(state => {
      let {categories} = state
      return { categories: [ ...categories, {title: name , icon: "idk4" }] }
    });
  }

  handlePointSubmit = (event) => {
    event.preventDefault();
    const name = event.target[0].value
    const lat = event.target[1].value
    const long = event.target[2].value
    alert(name)

    this.setState(state => {
      let {points} = state
      let {currentPointId} = state
      return { points: [ ...points, {name: name , position: { lat: lat, lng: long}, id: currentPointId + 1 }], currentPointId: currentPointId + 1 }
    });

  }

  render() {
    console.log("rendering home")
    console.log(this.props.categories)
    const { Header, Footer, Sider, Content } = Layout;
    const { nameFilter, categoryFilter} = this.state;
    const { points, categories} = this.props;
    console.log("home points")
    console.log(points)
    const filteredPoints = nameFilter(categoryFilter(points));
    const markers = filteredPoints.map(point => ({
          position: point.position,
          popUpContent: (<div> Name: {point.name} <br/> Description: {point.description}</div>),
          key: point.id,
        }))

    const mapMarkers = [...markers, {
      position: this.state.mapCenter, popUpContent: (<div> Title: myCurrentLocation </div>), key: "mapCenter"
    }]

    return (
      <div className="App">
          <Layout>
            <Content>

              <Row id="Mapa">
                <Col>
                  <MainMap
                    style={{ height: '600px' }}
                    mapCenter={this.state.mapCenter} markers={mapMarkers}
                    onClick={this.onClick}
                  />
                </Col>
              </Row>

              <Row style={{ background: '#ECECEC'}}> <hr className="my-2" /> </Row>

              <Row id="Filtros" style={{ background: '#ECECEC', padding: '20px' }}  type="flex" >
                <Col offset={1}>
                  <Card
                   title="Match if name starts with..."
                   style={{ width: 300 }}>
                    <POIFilter onChange={this.setNameFilter} poi={points}></POIFilter>
                  </Card>
                </Col>
                <Col offset={1}>
                  <Card
                    title="Match if belongs to any of the listed categories."
                    style={{ width: 500 }}>
                      <CategoryFilter
                        key={categories}
                        updateMapWith={this.setCategoryFilter}
                        categories={categories} >
                      </CategoryFilter>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
          <Footer>
            <form onSubmit={this.handleCategorySubmit}>
              <input type="text" name="categoryName" placeholder="Category name" />
              <input type="submit" value="Add category" />
            </form>

            <form onSubmit={this.handlePointSubmit}>
              <input type="text" name="name" placeholder="Point name" />
              <input type="number" name="name" placeholder="latitude" />
              <input type="number" name="name" placeholder="longitude" />
              <input type="submit" value="Add Point" />
            </form>
          </Footer>

      </div>
    );

  }
}

export default Home
