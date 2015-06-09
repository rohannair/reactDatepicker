/**
 * @jsx React.DOM
 * @flow
 */

const React = require('react');
const _ = require('lodash');
const moment = require('moment');

const DatepickerToggle = React.createClass({

  getInitialState() {
    let active = false;
    return {active};
  },

  toggleActive() {
    this.setState({active: !this.state.active});
  },

  render() {
    let classnames = this.state.active ? 'datepicker--toggle active' : 'datepicker--toggle';

    return (
      <div className={classnames} onClick={this.toggleActive}>
        <i className='fa fa-calendar'></i>
      </div>
    );
  }

});

module.exports = DatepickerToggle;
