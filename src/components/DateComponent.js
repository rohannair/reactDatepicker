/**
* @jsx React.DOM
* @flow
*/

// Add CSS
require('../css/utils/box-sizing.scss');
require('../css/utils/clearfix.scss');
require('../css/utils/fontSmoothing.scss');
require('../css/utils/preserve3d.scss');
require('../css/utils/preventSelect.scss');
require('../css/utils/verticalAlign.scss');
require('../css/app.scss');

const React = require('react');
const moment = require('moment');
const _ = require('lodash');

const Datedisplayer = require('./dateDisplayer/Datedisplayer');
const Datepicker = require('./datePicker/Datepicker');

const DateComponent = React.createClass({

  getInitialState() {
    const today = moment().startOf('day').toDate();
    const period = {
      val: 1,
      dur: 'month',
    };

    let endDay = moment(today)
      .endOf(period.dur)
      .startOf('day')
      .toDate();

    return {
      today,
      endDay,
      period,
      showPicker: false,
    };
  },

  _setNewDate( args ) {
    let newState = _.merge({showPicker: false}, args)
    this.setState(newState);

    return console.log({
      endDay: this.state.endDay,
      period: this.state.period
    })
  },

  _openDatepicker() {
    this.setState({showPicker: !this.state.showPicker});
  },

  _setEndDay(newEndDay) {
    this.setState({endDay: newEndDay});
  },

  render() {
    let today = this.state.today;
    let period = this.state.period;
    let endDay = this.state.endDay;

    let showPicker = this.state.showPicker;

    let showDatepicker;
    if (showPicker) {
      showDatepicker = (<Datepicker
        today={today}
        period={period}
        endDay={endDay}
        setNewDate={this._setNewDate} />);
    }

    return (
      <div className='dateComponent'>

        <Datedisplayer
          today={today}
          period={period}
          endDay={endDay}
          toggleDatePicker={this._openDatepicker}
          showPicker={showPicker}
          onEndDayChange={this._setEndDay}
           />

        {showDatepicker}
      </div>
    );
  },

});

module.exports = DateComponent;
