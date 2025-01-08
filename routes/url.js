const express = require("express");
const router = express.Router();
const {handleGenerateNewShortURl}= require('../controller/url')
router.post("/" , handleGenerateNewShortURl);


module.exports=router;