import * as express from "express";
const auth = express.Router();

auth.get('/confirm-email', (req, res) => {
    res.render('confirm-email')
});

auth.post('/confirm-email', (req, res) => {
    res.send('confirm-email')
});

export { auth };