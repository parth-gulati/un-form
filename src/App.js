import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormData from "./components/FormData";
import Navbar from "./components/Navbar";
import Papa from "papaparse";
import consolidated_csv from "./csvs/consolidated_spreadsheet.csv";
import { useEffect, useState } from "react";
import { purple, blue, lightBlue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: purple,
    background: {
      default: lightBlue[50],  // lightBlue[50] for background
      paper: lightBlue[100],   // This applies to Paper components
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
