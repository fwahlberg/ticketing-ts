import { TicketCreatedEvent } from '@fawtickets/common';
import { TicketCreatedListener } from '../ticket-created-listener';
import { natsWrapper } from '../../../NatsWrapper';
import { Ticket } from '../../../models/ticket';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  // Create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // Create a fake data event
  const data: TicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 100,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  };

  // Create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves a ticket', async () => {
  const { listener, data, msg } = await setup();

  // Call the onMessage function with the data object and message object
  await listener.onMessage(data, msg);

  // Assert that a ticket was created
  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  // Call the onMessage function with the data object and message object
  await listener.onMessage(data, msg);

  // Assert that the ack function was called
  expect(msg.ack).toHaveBeenCalled();
});