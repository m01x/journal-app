import { useEffect, useMemo } from 'react';
import { useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
      createValidators();
    }, [formState]);

    useEffect(() => {
      setFormState( initialForm )
    }, [initialForm])
    
    
    const isFormValid = useMemo(() => {
      
        for (const formValue of Object.keys( formValidation )) {
            if( formValidation[formValue] !== null ) return false;
        }
        
        return true;

    },[formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    /**
     * *Informacion reelevante para esta funcion
     * 
     * Esta funcion va a validar el formulario, segun lo hayamos indicado en la funcion
     * del RegisterPage.jsx:14 :
     * 
     *      const formValidations = {
                email: [ ( value ) => { return value.includes('@') }, 'El correo debe contener un @.'],
                password: [(value) => {return value.lenght >= 6  }, 'El password debe contener al menos 6 letras.'],
                displayName: [ (value) => { return value.lenght >= 1 }, 'El nombre no puede estar vacío.' ]
            }


            const { formState, displayName, email, password, onInputChange,
                    isFormValid, displayNameValid, emailValid, passwordValid
            } = useForm( formData , formValidations );

     */
    const createValidators = () => {
        const formCheckValues = {};

        for (const formField of Object.keys( formValidations )){
            const [ fn, errorMessage ] = formValidations[formField];
            
            formCheckValues[`${ formField }Valid`] = fn( formState[formField].toString() ) ? null : errorMessage;
            
        }

        setFormValidation( formCheckValues );
        
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
}