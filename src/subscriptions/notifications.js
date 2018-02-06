"use strict";

const AUTH_STRATEGY = "identity";
const BASE_PATH = "/notifications"

module.exports = [
    {
        path: BASE_PATH,
        options: {
            filter: (path, message, options, next) => {
                return next(message.emails.indexOf(options.credentials.username) > -1);
            }
        }
    },
    {
        path: `${BASE_PATH}/{topic}`,
        options: {
            filter: (path, message, options, next) => {
                const topic = path.replace(`${BASE_PATH}/`, "");
                
                return next(
                    message.topic === topic &&
                    message.emails.indexOf(options.credentials.username) > -1
                );
            }
        }
    }
];
