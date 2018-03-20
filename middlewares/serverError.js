module.exports = function serverErrorHanlder(err, req,res, next){
    console.log(err);
    res.status(500).json({
        msg: 'Something done broke'
    })
}