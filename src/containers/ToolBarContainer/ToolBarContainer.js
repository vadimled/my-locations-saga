import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constStr from "../../utils/constants";
import {Route, withRouter} from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import {connect} from "react-redux";
import * as actions from "../../store/actions";
import {getLocation} from "../../utils/dataBaseHandler";

const PATHNAME = '/entries';

class ToolBarContainer extends Component {

    state = {
        currLocation: ""
    };

    componentDidMount() {
        this.props.history.listen((location) => {
              if (location.pathname  !==  this.state.currLocation &&
                location.pathname.indexOf(PATHNAME) === -1) {
                this.props.onToolbar({flag: true});
            }
            this.setState({currLocation: location.pathname.toString()});
        });
    }

    toolbarHandler = (e, id) => {
        this.props.onPending(true);

        this.props.onToolbar({name: e.target.textContent});
        if (e.target.textContent  === constStr.REMOVE_TOOLBAR) {
            if (id) {
                this.props.deleteItem(id);
                return this.props.history.goBack();
            }
        }
        else if (e.target.textContent  === constStr.EDIT_TOOLBAR) {
            if (id) {
                const item = getLocation(this.props.dBase, id);
                delete item.id;
                this.props.history.push({
                    pathname: PATHNAME,
                    state: {editItem: item, editId: id}
                });
            }
        }
        else{
            this.props.onPending(false);
        }
    };

    onClickModalHandler = (e, id) => {
        if (this.props.tbAction === constStr.REMOVE_TOOLBAR) {
            if (id) {
                this.props.deleteItem(id);
                return this.props.history.goBack();
            }
        }
        if (this.props.tbAction === constStr.EDIT_TOOLBAR) {
            if (id) {
                const item = getLocation(this.props.dBase, id);
                delete item.id;
                this.props.history.push({
                    pathname: PATHNAME,
                    state: {editItem: item, editId: id}
                });
            }
        }
    };

    render() {
        const {mode, customDisabled, onCancelHandler} = this.props;

        return (
            <Route render={(props) => {
                return <ToolBar {...props}
                                mode={mode}
                                clickHandler={this.toolbarHandler}
                                onClickModalButton={this.onClickModalHandler}
                                customDisabled={customDisabled}
                                onCheckBoxCancel={onCancelHandler}/>
            }}/>

        );
    }
}

ToolBarContainer.propTypes = {};

const mapStateToProps = state => {
    return {
        dBase: state.app.db,
        tbAction: state.app.toolbarAction
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToolbar: (data) => dispatch(actions.onToolbarHandler(data)),
        addItem: (data) => dispatch(actions.addDBEntry(data)),
        deleteItem: (id) => dispatch(actions.deleteDBItem(id)),
        editExstItem: (data) => dispatch(actions.editDBItem(data)),
        onPending: (val) => dispatch(actions.onPending(val))
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolBarContainer));
