export default function(likedprojects = [], action){
  var likedprojectsCopy = [...likedprojects]
  if(action.type === 'getlikedprojects'){
    const likedproject = action.projects;
    for (var i = 0; i < likedproject.length; i++) {
      likedprojectsCopy.push(likedproject[i])
    }
    return likedprojectsCopy;
  } else if (action.type === 'newlikedproject'){
    likedprojectsCopy.push(action.project)
    return likedprojectsCopy;
  } else if (action.type === 'dislikeproject'){
    for (var y = 0; y < likedprojectsCopy.length; y++) {
      let index;
      if (likedprojectsCopy[y].idproject === action.idproject) {
        index = likedprojectsCopy.indexOf(likedprojectsCopy[y]);
        likedprojectsCopy.splice(index, 1)
        break;
      }
    }
    return likedprojectsCopy;
  } else {
    return likedprojects;
  }
}
