const jwt = require("jsonwebtoken");

exports.obrigatorio = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token,"segredo");
        next();
    } catch (error) {
        return res.status(401).send({message:error});
    }
}

exports.opcional = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token,"segredo");
        next();
    } catch (error) {
        next();
    }
}