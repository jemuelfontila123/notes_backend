exports.unknownEndPoint = (req , res) => res.status(400).send({error: 'unknown endpoint'})

exports.errorHandler = (error, req, res, next) => {
    console.log(error.message)
    const errors = error.errors
    if(error.name==='CastError') { res.status(400).json({error: 'malformatted id'})}
    if(error.name==='ValidationError'){ res.status(400).json({error: 'username already exists'})}
    if(error.name==='JsonWebTokenError') {res.status(401).json({error: 'invalid token'})}
    // Custom Error Validation
    if(error.message==='invalid id') {res.status(400).json({error: 'id does not exist'})}
    if(errors) {res.status(400).json({err: errors})}
    if(error.message==='invalid user') {res.status(401).json({error: 'invalid user'})}
    if(error.message==='invalid username or password') {res.status(401).json({error: 'invalid username or password'})}
    if(error.message==='token missing or invalid') { res.status(401).json({ error: 'token missing or invalid' })}
    next()
}
  
exports.getTokenFrom = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        res.token = authorization.substring(7)
    }
    else 
        res.token = null;
    next();
}
