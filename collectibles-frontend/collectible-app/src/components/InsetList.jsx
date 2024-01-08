import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function InsetList({collectibles}) {
  
  return (
   <>
     {collectibles.map((collectible) => (
      <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
      key={collectible._id + collectible.collectibleName + collectible.issue}
      
    >
      <ListItem disablePadding>
        <ListItemButton to={`/collectibles/${collectible.collectibleType}/${collectible.collectibleName}`}>
          <ListItemIcon>
            <ArrowCircleRightIcon />
          </ListItemIcon>
          <ListItemText primary={collectible.collectibleName} />
        </ListItemButton>
      </ListItem>
      </List>
      ))}
      </>
  );
}