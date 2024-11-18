import { useEffect, useMemo } from "react";
import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startSaveNote } from "../../store/journal";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved , isSaving} = useSelector( state => state.journal ); //* Ahora active, que viene del state journal, sera conocido como note.
    const { body, title, onInputChange, formState, date } = useForm( note );

    const dateString = useMemo(() => {

        const newDate = new Date( date );
        return newDate.toUTCString();

    }, [date]);

    useEffect(() => {

      dispatch( setActiveNote(formState) );
    
    }, [formState]);

    useEffect(() => {

      if(messageSaved.length > 0){
        Swal.fire('Nota actualizada', messageSaved, 'success');
      }

    }, [messageSaved]);
    
    
    const onSaveNote = () => {
      dispatch( startSaveNote() );
    }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb:1 }} className="animate__animated animate__fadeIn animate__faster">
        <Grid item>
            <Typography fontSize={39} fontWeight="light" >{ dateString }</Typography>
        </Grid>
        <Grid item>
            <Button
                disabled={ isSaving }
                onClick={ onSaveNote } 
                color="primary" xs={{padding: 2}}>
                <SaveOutlined sx={{ fontSize: 30, mr:1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label='Título'
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Descripción del trabajo"
                minRows={5}
                name="body"
                value={ body }
                onChange={ onInputChange }
                />
        </Grid>

        {/* Image Gallery */}
        <ImageGallery/>

    </Grid>
  )
}