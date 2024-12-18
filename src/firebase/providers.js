import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FireBaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FireBaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //userInfo
            displayName, 
            email, 
            photoURL, 
            uid,
        }

    } catch (error) {
        
        const errorCode     = error.code;
        const errorMessage  = error.message;
        //The email of the user's account used. (firebase comment)
        //const email = error.customData.email;
        //The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);

        return{
            ok:false,
            errorCode,
            errorMessage,
        }

    }
}

export const registerWithEmailPassword = async({ email, password, displayName}) => {
  try{
    const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password );
    const { uid, photoURL } = resp.user;

    await updateProfile( FireBaseAuth.currentUser, { displayName });
    return{
        ok:true,
        uid,
        photoURL,
        email,
        displayName
    }
    
  } catch (error) {
      return {
          ok: false, errorMessage: error.message
      }
  }
}

export const loginWithEmailPassword = async( { email , password} ) => {
  
    //! Funcion de firebase es signInWithEmailAndPassword , similar al register.
    try {
        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password);
        const {uid, photoURL, displayName} = resp.user;
        return {
            ok:true,
            uid, photoURL, displayName
        }
        
        
    } catch (error) {
        const errorCode     = error.code;
        const errorMessage  = error.message;

        return{
            ok:false,
            errorCode,
            errorMessage,
        }
    }

}


export const logoutFirebase = async() => {
  return await FireBaseAuth.signOut();
}