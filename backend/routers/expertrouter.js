const express = require('express');
const Model = require('../models/expertModel');
const router = express.Router();


router.post('/add', (req, res) => { 
    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((err) => {
        console.log(err);
        
        if (err.code === 11000) {
            res.status(400).json({message: 'User already exists'})
        }
        else {
            res.status(500).json({message: 'Internal server error'})
        }
    })    
    
    
})

router.get('/getall', (req, res) => {
    Model.find()
    .then((result) => {
        res.status(200).json(result);
        // console.log(result)
    }).catch((err) => {
        res.status(err).json({message : "Internal Server Error"})
    });
})



module.exports = router;
