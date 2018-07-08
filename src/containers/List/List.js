import React from 'react';
import * as constStr from "../../utils/constants";
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import {uniqueId} from "lodash/util";
import {withRouter} from "react-router-dom";
import ListItem from "../ListItem";
import * as css from './style.scss';
import {Button, ButtonGroup, ListGroup} from "reactstrap";
import {getArray, getCountriesList, getLocation} from "../../utils/dataBaseHandler";
// import {CircleLoader} from "react-spinners";

class List extends React.Component {
  
  componentWillMount() {
    const {tbAction} = this.props;
    !tbAction && this.props.setFilterState(1);
  }
  
  radio = i => this.props.setFilterState(i);
  
  onAlphabetSort = (arr) => {
    return arr.sort((a, b) => {
      const nA = a[1].toUpperCase();
      const nB = b[1].toUpperCase();
      if (nA < nB) {
        return -1;
      }
      if (nA > nB) {
        return 1;
      }
      return 0;
    });
  };
  
  
  onModalCancel = () => {
    return this.props.onToolbar({flag: true})
  };
  
  listItemCheckboxHandler = (data) => {
    const {tbAction, match} = this.props;
    const regLocation = RegExp("/locations|categories/+");
    const regCategory = RegExp("/categories$");
    
    if (tbAction === constStr.REMOVE_TOOLBAR) {
      if (regLocation.test(match.path))
        return this.props.deleteItem(data.id);
      else if (regCategory.test(match.path)) {
        const forDel = Object.keys(this.props.dBase).filter(id => this.props.dBase[id].country_name === data.text);
        return this.props.deleteCategory(forDel);
      }
    }
    else if (tbAction === constStr.EDIT_TOOLBAR) {
      this.props.onPending(true);
      const item = getLocation(this.props.dBase, data.id);
      delete item.id;
      this.props.history.push({
        pathname: '/entries',
        state: {editItem: item, editId: data.id}
      });
    }
  };
  
  render() {
    let content = (<div></div>);
    const {dBase, mode, match} = this.props;
    
    let items = (
      mode === constStr.CATEGORIES ?
        dBase && getCountriesList(dBase)
        :
        dBase && getArray(dBase, this.props.param)
    );
    
    if (items && items.length > 0) {
      if (this.props.radio === 2) {
        items = this.onAlphabetSort(items);
      }
      content = items.map((item) => {
          return (
            <ListItem key={uniqueId("LD_")}
                      id={item[0]}
                      className={css}
                      text={item[1]}
                      clickModalHandler={this.listItemCheckboxHandler}
                      onCheckBoxCancel={this.onModalCancel}/>
          )
        }
      )
    }
    
    const regLocation = RegExp("/locations|categories/+");
    
    return (
      <React.Fragment>
         {regLocation.test(match.path) &&
          <div className={css["radio-group"]}>
            <div className={css["radio-title"]}>Sort by</div>
            <ButtonGroup>
              <Button color="primary" onClick={() => this.radio(1)}
                      active={this.props.radio === 1}>None</Button>
              <Button color="primary" onClick={() => this.radio(2)}
                      active={this.props.radio === 2}>Alphabet</Button>
            </ButtonGroup>
          </div>}
        <ListGroup className="list-group mx-3 ">
{/*
          <CircleLoader
            color={'#3BA2B9'}
             loading={this.props.pending}
          />
*/}
          {content}
        </ListGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dBase: state.app.db,
    tbAction: state.app.toolbarAction,
    currLocation: state.app.location,
    radio: state.app.filter,
    pending: state.app.pending
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onToolbar: (data) => dispatch(actions.onToolbarHandler(data)),
    deleteCategory: (data) => dispatch(actions.deleteDBCategory(data)),
    deleteItem: (id) => dispatch(actions.deleteDBItem(id)),
    setFilterState: (val) => dispatch(actions.setFilterState(val)),
    onPending: (val) => dispatch(actions.onPending(val))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
