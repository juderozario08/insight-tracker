import express from 'express';

const instagram = express.Router();

instagram.get('/instagram', (req, res) => {
    res.send('I just found instagram!!');
})

export default instagram;
