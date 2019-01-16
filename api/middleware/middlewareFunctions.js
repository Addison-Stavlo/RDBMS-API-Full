

function checkBody (req,res,next) {
    if(req.body.name){
        next();
    }
    else{
        res.status(400).json({message: `please provide a name field in the request`})
    }
}

function errorHandler (err,req,res,next) {
    if(err.errno === 19){
        res.status(500).json({message: `name already used, please try another`})
        }
    else {
        res.status(500).json(err) 
        }    
}

module.exports = { checkBody, errorHandler };