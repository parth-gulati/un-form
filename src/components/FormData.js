import React from "react";
import { TextField, Grid, Box, Button } from "@mui/material";
import ImageBox from "./ImageBox";

function FormData() {
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: "80%",
        margin: "auto",
        marginTop: "5%",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              width={"80%"}
              label="Generic Name"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField width={"80%"} label="Unit" variant="outlined" required />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
      
        <Grid item xs={12} sm={8}>
        <TextField
            fullWidth
            label="Generic Name"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Generic Name"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Generic Name"
            variant="outlined"
            required
          />

        </Grid>
        <Grid item xs={12} sm={4}>
          <ImageBox/>
        </Grid>
        {/* Column 1
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Generic Name"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nomenclature"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LPP"
            variant="outlined"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LPP Date"
            variant="outlined"
          />
        </Grid> */}

        {/* Submit Button spanning the full width */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormData;