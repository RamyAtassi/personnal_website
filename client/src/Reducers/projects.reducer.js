export default function(projects = [], action){
  var projectsCopy = [...projects]
  if(action.type === 'getprojects'){
    const projects = action.projects
    for (var i = 0; i < projects.length; i++) {
      projectsCopy.push(projects[i])
    }
    return projectsCopy;
  } else {
    return projects;
  }
}


