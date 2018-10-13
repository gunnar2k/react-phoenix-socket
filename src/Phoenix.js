import { Component } from 'react';
import PropTypes from 'prop-types';

import Channels from './Channels';

export default class Phoenix extends Component {
  static propTypes = {
    channel: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  static socket = null;
  static channels = new Channels();

  constructor(props) {
    super(props);
    if (!Phoenix.socket) {
      throw new Error('you must set a socket by calling setPhoenixSocket');
    }
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

  bindEvent(channel, event) {
    // const shoverChannel = Shover.shoverClient.findChannel(channel) || Shover.shoverClient.join(channel);
    // shoverChannel.bind(event, this.props.onUpdate);
    // if (Shover.channels[channel] === undefined) Shover.channels[channel] = 0;
    // Shover.channels[channel]++;
  }

  unbindEvent(channel, event) {
    // const shoverChannel = Shover.shoverClient.findChannel(channel);
    // if (shoverChannel) {
    //   shoverChannel.unbind(event);
    // }
    // Shover.channels[channel]--;
    // if (Shover.channels[channel] <= 0) {
    //   delete Shover.channels[channel];
    //   Shover.shoverClient.leave(channel);
    // }
  }

  render() {
    return null;
  }
}
