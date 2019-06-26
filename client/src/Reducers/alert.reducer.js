export default function(alert = [], action) {

  let alertCopy = [...alert];

  if(action.type === 'alert'){

    if(action.status === "new"){
      alertCopy.push({
        status: true,
        msg: `Le projet a été ajouté avec succès à votre TOP 3!`,
        alertType: 'success',
        id: action.id
      })
      return alertCopy;

    } else if(action.status === "delete"){
      alertCopy.push({
        status: true,
        msg: `Le projet a été supprimé de votre TOP 3!`,
        alertType: 'secondary',
        id: action.id
      })
      return alertCopy;

  } else if(action.status === "error"){
      alertCopy.push({
        status: true,
        msg: `Impossible d'ajouter plus de 3 projets`,
        alertType: 'danger',
        id: action.id
      })
      return alertCopy;
    }

  } else if (action.type === 'closealert'){
    let index;
    for (var i = 0; i < alertCopy.length; i++) {
      if(alertCopy[i].id === action.id){
        index = alertCopy.indexOf(alertCopy[i]);
        alertCopy.splice(index, 1)
        break;
      }
    }

    return alertCopy;

  } else {
    return alert;
  }
}
