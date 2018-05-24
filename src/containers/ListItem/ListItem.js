import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {Fade, ListGroupItem} from "reactstrap";
import * as constStr from "../../utils/constants";
import {connect} from "react-redux";
import Popup from "../../components/Popup";

class ListItem extends React.PureComponent {
    state = {
        modal: false
    };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    onCheckBox = (data) => {
        if (this.props.tbAction === constStr.REMOVE_TOOLBAR) {
            this.toggle();
        }
        else if (this.props.tbAction === constStr.EDIT_TOOLBAR) {
            const {clickModalHandler} = this.props;
            clickModalHandler(data);
        }
    };

    onButtonCancel = () => {
        const {onCheckBoxCancel} = this.props;
        onCheckBoxCancel();
        this.toggle();
    };


    render() {
        const {text, id, clickModalHandler, match, className} = this.props;
        const currLocation = match.url === `/categories` ?
            `${match.url}/${text}`
            :
            `${match.url}/${text}?id=${id}`;
        return (
            <React.Fragment>
                <ListGroupItem>
                    <Fade in={true}>
                        <div className="input-group-text mx-3 ">
                            <div className={className["item-container"]}>
                                <div className={className.item}>
                                    <NavLink to={currLocation}
                                             activeClassName="selected-nav"
                                             className="link">
                                        <div className="h4" style={{color: '#893304'}}>"{text}"</div>
                                    </NavLink>
                                    {
                                        this.props.tbAction &&
                                        this.props.tbAction !== constStr.ADD_TOOLBAR &&
                                        <input type="checkbox"
                                               className="text-center"
                                               aria-label="Checkbox for Edit"
                                               onClick={() => this.onCheckBox({text, id})}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </Fade>
                </ListGroupItem>
                <Popup isOpen={this.state.modal}
                       toggle={this.toggle}
                       onClickYes={() => clickModalHandler({text, id})}
                       onClickCancel={this.onButtonCancel}
                       message={`Warning: You are going on to remove some data from the Database!`}/>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        tbAction: state.app.toolbarAction
    }
};

export default withRouter(connect(mapStateToProps)(ListItem));

