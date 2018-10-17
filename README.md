# React Phoenix Component

A wrapper for `phoenix-socket` which makes it super-easy to connect to a Phoenix Channels backend, using React. Heavily inspired by (practically a fork) of [react-pusher](https://github.com/rainforestapp/react-pusher) by [Rainforest QA](https://github.com/rainforestapp).

## Installing

Get the package from `npm`. To install, run the following command in your terminal:

```
npm install react-phoenix-socket --save
```

You should now be able to use the package in your React application.

## Using

1. To use `react-phoenix-socket`, you first need to hand over your instance of the Socket-instance from the `phoenix-socket` package:

```
import Phoenix, { setPhoenixSocket } from 'react-phoenix-socket';
import { Socket } from 'phoenix-socket';

const socket = new Socket("ws://localhost:4000/socket", {
  params: {
    user_id: '123',
  },
});

setPhoenixSocket(socket);
```

2. Then you simply mount the component, inside another component of yours. The Socket connection will stay alive for as long as the component does. It subscribes to events when mounted, and cleans up hanging subscriptions when unmounted. (TODO)

Here's an example of using `react-phoenix-socket` in combination with redux. Every time we receive a push notification for channel "someChannel" and event "listChanged", the fetchList() action is dispatched:

```
import { fetchList } from './actions';
import store from '../../store';
import Phoenix from 'react-phoenix-socket';

const SomeList = ({ items }) => (
  <div>
    <ul>
      {items.map((item) => { <span>{item}</span> })}
    </ul>
    <Phoenix
      channel="someChannel"
      event="listChanged"
      onUpdate={store.dispatch(fetchList())}
    />
  </div>
);
```
