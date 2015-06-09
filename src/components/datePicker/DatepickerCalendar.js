/**
 * @jsx React.DOM
 * @flow
 */

const React  = require('react');
const _      = require('lodash');
const moment = require('moment');

const DatepickerCalendarDay = require('./DatepickerCalendarDay');

const DatepickerCalendar = React.createClass({

  _changeDate(day, isSelected) {
    let lastClick = this.props.lastClick;

    let startDay = this.props.startDay
      ? moment(this.props.startDay).valueOf()
      : null;

    let endDay = this.props.endDay
      ? moment(this.props.endDay).valueOf()
      : null;

    if (startDay === null || lastClick !== 'start') {
      let date = moment(day).startOf('day').toDate();
      let periodVal = moment(endDay).diff(moment(date), 'days');
      let period = {
        val: periodVal,
        dur: 'day'
      };

      return this.props.onDateChange({period:period, startDay: date, lastClick: 'start'});

    } else if (endDay === null || lastClick !== 'end') {

      if (day < startDay) return alert('End day cannot be before start day');
      let date = moment(day).startOf('day').toDate();
      let periodVal = moment(date).diff(moment(startDay), 'days');
      let period = {
        val: periodVal,
        dur: 'day'
      };

      return this.props.onDateChange({period:period, endDay: date, lastClick: 'end'});
    }

  },

  _buildCalendar(calendarEndDay) {
    calendarEndDay = moment(calendarEndDay).toDate();
    const calendarStartDay = moment(calendarEndDay).startOf('month').toDate();

    let monthStamp = moment(calendarEndDay)
      .format('YYYY-MM');
    let year = monthStamp.split('-')[0];
    let month = monthStamp.split('-')[1];

    // Pull year and month from time stamp
    let lastMonth = moment(calendarEndDay)
      .subtract(1, 'month')
      .format('YYYY-MM');

    // Set parameters for selected month
    // Keep year in there to accommodate leap years
    let daysInMonth = moment(calendarEndDay)
      .daysInMonth();

    let daysInLastMonth = moment(lastMonth, 'YYYY-MM')
      .daysInMonth();
    let firstDay = moment(calendarStartDay)
      .day();

    // Cache lastDate of month. This is is an array we need
    // to subtract 1 from index to get correct date
    let y = month.split('-')[0],
    m = month.split('-')[1];
    let lastDate = moment([y, m - 1, daysInMonth])
      .subtract(1, 'day')
      .toDate();

    let lastMonthLastDate = moment(calendarStartDay)
      .subtract(1, 'day')
      .toDate();

    let calendar = [];
    for (let i = 0; i < daysInMonth; i ++ ) {
      let index = (i + 1).toString();
      let date = year + '-' + month + '-' + index;
      let dateStamp = moment(date, 'YYYY-MM-D').toDate();
      calendar.push(dateStamp);
    }

    // Pad out calendar
    for (let i = daysInLastMonth, c = daysInLastMonth  - firstDay; i > c; i-- ) {
      calendar.unshift(null);
    }

    while (calendar.length % 7 !== 0) {
      calendar.push(null);
    }

    calendar = _.chunk(calendar, 7);

    if (calendar.length < 6) {
      calendar.push(_.fill(Array(7), null));
    }
    return calendar;
  },

  _changeCalendar(e) {
  },

  render() {
    let _self = this;
    let today = this.props.today;
    let startDay = this.props.startDay || null;
    let endDay = this.props.endDay || null;

    let calendarEndDay = this.props.calendarEndDay;
    let period = this.props.period;

    let calendarArray = this._buildCalendar(calendarEndDay);
    let previousCalendarArray = this._buildCalendar(calendarEndDay);

    let calendarHeadings = moment.weekdaysShort()
      .map(function(day) {
        return (
          <div key={day} className='cell__heading'>{day}</div>
        );
    });

    let calendar = calendarArray.map( function(week, i) {

      let weekId = 'week-' + i;
      let days = week.map( function(day, index) {

        let dayLabel = day ? moment(day).date() : day;

        let className = 'cell';

        let unixDay = moment(day).valueOf();
        let unixToday = moment(today).valueOf();
        let unixStartDay = moment(startDay).valueOf();
        let unixEndDay = moment(endDay).startOf('day').valueOf();
        let selected = -1;

        if ( unixDay > unixStartDay && unixDay < unixEndDay ) {
          selected = 0;
          className = 'cell__selected';
        } else if (unixDay === unixStartDay) {
          selected = 1;
          className = 'cell__bookend';
        } else if (unixDay === unixEndDay) {
          selected = 2;
          className = 'cell__bookend';
        } else if ( day === null ) {
          className = 'cell__empty';
        } else if ( unixDay > unixToday) {
          selected = 0;
          className = 'cell__historical';
        }

        let dayID = day ? moment(day, 'YYYY-MM-DD') : index + 'cell';
        return (
          <DatepickerCalendarDay
            selected={selected}
            key={dayID}
            value={unixDay}
            className={className}
            dayLabel={dayLabel}
            onClick={_self._changeDate}/>
        );
      });

      return (
        <div key={weekId} className='datepicker--calendarRow'>{days}</div>
      );

    });

    let arrowDirection = this.props.arrow;
    let monthHeading = moment(calendarEndDay).format('MMMM YYYY');

    return (
      <div className='datepicker--calendar'>
        <div className='datepicker--calendarHeaderContainer'>
          <div className='datepicker--calendarHeader'>{monthHeading}</div>
        </div>
        <div className='datepicker--calendarBody'>
          <div className='datepicker--calendarRow__headers'>
            {calendarHeadings}
          </div>
          {calendar}
        </div>
      </div>
    );
  }

});

module.exports = DatepickerCalendar;

