import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import Dashboard from './components/Main';

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  // eslint-disable-next-line no-unused-vars
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
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
