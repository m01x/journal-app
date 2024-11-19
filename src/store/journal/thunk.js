import { FireBaseDB } from '../../firebase/config';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveState, setSaving, updateNote } from './';
import { loadNotes } from '../../helpers';
import { fileUpload } from '../../helpers/fileUpload';

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

export const startUploadingFiles = ( files = []) => {
  return async( dispatch )=>{

    dispatch( setSaving() );

    //No realizar la subida asi: await fileUpload( files[0]);

    /**
     * Promise.all sirve para disparar muchas funciones q devuelven promesas, una vez 
     * todas esten resueltas...
     */
    const fileUploadPromises = [];
    for ( const file of files){
      fileUploadPromises.push( fileUpload(file) ); //No hay un .then(), no se han disparado las promises.
    }
    const photosUrl = await Promise.all( fileUploadPromises ); //Cuando esto se resuelva, tendre un arreglo con todas las resoluciones.
    
    dispatch( setPhotosToActiveState( photosUrl ) );
  }
}


export const startDeletingNote = () => {
  return async( dispatch, getState ) => {

    const { uid } = getState().auth;
    const { active:note } =getState().journal;

    //Ahora construiremos la referencia al documento para que firebase elimine la nota.
    const docRef = doc( FireBaseDB, `${ uid }/journal/notes/${ note.id }`);
    await deleteDoc( docRef);

    dispatch( deleteNoteById( note.id ));
  }
}