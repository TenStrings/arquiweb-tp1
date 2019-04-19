import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const tiles = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
const stamenTonerAttr = 'change this';
const zoomLevel = 12;

class MainMap extends Component {
    state = {}

    markers = () =>
        this.props.markers.map(marker =>
            <Marker position={marker.position} key={marker.key}>
                <Popup>{marker.popUpContent}</Popup>
            </Marker>)

    render() {
        return (
            <Map
                center={this.props.mapCenter}
                zoom={zoomLevel}
                style={{ width: '100%', height: '400px' }}
            >
                <TileLayer
                    attribution={stamenTonerAttr}
                    url={tiles}
                />
                {this.props.markers && this.markers()}
            </Map>
        );
    }
}

export default MainMap;