const shortid=require('shortid');
const URl=require('../models/url')

async function handleGenerateNewShortURl(req , res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required!!"})
    const shortID = shortid();
    const url = body.url.startsWith("https://") ? 
        body.url : body.url.startsWith("http://") ? 
            body.url : "https://"+body.url ;
    await URl.create({
        shortId:shortID,
        redirectURL:url,
        visitHistory:[]
    })
    return res.json({id:shortID})
}

module.exports={
    handleGenerateNewShortURl
}