"use strict";
const AWS = require("aws-sdk");

const Lambda = new AWS.Lambda({
    region: "us-east-1"
});
const AUTHORIZER_NAME = process.env.AM_AUTHORIZER_NAME;

const AUTH_SCHEME = "bearer";
const AUTH_STRATEGY_NAME = "identity";

const invokeLambda = (authorizationToken) => {
    return new Promise((resolve, reject) => {
        Lambda.invoke({
            FunctionName: AUTHORIZER_NAME,
            Payload: JSON.stringify({
                authorizationToken
            })
        }, (error, data) => {
            if(error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    })
}

const scheme = (server, options) => {
    return {
        authenticate: async (request, reply) => {
            try {
                const authResponse = await invokeLambda(request.headers["authorization"]);
                if(authResponse.StatusCode === 200) {
                    const payload = JSON.parse(authResponse.Payload);
                    if(payload.context) {
                        return reply.continue({
                            credentials: {
                                accountId: payload.context.accountId,
                                companyId: payload.context.companyId,
                                username: payload.context.username
                            }
                        });
                    } else {
                        return reply({
                            message: `Unauthorized: ${payload.errorMessage}`
                        }).code(401);
                    }
                } else {
                    return reply({
                        message: "Unauthorized"
                    }).code(401);
                }
            } catch(error) {
                console.log(error.message);
                return reply().code(500);
            }
        }
    }
}

exports.register = (plugin, options, next) => {
    plugin.auth.scheme(AUTH_SCHEME, scheme);
    plugin.auth.strategy(AUTH_STRATEGY_NAME, AUTH_SCHEME, "required");
    next();
};

exports.STRATEGY_NAME = AUTH_STRATEGY_NAME;

exports.register.attributes = {
    name: AUTH_STRATEGY_NAME
};
