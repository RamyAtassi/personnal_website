const express = require('express');
const router = express.Router();
const request = require('request');
const projectModel = require('../models/project');


router.get('/capsule/projects', (req, res, next) => {
  projectModel.find((err, projects) => {
    if(err){
      console.log(err)
      res.json({result: false, err})
    } else {
      console.log(projects)
      res.json({result: true, projects})
    }
  })
});


module.exports = router;
