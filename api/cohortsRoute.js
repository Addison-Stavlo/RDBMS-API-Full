const express = require('express');
const router = express.Router();
const db = require('./dbConfig');

//middleware functions

//endpoints
router.get('/', (req,res,next) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts)
        })
        .catch(err => next(err) );
})

router.get('/:id', (req,res,next) => {
    db('cohorts').where({id: req.params.id})
        .then(cohorts => {
            if(cohorts.length){
                res.status(200).json(cohorts);
            }
            else{
                res.status(404).json({message: 'cohort not found'})
            }
        })
        .catch(err => next(err));
})

//could add middleware to check to see if cohort actually exists first...
router.get('/:id/students', (req,res,next) => {
    db('cohorts').join('students', 'students.cohort_id', '=', 'cohorts.id').where({'cohorts.id': req.params.id})
        .then(students => {
            if(students.length){
                res.status(200).json(students);
            }
            else{
                res.status(404).json({message: `no students found for cohort_id ${req.params.id}`})
            }
        })
        .catch(err => next(err));
})

//error handler
router.use( (err,req,res,next) => {
if(err.errno === 19){
    res.status(500).json({message: `name already used`})
    }
    else {
    res.status(500).json(err) 
    }    
});

module.exports = router;