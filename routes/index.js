const express = require('express');
const router = express.Router();
const projectModel = require('../models/project');
const projectslikedModel = require('../models/dbproject');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('unauthorized'.toUpperCase());
});

router.get('/all-projects', (req, res) => {
  projectslikedModel.find(function(error, data) {
    res.json({result: true, data});
  });
});

router.post('/like-project', (req, res) => {
  const {name, desc, pic_url, stack_front, stack_back, days_spent, idproject} = req.body;
  console.log(req.body)
  var newProject = new projectslikedModel({
    name,
    desc,
    pic_url,
    stack_front,
    stack_back,
    days_spent,
    idproject,
  });
  console.log("newproject",newProject)
  newProject.save((error, project) => {
    if(project){
      console.log("ok", project)
      res.json({result: true, project});
    } else {
      console.log("error", error)
      res.json({result: false, error});
    }
  });
});


router.delete('/like-project/:projectId', (req, res) => {
  projectslikedModel.deleteOne({idproject: req.params.projectId},
    (error, response) => {
    res.json({result: true});
  });
});



module.exports = router;
