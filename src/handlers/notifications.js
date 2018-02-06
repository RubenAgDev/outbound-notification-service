"use strict";

const handlers = {};

handlers.postNotification = (request, reply) => {
    /**
     * subject
	 * emails
	 * topic
	 * content
	 * status
     * companyIds
     */
    const notification = {
        id: request.payload.id,
        subject: request.payload.subject,
        topic: request.payload.topic,
        emails: request.payload.emails
    }
    const message = request.payload;

    request.server.publish("/notifications", notification);
    request.server.publish(`/notifications/${notification.topic}`, notification);
    request.server.publish("/messages", message);

    reply().code(204);
};

module.exports = handlers;
