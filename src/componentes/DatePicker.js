
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
var DatePicker = require("react-bootstrap-date-picker");


var DP = React.createClass({
  getInitialState: function(){
    var value = new Date().toISOString();
    return {
      value: value
    }
  },
  handleChange: function(value, formattedValue) {
    this.setState({
      value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
    });
  },
  componentDidUpdate: function(){
    // Access ISO String and formatted values from the DOM.
    var hiddenInputElement = document.getElementById("example-datepicker");
    console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
  },
  render: function(){
    return <FormGroup>
      <ControlLabel>Label</ControlLabel>
      <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />      <HelpBlock>Help</HelpBlock>
    </FormGroup>;
  }
});

export default DP;
