import { Link as RouterDomLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';


const formData = {
  email: 'flavionieves@gmail.com',
  password: '123456',
  displayName: 'Flavio Ortiz',
}

//*Vamos a crear nuestras propias validaciones y enviarlas como un objeto a nuestro custom hook
const formValidations = {
  email: [ ( value ) => { return value.includes('@') }, 'El correo debe contener un @.'],
  password: [(value) => {return value.lenght >= 6  }, 'El password debe contener al menos 6 letras.'],
  displayName: [ (value) => { return value.lenght >= 1 }, 'El nombre no puede estar vacío.' ]
}


export const RegisterPage = () => {

  const { formState, displayName, email, password, onInputChange,
          isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData , formValidations );

  const onSubmit = (event) => {
    event.preventDefault();
    console.log( formState );
    
  }

  return (
   <AuthLayout title='Crear cuenta'>

        <form onSubmit={ onSubmit }>
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
              error={ !displayNameValid }
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
              onChange={ onInputChange }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb : 2 , mt : 1}}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button
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
