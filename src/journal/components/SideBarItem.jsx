import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { savingNewNote, setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ title ='', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch(); //Es algo sincrono, no necesitamos ir al thunk
    const newTitle = useMemo( () => {

      return title.length > 17 ? title.substring(0, 17) + '...' : title;

    }, [ title ]);

    const onClick = () => {
      dispatch( setActiveNote( { title ,body, id, date, imageUrls} ) );

    };

  return (
    <ListItem 
        disablePadding
    >
        <ListItemButton 
            onClick = { onClick }
        >
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
        <Grid container>
            <ListItemText primary={ newTitle } />
            <ListItemText secondary={ body } />
        </Grid>
        </ListItemButton>
    </ListItem>
  )
}
