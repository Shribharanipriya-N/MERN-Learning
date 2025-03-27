const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();
    if(!token){
        return res.status(401).json({error:'Token required'});
    }
    try{
        const decoded=jwt.verify(token,"secrettoken");
        req.user=decoded;
        next();
    }
    catch(e){
        console.error("Token Verification Error:", e);
        res.status(401).json({ error: 'Not valid', e });
    }
}

module.exports=auth;