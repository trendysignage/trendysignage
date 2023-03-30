/* eslint-disable prettier/prettier */
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TvIcon from '@mui/icons-material/Tv';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PublishIcon from '@mui/icons-material/Publish';
import AppsIcon from '@mui/icons-material/Apps';
import AssessmentIcon from '@mui/icons-material/Assessment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <TvIcon />
      </ListItemIcon>
      <ListItemText primary="Screen" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PermMediaIcon />
      </ListItemIcon>
      <ListItemText primary="Media" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PublishIcon />
      </ListItemIcon>
      <ListItemText primary="Publish" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AppsIcon />
      </ListItemIcon>
      <ListItemText primary="Apps" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
  </React.Fragment>
);