const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

//middleware functions
const middlewareFns = require('../middleware/middlewareFunctions');

//endpoints
router.get('/', async (req,res,next) => {
    try{
        let students = await db('students');
        res.status(200).json(students)
    }
    catch(err){
        next(err);
    }
})

router.get('/:id', async (req,res,next) => {
    try{
        let students = await db('students').where({id: req.params.id});
        if(students.length){
            res.status(200).json(students[0])
        }
        else{
            res.status(404).json({message: `student of id ${req.params.id} not found`})
        }
    }
    catch(err){
        next(err);
    }
})

router.post('/', middlewareFns.checkBody, async (req,res,next) => {
    try{
        let ids = await db('students').insert(req.body);
        let newStudent = await db('students').where({id: ids[0]});
        res.status(200).json({message: `successfully added new student`, student: newStudent[0]});
    }
    catch(err){
        next(err);
    }
})

router.put('/:id', middlewareFns.checkBody, async (req,res,next) => {
    try{
        let count = await db('students').where({id: req.params.id}).update(req.body);
        if(count) {
            let updatedStudent = await db('students').where({id: req.params.id});
            res.status(200).json({message: `successfully updated student`, student: updatedStudent[0]})
        }
        else{
            res.status(404).json({message: `student of id ${req.params.id} not found`})
        }
    }
    catch(err){
        next(err);
    }
})

router.delete('/:id', async (req,res,next) => {
    try{
        let student = await db('students').where({id: req.params.id});
        if(student.length){
            await db('students').where({id: req.params.id}).del();
            res.status(200).json({message: `successfully deleted student`, student: student[0]})
        }
        else{
            res.status(404).json({message: `student of id ${req.params.id} not found`})          
        }
    }
    catch(err){
        next(err);
    }
})

//error handler
router.use(middlewareFns.errorHandler);

module.exports = router;