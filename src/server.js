"use strict";

const Hapi = require("hapi");
const Nes = require("nes");
const Good = require("good");

const Config = require("./server.config");
const IdentityAuth = require("./authorization/identity");
const NotificationsRoutes = require("./routes/notifications");
const NotificationsSubscriptions = require("./subscriptions/notifications");
const MessagesSubscriptions = require("./subscriptions/messages");

const server = new Hapi.Server();
server.connection(Config.webServer);
server.register([
    {
        register: Good,
        options: Config.loggerOptions        
    },
    {
        register: IdentityAuth
    },
    Nes
], (err) => {
    if(err) {
        console.log(err);
    }
});

server.route([
    {
        method: "GET",
        path: "/health",
        handler: (request, reply) => {
            // TODO: Provide the Status of the API, for now replies with 200 (OK) always
            return reply();
        },
        config: {
            auth: false,
            tags: ["api"]
        }
    }
].concat(NotificationsRoutes));

NotificationsSubscriptions.forEach(subscription => {
    server.subscription(subscription.path, subscription.options);
});

MessagesSubscriptions.forEach(subscription => {
    server.subscription(subscription.path, subscription.options);
});

server.start((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
