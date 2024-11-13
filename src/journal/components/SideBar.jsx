import { useSelector } from "react-redux";
import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"


export const SideBar = ({ drawerWidth }) => {
    const {displayName, errorMessage} = useSelector( state => state.auth);
    console.log(displayName);
    
  return (
    <Box
        component='nav'
        sx={{ width: {sm:drawerWidth}, flexShrink:{sm:0} }}
    >
        <Drawer
            variant='permanent' //Puede ser tmb temporary
            open //esto es equivalente a open='true'
            sx={{ display:{xs:'block'}, '& .MuiDrawer-paper':{boxSizing:'border-box', width: drawerWidth} }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {(displayName)
                    ? displayName
                    : 'user-name'}
                </Typography>
            </Toolbar>
            <Divider/>

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text=>(
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text }/>
                                    <ListItemText secondary={ 'asdasdasd' }/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ) )
                }
            </List>
        </Drawer>

    </Box>
  )
}
