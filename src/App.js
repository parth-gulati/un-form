import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormData from "./components/FormData";
import Navbar from "./components/Navbar";
import Papa from "papaparse";
import consolidated_csv from "./csvs/consolidated_spreadsheet.csv";
import { useEffect, useState } from "react";
import {  lightBlue } from "@mui/material/colors"; 

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d2d44", // Set the primary color to #1d2d44
    },
    secondary: {
      main: "#3e5c76",
    },
    background: {
      default: lightBlue[50],  // lightBlue[50] for background
      paper: "#3e5c76",   // This applies to Paper components
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: lightBlue[50], // Apply background color to the body
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "white", // Set the background color of the dropdown options to white
          "&:hover": {
            color: "#f0f0f0", // Optional: Set a hover color for better UX
          },
        },
      },
    },
  },
});
function App() {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    fetch(consolidated_csv)
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (result) => {
            setCsvData(result.data);
          },
          error: (error) => {
            console.error("Error parsing CSV file:", error);
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV file:", error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <FormData theme={theme} csvData={csvData} />
      </div>
    </ThemeProvider>
  );
}

export default App;
