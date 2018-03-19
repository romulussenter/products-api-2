module.exports = function notFoundHandler(req, res, next){
    res.status(404).send('Nothing to see here');
};