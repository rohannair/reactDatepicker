/**
 * @jsx React.DOM
 * @flow
 */

const React = require('react');
const moment = require('moment');

const DatepickerCalendar = require('./DatepickerCalendar');
const DatepickerOption = require('./DatepickerOptions');
const DatepickerArrow = require('./DatepickerArrow');
const DatePickerActions = require('./DatePickerActions');

const Datepicker = React.createClass({

  componentWillMount() {
    let period = this.props.period;
    let customRange = period.dur === 'day' ? true : false;
    let startDay = moment(this.props.endDay)
      .subtract(period.val, period.dur)
      .endOf(period.dur)
      .startOf('day');
    if (period.dur === 'month' || period.dur === 'week') {
      startDay.add(1, 'day');
    }
    startDay.toDate();

    this.setState({
      customRange,
      startDay,
      period,
      lastClick: 'end',
      endDay: this.props.endDay,
      calendarEndDay: this.props.endDay,
    });
  },

  _setlastClick(e) {
    let lastClick = e.target.dataset.id;

    this.setState({lastClick: lastClick});
  },

  _quickPeriodChange(e) {
    let today = this.props.today;
    let period = {
      dur: e.target.dataset.range,
    };
    period.val = parseInt(e.target.dataset.value);

    let range = e.target.dataset.range;
    let id = e.target.dataset.id;

    let endDay = moment(today)
      .endOf(period.dur)
      .startOf('day')
      .toDate();

    if (period.val > 1) {
      let startDay = moment(endDay)
        .subtract(period.val, period.dur)
        .startOf(period.dur)
        .startOf('day')
        .toDate();
    } else {
      let startDay = moment(endDay)
        .startOf(period.dur)
        .startOf('day')
        .toDate();
    }

    let customRange = period.dur === 'day' ? true : false;

    this.setState({
      lastClick: 'end',
      period,
      startDay,
      endDay,
      calendarEndDay: today
    })
  },

  _changeDate(obj) {
    this.setState(obj);
  },

  _cancelDateChange() {
    this.props.setNewDate(null)
  },

  _setNewDate(e) {
    let endDay = this.state.endDay;
    let startDay = this.state.startDay;
    let newPeriod = this.state.period;

    let args = {
      endDay,
      period: newPeriod
    };

    this.props.setNewDate(args);
  },

  _nextPeriodClick() {
    let period = this.state.period;

    let newEndDay = moment(this.state.calendarEndDay)
      .add(period.val, period.dur)
      .toDate();

    this.setState({
      calendarEndDay: newEndDay,
    });

  },

  _prevPeriodClick() {
    let period = this.state.period;

    let newEndDay = moment(this.state.calendarEndDay)
      .subtract(period.val, period.dur)
      .toDate();

    this.setState({
      calendarEndDay: newEndDay,
    });

  },

  _setMobileDate(e) {
    let date = moment(e.target.valueAsDate)
      .startOf('day')
      .add(1, 'day')
      .toDate();

    let newState = {};
    let dayDiff;

    if (e.target.name === 'start') {
      dayDiff = moment(this.state.endDay).diff(moment(date), 'days');
      newState.startDay = date;
    } else if (e.target.name === 'end') {
      dayDiff = moment(date).diff(moment(this.state.startDay), 'days');
      newState.endDay = date;
    }

    newState.period = {
      val: dayDiff,
      dur: 'day'
    }
    newState.lastClick = e.target.name;

    this.setState(newState);
  },

  render() {
    let today = this.props.today;
    let endDay = this.state.endDay;
    let period = this.props.period;

    let startDay = this.state.startDay;

    let calendarEndDay = this.state.calendarEndDay;
    let prevCalendarEndDay = moment(calendarEndDay).subtract(1, 'M').endOf('M').startOf('day').toDate();

    let prevStartDay = moment(startDay)
      .subtract(period.val, period.dur)
      .toDate();

    let prevEndDay = moment(endDay)
      .subtract(period.val, period.dur)
      .endOf('M')
      .startOf('day')
      .toDate();

    let dateTo = endDay ? moment(endDay)
      .format('YYYY-MM-DD') : 'Select start date';
    let dateFrom = startDay ? moment(startDay)
      .format('YYYY-MM-DD') : 'Select end date';

    let rangeForm = {};
    if (window.innerWidth > 768) {

      rangeForm.dateFrom = <button
        className={ this.state.lastClick === 'end' ? 'selected' : 'unselected'}
        onClick={this._setlastClick}
        data-id='end'>{dateFrom}</button>;
      rangeForm.dateTo = <button
        className={ this.state.lastClick === 'start' ? 'selected' : 'unselected'}
        onClick={this._setlastClick}
        data-id='start'>{dateTo}</button>;
    } else {

      rangeForm.dateFrom = <input
        type='date'
        onChange={this._setMobileDate}
        name='start'
        value={dateFrom} />;

      rangeForm.dateTo = <input
        type='date'
          onChange={this._setMobileDate}
        name='end'
        value={dateTo} />;
    }

    return (
      <div className='datepickerContainer'>
        <div className='datepicker--dropdown'>
          <div className='datepicker--dropdownHeader'>
            <i className='fa fa-caret-up'></i>
          </div>

          <div className='datepicker--dropdownBody'>

            <div className='datepicker--quickSelector'>
              <DatepickerOption
                onClick={this._quickPeriodChange}
                opts={['week', 'month', '3month']}
                period={period} />

              <div className='datepicker--rangeForm'>

                <div className='datepicker--range__from'>
                  <label>From:</label>
                  {rangeForm.dateFrom}
                </div>
                <div className='datepicker--range__to'>
                  <label>To:</label>
                  {rangeForm.dateTo}
                </div>

              </div>

              <div className='datepicker--actions'>
                <DatePickerActions btnType={'btn-link'} btnActn={'cancel'} onClick={this._cancelDateChange} />
                <DatePickerActions btnType={'btn-primary'} btnActn={'Apply'} onClick={this._setNewDate} />
              </div>

            </div>

            <div className='datepicker--calendarContainer'>
              <DatepickerArrow
                onClick={this._nextPeriodClick}
                arrowType="right" />

              <DatepickerArrow
                onClick={this._prevPeriodClick}
                arrowType="left" />

              <DatepickerCalendar
                calendarEndDay={calendarEndDay}
                startDay={startDay}
                endDay={endDay}
                period={period}
                onDateChange={this._changeDate}
                lastClick={this.state.lastClick} />

              <DatepickerCalendar
                today={today}
                calendarEndDay={prevCalendarEndDay}
                startDay={startDay}
                endDay={endDay}
                period={period}
                onDateChange={this._changeDate}
                lastClick={this.state.lastClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Datepicker;
