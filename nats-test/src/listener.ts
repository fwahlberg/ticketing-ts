import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";
import nats from "node-nats-streaming";
console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

    stan.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
    });

    new TicketCreatedListener(stan).listen();
});



