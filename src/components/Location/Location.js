import React from 'react';
import * as style from './style.scss';
import {ListGroup, ListGroupItem} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import * as constStr from "../../utils/constants";
import {getLocation} from "../../utils/dataBaseHandler";
import Map from "../../containers/GoogleMap";

class Location extends React.Component {
    state = {
        id: null,
        zoom: 11
    };

    componentWillMount() {
        let _id;
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            _id = param[1];
        }

        this.setState({id: _id});

        if (this.props.tBar === constStr.REMOVE_TOOLBAR) {
            this.props.deleteItem(_id);
            this.props.history.goBack();
        }
    };

    render() {
        const data = getLocation(this.props.dBase, this.state.id);
        const center = {lat: Number(data.latitude), lng: Number(data.longitude) };

        return (
            <React.Fragment>
                <div className={style.location}>
                    <div className={style.locationPlate}>
                        <ListGroup>
                            <ListGroupItem>{data.country_name}</ListGroupItem>
                            <ListGroupItem>{data.city}</ListGroupItem>
                            <ListGroupItem>{data.ip}</ListGroupItem>
                            <ListGroupItem>{data.latitude}</ListGroupItem>
                            <ListGroupItem>{data.longitude}</ListGroupItem>
                        </ListGroup>
                    </div>
                    <div className={style.locationMap}>
                        <Map center={center}
                             zoom={this.state.zoom}
                             name={data.city}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        dBase: state.app.db,
        tBar: state.app.toolbarAction,
        isActive: state.app.isActive
    }
};
const mapDispatchToProps = dispatch => {
    return {
        deleteItem: (id) => dispatch(actions.deleteDBItem(id))
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Location));
