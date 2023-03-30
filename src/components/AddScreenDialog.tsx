/* eslint-disable prettier/prettier */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ComputerIcon from '../computer-monitor-icon.svg';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AddScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setCode = (event: any) => {
    console.log(event);
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleClickOpen}>
          <AddIcon /> Add Screen
        </Button>
      </Stack>
      <Dialog className="dialog-a" fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            variant="h6"
            component="h6">
            Don&apos;t have a display screen that is ready to use?
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}>
            {' '}
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              variant="h6"
              component="h6">
              Register your screen
            </Typography>
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '2rem' }}>
              <img height={100} width={100} src={ComputerIcon} />
            </Box>
            <Typography
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              variant="h6"
              component="h6">
              Enter the 6 character &apos;Screen Registration Code &apos; as shown on your signage
              screen
            </Typography>
          </DialogContentText>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TextField
              id="standard-helperText"
              label="Registration Code"
              variant="standard"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCode(event.target.value);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleClose}>
              Next
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
