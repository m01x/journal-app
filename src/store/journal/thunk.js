import { FireBaseDB } from '../../firebase/config';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './';
import { loadNotes } from '../../helpers';

export const startNewNote = () => {
    return async( dispatch, getState ) =>{

        dispatch( savingNewNote() );

        //uid para grabar la nueva info en firebase firestore.
        const { uid } = getState().auth;
        

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FireBaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        //! dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        

    }
}

export const startLoadingNotes = () => {
  return async( dispatch, getState ) =>{

    const { uid } = getState().auth;
    if ( !uid ) throw new Error('El UID del usuario no existe');

    const notesFromFirebase = await loadNotes( uid );
    dispatch( setNotes( notesFromFirebase ) );
    


  }
}

export const startSaveNote = () => {
  return async( dispatch, getState ) => {

    dispatch( setSaving() );

    const { uid } = getState().auth;
    const { active:note } = getState().journal;

    //* Hay que remover el ID de la nota.

    const noteToFirestore = {...note};
    delete noteToFirestore.id; //Esto es de ES6+ , elimina una propiedad de un objeto... buena!!
    const docRef = doc( FireBaseDB, `${ uid }/journal/notes/${ note.id }` );
    await setDoc( docRef, noteToFirestore, { merge:true } ); //Podriamos usar un try catch aqui!

    dispatch( updateNote( note ) ); 

  }
}