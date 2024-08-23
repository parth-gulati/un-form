import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Enhanced Dynamic Table Component with Delete Button
const DynamicTable = ({ data, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      {data.length > 0 ? ( // Check if data is available
        <Table>
          <TableHead>
            <TableRow>
              {/* Dynamically create table headers */}
              {Object.keys(data[0]).map((key) => (
                <TableCell key={key}>{key.toUpperCase()}</TableCell>
              ))}
              {/* Additional column for actions */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Dynamically create table rows */}
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell key={cellIndex}>{value}</TableCell>
                ))}
                {/* Delete button for each row */}
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => onDelete(rowIndex)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        // Show "No Data" message when the data array is empty
        <Typography
          variant="h6"
          align="center"
          style={{ margin: "20px 0", color: "#757575" }}
        >
          No Data
        </Typography>
      )}
    </TableContainer>
  );
};

export default DynamicTable;
