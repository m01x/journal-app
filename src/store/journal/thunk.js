export const startNewNote = () => {
    return async( dispatch ) =>{

        //uid para grabar la nueva info en firebase firestore.

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

    }
}