module.exports = {
    loggerOptions: {
        reporters: {
            console: [{
                module: "good-squeeze",
                name: "Squeeze",
                args: [{
                    response: "*",
                    log: "*"
                }]
            }, {
                module: "good-console"
            }, "stdout"]
        }
    },
    webServer: {
        port: 7095,
        routes: {
            cors: true
        }
    }
};