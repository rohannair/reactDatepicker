/**
 * @jsx React.DOM
 * @flow
 */

const React = require('react');
const moment = require('moment');

// Child components
const DatedisplayerArrow = require('./DatedisplayerArrow');
const DatedisplayerRange = require('./DatedisplayerRange');

const Datedisplayer = React.createClass({

  _setEndDay(direction) {
    let newEndDay = moment(this.props.endDay);

    if (direction === 'previous' ) {
      newEndDay = newEndDay
        .subtract(this.props.period.val, this.props.period.dur)
        .subtract(1, 'day');
    } else {
      newEndDay = newEndDay
        .add(this.props.period.val, this.props.period.dur)
        .add(1, 'day');
    }
     newEndDay = newEndDay
        .endOf(this.props.period.dur)
        .startOf('day')
        .toDate();

    return this.props.onEndDayChange( newEndDay );
  },

  render() {
    let period = this.props.period;
    let endDay = this.props.endDay;

    let startDay = moment(this.props.endDay).clone()
      .subtract(period.val, period.dur)
      .endOf(period.dur);

    if (period.dur !== 'day') {
      startDay.add(1, 'day')
    }

    startDay = startDay.toDate();

    return (
      <div className="datepicker">

        <DatedisplayerArrow
          key="prev"
          onClick={this._setEndDay}
          arrowType="previous"
          showPicker={this.props.showPicker} />

        <DatedisplayerArrow
          key="next"
          onClick={this._setEndDay}
          arrowType="next"
          showPicker={this.props.showPicker} />

        <DatedisplayerRange
          startDay={startDay}
          endDay={endDay}
          showPicker={this.props.showPicker}
          onClick={this.props.toggleDatePicker} />

      </div>
    );
  }

});

module.exports = Datedisplayer;
