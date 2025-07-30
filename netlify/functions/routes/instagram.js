import express from 'express';

const instagram = express.Router();

instagram.get('/', (req, res) => {
    res.json({
        message: "I just found instagram!!"
    });
})

export default instagram;
