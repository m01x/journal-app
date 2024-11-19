
import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {

    dispatch(checkingCredentials())

  }

}


export const startGoogleSignIn = () => {
  return async (dispatch) => {

    dispatch( checkingCredentials() );
    const results = await signInWithGoogle();
    
    if( !results.ok ) return dispatch( logout( results.errorMessage) );

    dispatch( login( results ) );
    
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async( dispatch )=>{

    dispatch( checkingCredentials() );

    const {ok, uid, photoURL, errorMessage } = await registerWithEmailPassword({ email, password, displayName });
    if ( !ok ) return dispatch(logout(errorMessage));

    dispatch( login( {uid, displayName, email, photoURL} ) );
  }
}

export const startLoginWithEmailPassword = ({email, password} ) => {
  return async( dispatch )=>{
    
    dispatch( checkingCredentials() );
    const result = await loginWithEmailPassword( {email, password} );
    //const {uid, displayName, photoURL} = await loginWithEmailPassword( {email, password} );
    if (!result.ok) return dispatch( logout( result.errorMessage) );

    dispatch( login(result) );

  }


}

export const startLogout = () => {
 
  return async( dispatch ) => {
    //Puedo poner un try catch aqui, por si acaso.
    try {
      await logoutFirebase();
      dispatch( clearNotesLogout() );
      dispatch( logout() );
    } catch (error) {
      console.log(error)
    }

  }
}