/**
 * @jsx React.DOM
 * @flow
 */

const React = require('react');

const DatepickerArrow = React.createClass({

  _clickArrow() {
    this.props.onClick(this.props.arrowType);
  },

  render() {
    let disabled = this.props.showPicker;

    let arrowDirection =
      this.props.arrowType === 'previous'
        ? 'fa fa-chevron-left'
        : 'fa fa-chevron-right';

    let classes =
      disabled
        ? 'datepicker--periodSelector__disabled'
        : 'datepicker--periodSelector';

    return (
      <div onClick={(!disabled) ? this._clickArrow : null}
        data-direction={this.props.arrowType}
        className={classes} >
        <i className={arrowDirection}></i>
      </div>
    );
  }

});

module.exports = DatepickerArrow;
