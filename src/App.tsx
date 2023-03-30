/* eslint-disable no-unused-vars */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Box,
  Button,
  Container,
  createTheme,
  Link,
  ThemeProvider,
  Typography
} from '@mui/material';
import { orange } from '@mui/material/colors';
import Dashboard from './template/Dashboard';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const theme = createTheme({
  status: {
    danger: orange[500]
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
