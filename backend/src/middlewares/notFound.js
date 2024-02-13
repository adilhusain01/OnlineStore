const NotFoundMiddleWare = async (err, req, res, next) => {
    return res.status(500).json({message : "Not found"});
}

module.exports = NotFoundMiddleWare;