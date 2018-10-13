import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Channel extends Component {
  static propTypes = {
    channel: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    event: PropTypes.string.isRequired,
  };

  static socket = null;
//   static channels = {};

  constructor(props) {
    super(props);
    if (!Channel.socket) {
      throw new Error('you must set a socket by calling setSocket');
    }
  }

  componentWillMount() {
    this.bindEvent(this.props.channel, this.props.event);
  }

  componentWillUnmount() {
    this.unbindEvent(this.props.channel, this.props.event);
  }

//   componentWillReceiveProps({ channel: newChannel, event: newEvent }) {
//     const { channel, event } = this.props;
//     if (channel === newChannel && event === newEvent) {
//       return;
//     }
//
//     this.bindShoverEvent(newChannel, newEvent);
//     this.unbindShoverEvent(channel, event);
//   }

  bindEvent(channel, event) {
    console.log(channel, event);
    // const shoverChannel = Shover.shoverClient.findChannel(channel) || Shover.shoverClient.join(channel);
    // shoverChannel.bind(event, this.props.onUpdate);
    // if (Shover.channels[channel] === undefined) Shover.channels[channel] = 0;
    // Shover.channels[channel]++;
  }

//   unbindShoverEvent(channel, event) {
//     const shoverChannel = Shover.shoverClient.findChannel(channel);
//     if (shoverChannel) {
//       shoverChannel.unbind(event);
//     }
//     Shover.channels[channel]--;
//     if (Shover.channels[channel] <= 0) {
//       delete Shover.channels[channel];
//       Shover.shoverClient.leave(channel);
//     }
//   }

  render() {
    return null;
  }
}

export const setSocket = (socket) => {
  Channel.socket = socket;
}
