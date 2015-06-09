/**
 * @jsx React.DOM
 * @flow
 */

 const React  = require('react');

 const DatepickerArrow = React.createClass({


  render() {
    let direction = this.props.arrowType;
    let containerClass = 'datepicker--calendarToggle '+ direction;
    let classes = 'fa fa-chevron-' + direction;

    return (

      <div className={containerClass} onClick={this.props.onClick}>
        <i className={classes}></i>
      </div>

    );
  },
 });

 module.exports = DatepickerArrow;
