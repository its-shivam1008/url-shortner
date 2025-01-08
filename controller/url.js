const shortid=require('shortid');
const URl=require('../models/url')

async function handleGenerateNewShortURl(req , res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required!!"})
    const shortID = shortid();
    await URl.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    })
    return res.json({id:shortID})
}

module.exports={
    handleGenerateNewShortURl
}