/**
 * @jsx React.DOM
 * @flow
 */

const React = require('react');

const DatePickerActions = React.createClass({

  render() {

    let classes = 'btn btn-sm ' + this.props.btnType;
    let title = _.capitalize(this.props.btnActn);

    return <button className={classes} onClick={this.props.onClick}>{title}</button>;
  },

});
module.exports = DatePickerActions;
