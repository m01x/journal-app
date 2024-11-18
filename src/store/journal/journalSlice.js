import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving : false,
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push( action.payload );
      state.isSaving = false;
    },
    setActiveNote: ( state, action ) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: ( state, action ) => {
      state.notes = action.payload;
    },
    setSaving: ( state, action ) => {
      state.isSaving = true;
      state.messageSaved = '';
      // TODO: Mensaje de error...
    },
    updateNote: ( state, action ) => { //el payload es una nota actualizada
      state.isSaving = false;
      state.notes = state.notes.map( note => {

        if( note.id === action.payload.id ){
          return action.payload;
        }
        return note;
      });

      state.messageSaved = `${ action.payload.title }. actualizada correctamente`
    },
    deleteNoteById: ( state, action ) => {

    },
  }
});

// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById, 
} = journalSlice.actions;