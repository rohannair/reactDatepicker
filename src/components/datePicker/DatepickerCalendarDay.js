/**
 * @jsx React.DOM
 * @flow
 */

const React  = require('react');

class DatepickerCalendarDay extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleClick() {
    let day = this.props.value;
    let selected = this.props.selected;
    this.props.onClick(day, selected);
  }

  render() {
    let key = this.props.value;
    let day = this.props.dayLabel;
    let classes = this.props.className;
    let selected = this.props.selected;

    return (
      <div key={key}
        className={classes}
        onClick={this._handleClick.bind(this)}>
        {day}
      </div>
    );
  }

}

module.exports = DatepickerCalendarDay;
