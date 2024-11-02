import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

