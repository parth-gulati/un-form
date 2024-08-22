import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormData from "./components/FormData";
import Navbar from "./components/Navbar";
import Papa from 'papaparse';
import consolidated_csv from './csvs/consolidated_spreadsheet.csv'
import { useEffect, useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
            console.error('Error parsing CSV file:', error);
          },
        });
      })
      .catch((error) => console.error('Error fetching CSV file:', error));
  }, []);


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <FormData csvData={csvData} />
      </div>
    </ThemeProvider>
  );
}

export default App;
