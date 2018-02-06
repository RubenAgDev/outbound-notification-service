const Nes = require("nes");

const NOTIFICATIONS_CENTER_HOST = "http://localhost:7095";
const NOTIFICATIONS_ENDPOINT = "/notifications";
const CLIENT_CONNECT_OPTIONS = {
    auth: {
        headers: {
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsInRva2VuX3R5cGUiOiJpZGVudGl0eSJ9.eyJpc3MiOiJpbnRlcm5hbC1hbGItbS1saWNlbnNpbmctaW50ZXJuYWwtMTA5MTE3NzUyMy51cy1lYXN0LTEuZWxiLmFtYXpvbmF3cy5jb206NzAzMCIsInN1YiI6IjU5OWUwZWM5Njk3MzQwMGYwMDE1MGI0NSIsImF1ZCI6IjU5OWUwZWM5Njk3MzQwMGYwMDE1MGI0NCIsInVzZXIiOiJjX3dha2FkZUBhdWRpYmxlbWFnaWMuY29tIiwiaWF0IjoxNTE0MDU0NzQ4LCJleHAiOjE1MTQwNTQ4MDh9.3fZ8QNCkh_4Yi5_yJAn5UCiQlq7UvCZyUE9-wV-ISDg"
        }
    }
}

const client = new Nes.Client(NOTIFICATIONS_CENTER_HOST);
client.connect(CLIENT_CONNECT_OPTIONS, (error) => {
    if(error) {
        console.error(`Connection error with: ${NOTIFICATIONS_CENTER_HOST} ${error.message}`);
    } else {
        client.subscribe(NOTIFICATIONS_ENDPOINT, (message) => {
            console.log(`Message received from server ${JSON.stringify(message)}`);
        }, (error) => {
            if(error) {
                console.error(`Subscription error: ${error.message}`);
            } else {
                console.log(`Subscribed to: ${NOTIFICATIONS_ENDPOINT}`);
            }
        });
    }
});

client.onDisconnect = () => {
    console.log(`Disconnected`);
}
