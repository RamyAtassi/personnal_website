export default function(viewonlylike = false, action){
  if(action.type === 'viewonlylike'){
    if(action.view){
      return true;
    } else {
      return false;
    }
  } else {
    return viewonlylike;
  }
}
