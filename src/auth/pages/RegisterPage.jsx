import { useMemo, useState } from 'react';
import { Link as RouterDomLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formData = {
  email: '',
  password: '',
  displayName: '',
}

//*Vamos a crear nuestras propias validaciones y enviarlas como un objeto a nuestro custom hook
const formValidations = {
  email: [ ( value ) => value.includes('@') , 'El correo debe contener un @.'],
  password: [(value) => value.length >= 6  , 'El password debe contener al menos 6 letras.'],
  displayName: [ (value) => value.length >= 1 , 'El nombre no puede estar vacío.' ]
};


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth );
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { formState, displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData , formValidations );

  

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    
    if ( !isFormValid ) return;
    dispatch(startCreatingUserWithEmailPassword(formState))
    
  }

  return (
   <AuthLayout title='Crear cuenta'>

        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt:2 }}>
              <TextField 
              label="Nombre" 
              type="text" 
              placeholder="Tu nombre" 
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={ onInputChange }
              error={ !!displayNameValid && formSubmitted}
              helperText={ displayNameValid }
              />
            </Grid>
            <Grid item xs={12} sx={{ mt:2 }}>
              <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@google.com" 
              fullWidth
              name='email'
              value={ email }
              error={ !!emailValid && formSubmitted}
              helperText={ emailValid }
              onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={12} sx={{ mt:2 }}>
              <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="******" 
              fullWidth
              name='password'
              value={ password }
              error={ !!passwordValid && formSubmitted}
              helperText={passwordValid}
              onChange={ onInputChange }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb : 2 , mt : 1}}>
              <Grid item xs={ 12 } sm={ 6 } display={!!errorMessage ? '' : 'none'}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                  disabled={ isCheckingAuthentication }
                  variant="contained"
                  fullWidth
                  type='submit'
                >Crear cuenta</Button>
              </Grid>

              <Grid container direction={"row"} justifyContent={"end"}>
                <Typography sx={{ mr:1 }}>¿Ya tienes cuenta?</Typography>
                <Link component={RouterDomLink} color="inherit" to="/auth/login">Ingresar</Link>
              </Grid>
            </Grid>

          </Grid>
        </form>
   </AuthLayout>
  )
}
