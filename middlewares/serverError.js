module.exports = function serverErrorHanlder(err, req,res, next){
    
    res.status(500).json({
        msg: 'Something done broke'
    })
}