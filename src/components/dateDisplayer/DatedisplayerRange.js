/**
 * @jsx React.DOM
 * @flow
 */

const React = require('react');
const moment = require('moment');

const DatepickerRange = React.createClass({

  render() {

    let startDay = this.props.startDay;
    let endDay = this.props.endDay;

    let formattedStartDay = (window.innerWidth > 768)
      ? moment(startDay).format('LL')
      : moment(startDay).format('ll');

    let formattedEndDay = (window.innerWidth > 768)
      ? moment(endDay).format('LL')
      : moment(endDay).format('ll');

    let caretClass = this.props.showPicker
      ? 'fa fa-calendar open'
      : 'fa fa-calendar';

    return (
      <div className='datepicker--range' onClick={this.props.onClick} >
        <span className='date'>{formattedStartDay}</span>
        <span> to </span>
        <span className='date'>{formattedEndDay}</span>

        <div className='caretHolder right'>
          <i className={caretClass}></i>
        </div>
      </div>
    );
  }

});

module.exports = DatepickerRange;
