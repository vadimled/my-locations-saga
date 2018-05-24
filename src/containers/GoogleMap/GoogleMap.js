import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({text}) => <div style={{color: "red"}}>{text}</div>;

export default class Map extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 15
    };

    render() {
        const {center, zoom} = this.props;

        return (
            <div className='google-map' style={{width: "40vw"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyBwr1Xw7sjOXdkH2rylQEwxs_r-KOyuaCE"}}
                    defaultCenter={Map.defaultProps.center}
                    defaultZoom={Map.defaultProps.zoom}
                    zoom={zoom}
                    center={center}>
                     <AnyReactComponent
                        lat={center.lat}
                        lng={center.lng}
                        text={`Target`}
                    />
                </GoogleMapReact>
            </div>
        )
    }
}