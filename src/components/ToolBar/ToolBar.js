import React, {Component} from 'react';
import {Button, ButtonGroup, ButtonToolbar} from "reactstrap";
import * as constStr from "../../utils/constants";
import * as css from './style.scss'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import LinkButton from "../LinkButton";
import * as actions from "../../store/actions";
import Popup from "../Popup";

class ToolBar extends Component {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    onClickToolbar = (e, id) => {
        if (e.target.innerText === constStr.REMOVE_TOOLBAR && id) {
            this.props.onToolbar({name: constStr.REMOVE_TOOLBAR});
            this.toggle();
        }
    };

    onButtonCancel = () => {
        const {onCheckBoxCancel} = this.props;
        onCheckBoxCancel();
        this.toggle();
    };

    getLocationId = () => {
        let _id;
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            _id = param[1];
        }
        return _id;
    };

    onModalButtonClick = (e, id) => {
        const {onClickModalButton} = this.props;
        onClickModalButton(e, id);
        this.toggle();
    };

    render() {
        const {clickHandler, customDisabled} = this.props;
        const [add, edit] = customDisabled;
        const id = this.getLocationId();
        return (
            <ButtonToolbar className={css.category}>
                <ButtonGroup>
                    {
                        !edit && <Button className="btn btn-info btn-lg btn-block my-2 mx-1"
                                         onClick={(e) => clickHandler(e, id)} disabled={!this.props.active}>
                            <span>{constStr.EDIT_TOOLBAR}</span></Button>
                    }
                    {
                        !add && <LinkButton to='/entries' className="btn btn-info btn-lg btn-block my-2 mx-1"
                                            onClick={clickHandler}
                                            disabled={!this.props.active}><span>{constStr.ADD_TOOLBAR}</span></LinkButton>

                    }
                    {
                        <Button className="btn btn-info btn-lg btn-block my-2 mx-1"
                                onClick={id ? (e) => this.onClickToolbar(e, id) : clickHandler}
                                disabled={!this.props.active}>
                            <span>{constStr.REMOVE_TOOLBAR}</span>
                        </Button>

                    }
                    <Popup isOpen={this.state.modal}
                           toggle={this.toggle}
                           onClickYes={(e) => this.onModalButtonClick(e, id)}
                           onClickCancel={this.onButtonCancel}
                           message={`Warning: You are going on to remove some data from the Database!`}/>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
}

ToolBar.propTypes = {};

const mapStateToProps = state => {
    return {
        active: state.app.isActive // "props.active=false" if all buttons must be disabled

    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToolbar: (data) => dispatch(actions.onToolbarHandler(data)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolBar));
