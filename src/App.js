import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Switch, withRouter} from 'react-router-dom';
import * as actions from "./store/actions";
import EntriesHandler from './components/EntriesHandler';
import * as constStr from "./utils/constants";
import * as style from './App'
import Location from "./components/Location";
import List from "./containers/List";
import toolbarButtonsVisibility from "./utils/toolBarUtilities";
import ToolBarContainer from './containers/ToolBarContainer';
import Footer from "./containers/Footer";
import Loader from 'react-loader-spinner'

class App extends Component {
  
  componentDidMount() {
    this.props.onGetDB();
  }
  
  setToolbarActive = () => {
    return this.props.onToolbar({flag: true})
  };
  
  formSubmit = (event, data, id) => {
    if (this.props.tbAction === constStr.ADD_TOOLBAR) {
      this.props.addItem(data);
    }
    else if (this.props.tbAction === constStr.EDIT_TOOLBAR) {
      this.props.editExstItem({edited: data, id});
      this.props.history.goBack();
    }
    
  };
  
  formClose = () => {
    this.props.onToolbar({flag: true});
    this.props.history.goBack();
  };
  
  onGetCoordinates = (model) => {
    model && this.props.onGetCoord(model);
  };
  
  render() {
    const {location} = this.props;
    const customDisabled = toolbarButtonsVisibility(location);
    return (
      <div className={style["app-wrapper"]}>
        <main role="main" className="container">
          {this.props.pending ?
            <Loader type="ThreeDots"
                    color="#3BA2B9"
                    height={40}
                    width={40}/>
            :
            <Route render={(props) => {
              return <ToolBarContainer {...props}
                                       mode={constStr.BUTTON}
                                       clickHandler={this.toolbarHandler}
                                       customDisabled={customDisabled}
                                       onCancelHandler={this.setToolbarActive}/>
            }}/>
          }
          <Switch>
            <Route path="/categories" exact component={
              () => <List mode={constStr.CATEGORIES}/>
            }/>
            <Route path="/locations" exact component={
              () => <List mode={constStr.LOCATIONS}/>
            }/>
            <Route path="/categories/:list"
                   exact component={
              ({match}) => <List param={match.params.list}/>
            }/>
            <Route path="/entries" exact component={
              ({match}) => <EntriesHandler param={match}
                                           handleSubmit={this.formSubmit}
                                           close={this.formClose}
                                           getCoordinates={this.onGetCoordinates}/>
            }/>
            <Route path="/locations/:item" exact component={Location}/>
            <Route path="/categories/:list/:item" exact component={Location}/>
          </Switch>
          <Footer activate={this.setToolbarActive}/>
        </main>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onGetDB: () => dispatch(actions.fetchDB()),
    onToolbar: (data) => dispatch(actions.onToolbarHandler(data)),
    addItem: (data) => dispatch(actions.addDBEntry(data)),
    deleteItem: (id) => dispatch(actions.deleteDBItem(id)),
    editExstItem: (data) => dispatch(actions.editDBItem(data)),
    onGetCoord: (model) => dispatch(actions.getCoordinates(model))
  }
};

const mapStateToProps = state => {
  return {
    dBase: state.app.db,
    active: state.app.isActive,
    tbAction: state.app.toolbarAction,
    pending: state.app.pending
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
