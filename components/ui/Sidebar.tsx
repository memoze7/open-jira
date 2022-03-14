import { useContext } from 'react';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';

import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

import { UIContext } from '../../context/ui/UIContext';

const menuItem: string[] = [ 'Inbox', 'Starred', 'Send Email', 'Draft' ]

export const Sidebar = () => {


  const { sideMenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer
      anchor={'left'}
      open={sideMenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: "250px" }}>

        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>Menú</Typography>
        </Box>


        <List>
          {menuItem.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2
                  ? <WidgetsOutlinedIcon />
                  : <MailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />

            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          {menuItem.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2
                  ? <WidgetsOutlinedIcon />
                  : <MailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}