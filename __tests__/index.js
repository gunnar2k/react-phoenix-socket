import Phoenix, { setPhoenixSocket, Channels } from '../index.js';
import { shallow } from 'enzyme';
import React from 'react';

let comp, props, socketMock;
const channelName = 'foo';
const event = 'test-event';

describe('Phoenix', () => {
  beforeEach(() => {
    socketMock = {
      channel: jest.fn().mockReturnValue({
        on: jest.fn(),
        off: jest.fn(),
        join: jest.fn(),
      }),
      connect: jest.fn(),
    };
    props = {
      channel: channelName,
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

    describe('on initialisation', () => {
      // TODO: Add more tests
    });
  });
});
