import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ImageBox from "./ImageBox";
import BasicDatePicker from "./BasicDatePicker";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignUp() {
  //TODO: template code - needs to be removed
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
          <Box component="form" noValidate sx={{ mt: 3 }}>
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
                      value={age}
                      label="Select Generic Name"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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
                      value={age}
                      label=""
                      disabled
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BasicDatePicker label="LPP Date"/>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                  <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Qty in MSN"
                    name="email"
                    type="number"
                    autoComplete="email"
                  />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Qty in UNSV"
                    name="email"
                    type="number"
                    autoComplete="email"
                  />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Qty Reqd."
                    name="email"
                    type="number"
                    autoComplete="email"
                  />
                  </Grid>
                </Grid>
                {/* <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="text"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid> */}
              </Grid>
              <Grid item xs={12} md={3} justifyContent={"space-around"} container spacing={1}>
                <ImageBox/>
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
