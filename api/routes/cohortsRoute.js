const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

//middleware functions
const middlewareFns = require('../middleware/middlewareFunctions');

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
                res.status(200).json(cohorts[0]);
            }
            else{
                res.status(404).json({message: `cohort of id ${req.params.id} not found`})
            }
        })
        .catch(err => next(err));
})

router.get('/:id/students', (req,res,next) => {
    db('cohorts').join('students', 'students.cohort_id', '=', 'cohorts.id')
    .select('students.id','students.name','cohorts.name as cohort','students.created_at','students.updated_at').where({'cohorts.id': req.params.id})
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

router.post('/', middlewareFns.checkBody, (req,res,next) => {
    db('cohorts').insert(req.body)
        .then(ids => {
            db('cohorts').where({id: ids[0]})
                .then(cohort => {
                    res.status(201).json({message: 'successfully created cohort',cohort})
                })
        })
        .catch(err => next(err))
})

router.put('/:id', middlewareFns.checkBody, (req,res,next) => {
    db('cohorts').where({id: req.params.id}).update(req.body)
        .then(count => {
            if(count){
                db('cohorts').where({id: req.params.id})
                    .then(cohort => {
                        res.status(200).json({message: `successfully updated cohort`, cohort})
                    })
            }
            else{
                res.status(404).json({message: `cohort of id ${req.params.id} not found`})
            }
        })
        .catch(err=> next(err))
})

router.delete('/:id', async (req,res,next) => {
    try{
        let cohort = await db('cohorts').where({id: req.params.id});
        if(cohort.length){
            await db('cohorts').where({id: req.params.id}).del();
            res.status(200).json({message: 'successfully deleted cohort', cohort: cohort[0]})
        }
        else{
            res.status(404).json({message: `cohort of id ${req.params.id} not found`})
        }
    }
    catch(err){
        next(err);
    }
})
//catch error handler
router.use(middlewareFns.errorHandler);

module.exports = router;