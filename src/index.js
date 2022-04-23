import React from 'react';
import './index.css';
import { App } from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import ReactDOMClient from "react-dom/client";

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider  theme={createTheme({palette: {mode: 'dark'}})}>
        <App />
    </ThemeProvider>
  </React.StrictMode>
);