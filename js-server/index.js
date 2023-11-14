import express from 'express';
import request from 'request';

const app = express();

app.get('/', (req, res) => {
    request('http://127.0.0.1:5000/flask', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });
});

app.listen(3000, () => console.log('Node.js app is running on port 3000'));