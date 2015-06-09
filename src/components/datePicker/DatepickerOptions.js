/**
 * @jsx React.DOM
 * @flow
 */

const React  = require('react');
const moment = require('moment');

const optNameMap = {
  'week' : 'This Week',
  'month' : 'This Month',
  '3month' : 'Last 3 Months',
};

const optValueMap = {
  'week' : 1,
  'month' : 1,
  '3month' : 3,
};

const optPeriodMap = {
  'week' : 'week',
  'month' : 'month',
  '3month' : 'month',
};

const DatepickerOptions = React.createClass({

  _generateOptions() {
    let opts = this.props.opts;

    let cleanOpts = opts.map ( function(opt, i) {
      if (typeof opt === 'string' && opt !== 'custom') {

        return {
          name: optNameMap[opt],
          value: optValueMap[opt],
          range: optPeriodMap[opt],
          id: opt,
        }

      } else if (typeof opt === 'number') {
        let name = opt + ((opt === 1) ? ' Day' : ' Days');

        return {
          name,
          value: opt,
        }
      }
    });

    return cleanOpts;
  },

  render() {

    let cleanOpts = this._generateOptions();
    let handleClick;

    let options = cleanOpts.map( function(opt, i) {

      let key = opt.name + ' ' + i
      let value = opt.value;
      let id = opt.id;
      let range = opt.range;

      return (
        <li
          className="datepicker--optionrange"
          key={key}
          data-value={value}
          data-range={range}
          data-id={id}
          onClick={handleClick}>
          {opt.name}
        </li>
      );
    });

    return (
      <ul className='datepicker--dateranges' onClick={this.props.onClick}>
        {options}
      </ul>
    );
  }

});

module.exports = DatepickerOptions;
