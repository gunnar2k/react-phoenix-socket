import Phoenix, { setPhoenixSocket, Channels } from '../src';
import { shallow } from 'enzyme';
import React from 'react';

let comp, props, socketMock;
const channel = 'foo';
const event = 'test-event';

describe('Phoenix', () => {
  beforeEach(() => {
    const channelMock = jest.fn();
    channelMock.mockReturnValue({
      on: jest.fn(),
    });
    socketMock = {
      channel: channelMock,
    };
    props = {
      channel,
      event,
      onUpdate: jest.fn(),
    };
  });

  describe('without socket', () => {
    it('throws an error if no socket is set when component is mounted', () => {
      expect(() => shallow(<Phoenix {...props} />)).toThrow();
    });
  });

  describe('with socket', () => {
    beforeEach(() => {
      setPhoenixSocket(socketMock);
    });

    afterEach(() => {
      comp.unmount();
    });

    it('renders nothing', () => {
      comp = shallow(<Phoenix {...props} />);
      expect(comp.isEmptyRender()).toBeTruthy();
    });
  });
});
