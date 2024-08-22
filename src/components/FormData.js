import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ImageBox from "./ImageBox";
import BasicDatePicker from "./BasicDatePicker";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function FormData({ csvData }) {
  // State variables
  const [genericName, setGenericName] = useState(null);
  const [nomenclatureName, setNomenclatureName] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lppDate, setLppDate] = useState(null); // Assuming date is managed as an object
  const [qtyMsn, setQtyMsn] = useState("");
  const [qtyUnsv, setQtyUnsv] = useState("");
  const [qtyReqd, setQtyReqd] = useState("");
  const [genericOptions, setGenericOptions] = useState([]);

  useEffect(() => {
    if (csvData && csvData.length > 0) {
      setGenericOptions([
        ...new Set(
          csvData.map((item) => item?.CATEGORY)
        ),
      ]);
    }
  }, [csvData]);

  // Handle change functions
  const handleGenericNameChange = (event) => {
    setGenericName(event.target.value);
  };

  const handleNomenclatureNameChange = (event) => {
    setNomenclatureName(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLppDateChange = (date) => {
    setLppDate(date);
  };

  const handleQtyMsnChange = (event) => {
    setQtyMsn(event.target.value);
  };

  const handleQtyUnsvChange = (event) => {
    setQtyUnsv(event.target.value);
  };

  const handleQtyReqdChange = (event) => {
    setQtyReqd(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send the data to an API or display it
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="s">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "main" }}>
            <DynamicFormIcon />
          </Avatar>
          <Typography component="h1" variant="body1">
            Please fill out the form below
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} md={9} container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Generic Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={genericName}
                      label="Select Generic Name"
                      onChange={handleGenericNameChange}
                    >
                      {genericOptions.map((value, index) => {
                        return (
                          <MenuItem key={index} value={value}>
                            {capitalizeFirstLetter(value)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Nomenclature Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={nomenclatureName}
                      label=""
                      disabled={genericName==null || genericName === ""}
                      onChange={handleNomenclatureNameChange}
                    >
                      {csvData && csvData
                        .filter((item) => (item.CATEGORY === genericName))
                        .map((value, index) => {
                          return (
                            <MenuItem key={value.ID} value={value.NAME}>
                              {value.NAME}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="LPP"
                    autoFocus
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BasicDatePicker
                    label="LPP Date"
                    value={lppDate}
                    onChange={handleLppDateChange}
                  />
                </Grid>
                <Grid
                  item
                  container
                  sx={{ marginBottom: 2 }}
                  spacing={2}
                  xs={12}
                >
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="qtyMsn"
                      label="Qty in MSN"
                      name="qtyMsn"
                      type="number"
                      value={qtyMsn}
                      onChange={handleQtyMsnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="qtyUnsv"
                      label="Qty in UNSV"
                      name="qtyUnsv"
                      type="number"
                      value={qtyUnsv}
                      onChange={handleQtyUnsvChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="qtyReqd"
                      label="Qty Reqd."
                      name="qtyReqd"
                      type="number"
                      value={qtyReqd}
                      onChange={handleQtyReqdChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                justifyContent={"space-around"}
                container
                spacing={1}
              >
                <ImageBox />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Preview List
                </Button>
              </Grid>
              <Grid item xs={4} md={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Generate List
                </Button>
              </Grid>
              <Grid item xs={4} md={4}>
                <Button
                  color="primary"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Print
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mt={5}></Box>
      </Container>
    </ThemeProvider>
  );
}
