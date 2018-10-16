import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Phoenix extends Component {
  static propTypes = {
    channel: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  static socket = null;
  static channels = {};

  constructor(props) {
    super(props);
    if (!Phoenix.socket) {
      throw new Error('you must set a socket by calling setPhoenixSocket');
    }
    Phoenix.socket.connect();
  }

  componentWillMount() {
    this.bindEvent(this.props.channel, this.props.event);
  }

  componentWillUnmount() {
    this.unbindEvent(this.props.channel, this.props.event);
  }

  componentWillReceiveProps({ channel: newChannel, event: newEvent }) {
    const { channel, event } = this.props;
    if (channel === newChannel && event === newEvent) {
      return;
    }

    this.bindEvent(newChannel, newEvent);
    this.unbindEvent(channel, event);
  }

  bindEvent(channelName, event) {
    let channel = Phoenix.channels[channelName];
    if (!channel) {
      channel = Phoenix.socket.channel(channelName);
      Phoenix.channels[channelName] = channel;
    }
    channel.on(event, this.props.onUpdate);
  }

  unbindEvent(channelName, event) {
    const channel = Phoenix.channels[channelName];
    if (channel) {
      channel.off(event);
    }
  }

  render() {
    return null;
  }
}

export const setPhoenixSocket = (socket) => {
  Phoenix.socket = socket;
}
