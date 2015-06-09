/**
 * @jsx React.DOM
 * @flow
 */

const React = require('react');
const DateComponent = require('./components/DateComponent');

const App = React.createClass({

  render: function() {
    return (
      <DateComponent />
    );
  },

});

module.exports = App;
