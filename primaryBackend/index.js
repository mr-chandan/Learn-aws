const express = require('express');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());

const sqs = new AWS.SQS({ region: 'eu-north-1' });
const queueUrl = 'https://sqs.eu-north-1.amazonaws.com/058264394403/Processingqueue.fifo';


app.post('/test', async (req, res) => {
    const params = {
        MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
        QueueUrl: queueUrl,
        MessageGroupId: "Group1",
        MessageDeduplicationId: "Message1"
    };

    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.error("Error submitting answer to SQS:", err);
            res.status(500).json({ error: "Failed to submit answer" });
        } else {
            res.json({ message: "Answer submitted successfully" });
        }
    });
});


app.listen(3000, () => {
    console.log('Primary Backend Server is running on port 3000');
});