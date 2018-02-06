"use strict";

const AUTH_STRATEGY = "identity";
const BASE_PATH = "/messages"

module.exports = [
    {
        path: BASE_PATH,
        options: {
            filter: (path, message, options, next) => {
                return next(message.emails.indexOf(options.credentials.username) > -1);
            }
        }
    }
];
