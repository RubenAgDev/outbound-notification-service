"use strict";

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const handlers = require("../handlers/notifications");

const AUTH_STRATEGY = false;
const BASE_PATH = "/notifications"

const VALIDATION_SCHEMA = {
	id: Joi.objectId(),
	subject: Joi.string(),
	emails: Joi.array().items(Joi.string().email()),
	topic: Joi.string().max(20)
}

const AM_HEADERS_VALIDATION_SCHEMA = require("../authorization/am_http_headers").VALIDATION_SCHEMA;

module.exports = [
	{
		method: "POST",
		path: BASE_PATH,
		handler: handlers.postNotification,
		config: {
			auth: AUTH_STRATEGY,
			description: "Creates a new notification",
			tags: ["api"],
			validate: {
				headers: AM_HEADERS_VALIDATION_SCHEMA,
				payload: Joi.object({
					id: VALIDATION_SCHEMA.id.required(),
					subject: VALIDATION_SCHEMA.subject.required(),
					emails: VALIDATION_SCHEMA.emails,
					topic: VALIDATION_SCHEMA.topic.required()
				}).unknown(true)
			}
		}
    }
];
