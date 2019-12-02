import firebase from 'firebase';

export const SET_FIELD = 'SET_FIELD';

export const setField = (field, value) => {
 return {
    type: SET_FIELD,
    field,
    value
  }
}

export const SERIE_SAVED_SUCCESS = 'SERIE_SAVED_SUCCESS';
export const serieSavedSuccess = () => {
  return {
    type: SERIE_SAVED_SUCCESS
  }
}

export const SET_ALL_FIELDS = 'SET_ALL_FIELDS';
export const setAllFields = serie => ({
  type: SET_ALL_FIELDS,
  serie: serie
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
  type: RESET_FORM
})

export const saveSerie = serie => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    if(serie.id) {

      await firebase 
      .database()
      .ref(`/users/${currentUser.uid}/series/${serie.id}`)
      .set(serie);

    } else {
      await firebase 
        .database()
        .ref(`/users/${currentUser.uid}/series`)
        .push(serie);
    }
      
    dispatch(serieSavedSuccess());
  }
}





