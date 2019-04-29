import React, { Component } from 'react';

import MainMap from '../components/MainMap';
import Categories from '../components/Categories';
import POIFilter from '../components/POIFilter'

import { Row, Col, Menu, Button, Dropdown, Card, Tag } from 'antd';
import Jumbotron from 'react-bootstrap/Jumbotron'


import { categoriesAPI, poiAPI } from '../api';

let defaultMapCenter = [39.9528, -75.1638];

function log(e) {
  console.log(e);
}

class Home extends Component {
  state = {
    mapCenter: defaultMapCenter,
    categories: [],
    poi: [],
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
      let {poi} = state
      let {currentPointId} = state
      return { poi: [ ...poi, {name: name , position: { lat: lat, lng: long}, id: currentPointId + 1 }], currentPointId: currentPointId + 1 }
    });

  }

  render() {
    const { poi, poiFilter } = this.state
    const poiMarkers =
      (poiFilter ? poiFilter(poi) : poi)
        .map(poi => ({
          position: poi.position,
          popUpContent: (<div> Name: {poi.name} <br/> Description: {poi.description}</div>),
          key: poi.id,
        }))

    const markers = [...poiMarkers, {
      position: this.state.mapCenter, popUpContent: (<div> Title: test </div>), key: "mapCenter"
    }]

    const menu_categories =
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.youporn.com/">Category 1</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.xvideos.com/">Category 2</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.pornhub.com/">Category 3</a>
        </Menu.Item>
      </Menu>

    //<Categories data={this.state.categories} />
    //<p>
      //<POIFilter onChange={this.handlePOIFilterChange} poi={poi}></POIFilter>
    //</p>
    //<span className="ant-divider" style={{ margin: '0 1em' }} />
    return (
      <div className="App">
        <Row style={{ background: '#ECECEC', padding: '20px' }}>
          <h1> Customize your search </h1>
        </Row>
        <Row style={{ background: '#ECECEC'}}> <hr className="my-2" /> </Row>
        <Row style={{ background: '#ECECEC', padding: '20px' }}  type="flex" >
          <Col offset={1}>
            <Card
             title="Match if name starts with..."
             style={{ width: 400 }}
            >
              <POIFilter onChange={this.handlePOIFilterChange} poi={poi}></POIFilter>
            </Card>
          </Col>
          <Col offset={1}>
            <Card
             title="Match if belongs to any of the listed categories."
             style={{ width: 400 }}
            >
              <Dropdown overlay={menu_categories} placement="bottomLeft">
                <Button>Add category to list</Button>
              </Dropdown>
              <br /> <br />
              <Tag closable onClose={log} color="magenta">Peluquerias</Tag>
              <Tag closable onClose={log} color="red">Boliches</Tag>
              <Tag closable onClose={log} color="volcano">Deportes</Tag>
              <Tag closable onClose={log} color="orange">orange</Tag>
              <Tag closable onClose={log} color="gold">gold</Tag>
              <Tag closable onClose={log} color="lime">lime</Tag>
              <Tag closable onClose={log} color="green">green</Tag>
              <Tag closable onClose={log} color="cyan">cyan</Tag>
              <Tag closable onClose={log} color="blue">blue</Tag>
              <Tag closable onClose={log} color="geekblue">geekblue</Tag>
              <Tag closable onClose={log} color="purple">purple</Tag>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <MainMap
              style={{ height: '400px' }}
              mapCenter={this.state.mapCenter} markers={markers}
              onClick={this.onClick}
            />
          </Col>
        </Row>

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

      </div>
    );

  }
}

export default Home
