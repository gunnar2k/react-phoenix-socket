'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPhoenixSocket = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Phoenix = function (_Component) {
  _inherits(Phoenix, _Component);

  function Phoenix(props) {
    _classCallCheck(this, Phoenix);

    var _this = _possibleConstructorReturn(this, (Phoenix.__proto__ || Object.getPrototypeOf(Phoenix)).call(this, props));

    if (!Phoenix.socket) {
      throw new Error('you must set a socket by calling setPhoenixSocket');
    }
    Phoenix.socket.connect();
    return _this;
  }

  _createClass(Phoenix, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.bindEvent(this.props.channel, this.props.event);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindEvent(this.props.channel, this.props.event);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var newChannel = _ref.channel,
          newEvent = _ref.event;
      var _props = this.props,
          channel = _props.channel,
          event = _props.event;

      if (channel === newChannel && event === newEvent) {
        return;
      }

      this.bindEvent(newChannel, newEvent);
      this.unbindEvent(channel, event);
    }
  }, {
    key: 'bindEvent',
    value: function bindEvent(channelName, event) {
      var channel = Phoenix.channels[channelName];
      if (!channel) {
        channel = Phoenix.socket.channel(channelName);
        Phoenix.channels[channelName] = channel;
        channel.join();
      }
      channel.on(event, this.props.onUpdate);
    }
  }, {
    key: 'unbindEvent',
    value: function unbindEvent(channelName, event) {
      var channel = Phoenix.channels[channelName];
      if (channel) {
        channel.off(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Phoenix;
}(_react.Component);

Phoenix.propTypes = {
  channel: _propTypes2.default.string.isRequired,
  event: _propTypes2.default.string.isRequired,
  onUpdate: _propTypes2.default.func.isRequired
};
Phoenix.socket = null;
Phoenix.channels = {};
exports.default = Phoenix;
var setPhoenixSocket = exports.setPhoenixSocket = function setPhoenixSocket(socket) {
  Phoenix.socket = socket;
};
