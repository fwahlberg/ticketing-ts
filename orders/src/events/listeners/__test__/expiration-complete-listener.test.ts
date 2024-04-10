import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../NatsWrapper";
import { Order } from "../../../models/order";
import { Ticket } from "../../../models/ticket";
import { OrderStatus, ExpirationCompleteEvent } from "@fawtickets/common";
import mongoose from "mongoose";
import {Message} from "node-nats-streaming";
const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20,
    });
    await ticket.save();

    const order = Order.build({
        status: OrderStatus.Created,
        userId: "alskdfj",
        expiresAt: new Date(),
        ticket,
    });
    await order.save();

    const data: ExpirationCompleteEvent["data"] = {
        orderId: order.id,
    };

    const msg: Partial<Message> = {
        ack: jest.fn(),
    };

    return { listener, ticket, order, data, msg };
};

it("updates the order status to cancelled", async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg as Message);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits an OrderCancelled event", async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg as Message);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );

    expect(eventData.id).toEqual(order.id);
});

it("acks the message", async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg as Message);

    expect(msg.ack).toHaveBeenCalled();
});
