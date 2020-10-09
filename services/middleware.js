exports.unknownEndPoint = (req , res) => res.status(400).send({error: 'unknown endpoint'})

exports.errorHandler = (error, req, res, next) => {
    console.log(error.name)

    if(error.name==='CastError') { res.status(400).send({error: 'malformatted id'})}
    if(error.message==='invalid id') {res.status(400).send({error: 'id does not exist'})}
}
