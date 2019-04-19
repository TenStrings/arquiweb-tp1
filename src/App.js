import React, { Component } from 'react';
import './App.css';
import MainMap from './components/MainMap';

let defaultMapCenter = [39.9528, -75.1638];

class App extends Component {

  state = { mapCenter: defaultMapCenter }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState((state, props) =>
        ({
          mapCenter: [position.coords.latitude, position.coords.longitude],
        })
      )
    })
  }

  render() {
    let markers = [{
      position: this.state.mapCenter, popUpContent: (<div> Title: test </div>), key: "mapCenter"
    }]

    return (
      <div className="App">
        <div>
          <h1> Mapa mágico de categorías </h1>
        </div>
        <MainMap style={{height: "50%"}} mapCenter={this.state.mapCenter} markers={markers} />
        <div>
          <h1> Footer </h1>
        </div>
      </div>
    );
  }
}

export default App;
