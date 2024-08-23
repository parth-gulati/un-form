import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import ImageBox from "./ImageBox";
import BasicDatePicker from "./BasicDatePicker";
import Modal from "./Modal"; // Assuming this is a dynamic table component
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

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
  const [lppDate, setLppDate] = useState(dayjs()) // Assuming date is managed as an object
  const [qtyMsn, setQtyMsn] = useState("");
  const [qtyUnsv, setQtyUnsv] = useState("");
  const [qtyReqd, setQtyReqd] = useState("");
  const [genericOptions, setGenericOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(() => {
    // Initialize state from localStorage or fallback to an empty array
    const savedData = localStorage.getItem("modalData");
    return savedData ? JSON.parse(savedData) : [];
  });

  // Validation state variables
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Update local storage whenever modalData changes
  useEffect(() => {
    localStorage.setItem("modalData", JSON.stringify(modalData));
  }, [modalData]);

  useEffect(() => {
    if (csvData && csvData.length > 0) {
      setGenericOptions([...new Set(csvData.map((item) => item?.CATEGORY))]);
    }
  }, [csvData]);

  const handleDelete = (index) => {
    // Remove item from modalData
    const newData = [...modalData];
    newData.splice(index, 1);
    setModalData(newData);
  };

  // Handle change functions
  const handleGenericNameChange = (event) => {
    setGenericName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, genericName: null })); // Clear errors
  };

  const handleNomenclatureNameChange = (event) => {
    setNomenclatureName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, nomenclatureName: null })); // Clear errors
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, firstName: null })); // Clear errors
  };

  const handleLppDateChange = (date) => {
    // Set the date if it's a valid dayjs object, otherwise, set to null
    setLppDate(date && dayjs.isDayjs(date) ? date : null);
    setErrors((prevErrors) => ({ ...prevErrors, lppDate: null })); // Clear errors
  };

  const handleQtyMsnChange = (event) => {
    setQtyMsn(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, qtyMsn: null })); // Clear errors
  };

  const handleQtyUnsvChange = (event) => {
    setQtyUnsv(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, qtyUnsv: null })); // Clear errors
  };

  const handleQtyReqdChange = (event) => {
    setQtyReqd(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, qtyReqd: null })); // Clear errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validation check
    const newErrors = {};
    if (!genericName) newErrors.genericName = "Generic Name is required.";
    if (!nomenclatureName)
      newErrors.nomenclatureName = "Nomenclature Name is required.";
    if (!firstName) newErrors.firstName = "First Name (LPP) is required.";
    if (!lppDate || !dayjs.isDayjs(lppDate) || !lppDate.isValid()) {
      newErrors.lppDate = "LPP Date is required and must be a valid date.";
    }
    if (!qtyMsn) newErrors.qtyMsn = "Quantity in MSN is required.";
    if (!qtyUnsv) newErrors.qtyUnsv = "Quantity in UNSV is required.";
    if (!qtyReqd) newErrors.qtyReqd = "Quantity Required is required.";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("Form validation failed", newErrors); // Debugging
      return;
    }
  
    // Prepare the new data entry
    const newData = {
      GenericName: capitalizeFirstLetter(genericName),
      NomenclatureName: nomenclatureName,
      FirstName: firstName,
      LppDate: lppDate ? lppDate.format('YYYY-MM-DD') : "", // Format date using dayjs
      QtyMsn: qtyMsn,
      QtyUnsv: qtyUnsv,
      QtyReqd: qtyReqd,
    };
  
    console.log("Adding new data to list", newData); // Debugging
  
    // Update modalData with the new entry
    setModalData((prevData) => {
      const updatedData = [...prevData, newData];
      console.log("Updated modalData", updatedData); // Debugging
      return updatedData;
    });
  
    // Optionally reset form fields after adding to the list
    setGenericName(null);
    setNomenclatureName(null);
    setFirstName("");
    setLppDate(dayjs()); // Reset to current date or default value
    setQtyMsn("");
    setQtyUnsv("");
    setQtyReqd("");
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
                  <FormControl fullWidth error={!!errors.genericName}>
                    <InputLabel id="generic-name-label">
                      Select Generic Name
                    </InputLabel>
                    <Select
                      labelId="generic-name-label"
                      id="generic-name-select"
                      value={genericName}
                      label="Select Generic Name"
                      onChange={handleGenericNameChange}
                    >
                      {genericOptions.map((value, index) => (
                        <MenuItem key={index} value={value}>
                          {capitalizeFirstLetter(value)}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.genericName && (
                      <Typography variant="body2" color="error">
                        {errors.genericName}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={!!errors.nomenclatureName}
                    disabled={!genericName}
                  >
                    <InputLabel id="nomenclature-name-label">
                      Select Nomenclature Name
                    </InputLabel>
                    <Select
                      labelId="nomenclature-name-label"
                      id="nomenclature-name-select"
                      value={nomenclatureName}
                      label="Select Nomenclature Name"
                      onChange={handleNomenclatureNameChange}
                    >
                      {csvData &&
                        csvData
                          .filter((item) => item.CATEGORY === genericName)
                          .map((value, index) => (
                            <MenuItem key={value.ID} value={value.NAME}>
                              {value.NAME}
                            </MenuItem>
                          ))}
                    </Select>
                    {errors.nomenclatureName && (
                      <Typography variant="body2" color="error">
                        {errors.nomenclatureName}
                      </Typography>
                    )}
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
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <BasicDatePicker
                    defaultValue={dayjs()}
                    label="LPP Date"
                    value={lppDate}
                    error={!!errors.lppDate}
                    helperText={errors.lppDate}
                    onChange={handleLppDateChange}
                  />
                  </LocalizationProvider>
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
                      error={!!errors.qtyMsn}
                      helperText={errors.qtyMsn}
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
                      error={!!errors.qtyUnsv}
                      helperText={errors.qtyUnsv}
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
                      error={!!errors.qtyReqd}
                      helperText={errors.qtyReqd}
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
              <Grid item xs={6} md={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add to List
                </Button>
              </Grid>
              <Grid item xs={6} md={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleClickOpen}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Preview List
                </Button>
                {/* Dialog with dynamic table */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  maxWidth="lg"
                  fullWidth
                >
                  <DialogTitle>Preview</DialogTitle>
                  <DialogContent>
                    {/* Pass modalData to the Modal component */}
                    <Modal data={modalData} onDelete={handleDelete} />
                  </DialogContent>
                </Dialog>
              </Grid>
             
            </Grid>
          </Box>
        </Box>
        <Box mt={5}></Box>
      </Container>
    </ThemeProvider>
  );
}
