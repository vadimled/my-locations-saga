import React, {Component} from 'react';
import {Button, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon, Label} from 'reactstrap';
import {AvFeedback, AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';

import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {isEqual} from "lodash/lang";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import * as constStr from "../../utils/constants";

class EntriesHandler extends Component {
  
  state = {
    ready: false,
    city: ''
  };
  
  componentWillMount() {
    const {location, model} = this.props;
    if (!this.props.tbAction) {
      this.setState({ready: true});
    }
    else if (this.props.tbAction === constStr.EDIT_TOOLBAR) {
      const editId = location.state && location.state.editItem;
      
      let promise = new Promise((res) => {
          if (!model && editId) {
            res(this.props.setEditModel(editId));
          }
        }
      );
      promise.then(
        () => this.setState({ready: true})
      )
    }
    else if (this.props.tbAction === constStr.ADD_TOOLBAR) {
      this.setState({ready: true});
    }
  }
  
  componentWillReceiveProps(newProps) {
    let promise = new Promise((res) => {
        if (newProps.model) {
          res(
            setTimeout(() => {
              console.log("Result:")
            }, 1000)
          );
        }
      }
    );
    promise.then(
      () => this.setState({ready: true})
    );
  }
  
  componentWillUnmount() {
    this.props.onDefaultEditModel();
  }
  
  setToUpperCase = (value) => {
    const reg1 = /(\b[a-z](?!\s))/g;
    return value.replace(reg1, x => x.toUpperCase());
  };
  
  correctData = (data) => {
    return {
      ...data,
      ...{
        country_name: this.setToUpperCase(data.country_name),
        city: this.setToUpperCase(data.city)
      }
    }
  };
  
  onSubmit = (event, val, errors) => {
    const {handleSubmit, location} = this.props;
    
    const correctData = this.correctData(val);
    if (this.props.tbAction === constStr.EDIT_TOOLBAR) {
      const {editItem, editId} = location.state;
      if (isEqual(correctData, editItem)) {
        this.setState({errors: errors || "Nothing changed!"});
      }
      else {
        this.props.setEditModel(correctData);
        handleSubmit(event, correctData, editId);
      }
    }
    else if (this.props.tbAction === constStr.ADD_TOOLBAR) {
      handleSubmit(event, correctData);
      this.props.model && this.props.cleanEditModel();
    }
  };
  
  resetForm = () => {
    this.props.model && this.props.cleanEditModel();
    this.form && this.form.reset();
  };
  
  onChange = (event) => {
    this.setState({city: event.target.value});
  };
  
  onGet = (city) => {
    if (!city)
      return;
    const {getCoordinates} = this.props;
    const {country_name, ip} = this.form._inputs;
    const model = {
      country_name: this.setToUpperCase(country_name.value),
      ip: ip.value,
      city: this.setToUpperCase(city)
    };
    getCoordinates(model);
    this.setState({ready: false});
  };
  
  render() {
    const {model} = this.props;
    
    return <Container>
      {(this.state.ready) &&
      <Col sm="12" md={{size: 8, offset: 2}}>
        <AvForm onValidSubmit={this.onSubmit}
                ref={form => this.form = form}
                model={model}>
          <AvGroup>
            <Label for="country_name">Country</Label>
            <AvInput name="country_name" type='text' id="countryName" maxLength="45" required/>
            <AvFeedback>Must be 45 characters or less!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="city">City</Label>
            <AvInput name="city" type='text' id="city" maxLength="85" onChange={this.onChange}
                     required/>
            <AvFeedback>Must be 45 characters or less !</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="ip">IP</Label>
            <AvInput name="ip" type='text' id="ip"
                     validate={{pattern: {value: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/}}}
                     required/>
            <AvFeedback>Invalid IP address.</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="coordinate">Try to get coordinates from Google Maps</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend"><Button
                onClick={() => this.onGet(this.state.city)}>Get</Button></InputGroupAddon>
              <Input name="coordinates" value={this.state.city}/>
            </InputGroup>
          </AvGroup>
          <AvGroup>
            <Label for="latitude">Latitude</Label>
            <AvField name="latitude" type='number' id="latitude"
                     validate={{pattern: {value: /\S*(-?\d+(\.\d+)?)/}}} required/>
            <AvFeedback>Invalid Latitude value.</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label for="longitude">Longitude</Label>
            <AvField name="longitude" type='number' id="longitude"
                     validate={{pattern: {value: /\S*(-?\d+(\.\d+)?)/}}} required/>
            <AvFeedback>Invalid Longitude value.</AvFeedback>
          </AvGroup>
          
          <FormGroup>
            <Button id='popover1' color="primary">Save</Button>{'  '}
            <Button color="secondary" onClick={this.resetForm}>Clear Values</Button>
            <Button color="info" className="float-right" onClick={this.props.close}>Close</Button>
          </FormGroup>
        </AvForm>
      </Col>
      }
    </Container>;
  }
}

EntriesHandler.propTypes = {
  close: PropTypes.func,
  handleSubmit: PropTypes.func,
  tbAction: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    setEditModel: (data) => dispatch(actions.onSetCurrentEditModel(data)),
    cleanEditModel: () => dispatch(actions.onCleanCurrentEditModel()),
    onDefaultEditModel: () => dispatch(actions.onDefaultCurrentEditModel())
  }
};

const mapStateToProps = state => {
  return {
    model: state.app.editModel,
    tbAction: state.app.toolbarAction
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntriesHandler));
