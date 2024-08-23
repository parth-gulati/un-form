import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Enhanced Dynamic Table Component with Print and Delete Confirmation
const DynamicTable = ({ data, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);
      setOpenDialog(false);
      setDeleteIndex(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setDeleteIndex(null);
  };

  const handlePrint = () => {
    // Create a print window and prepare the table HTML
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print Table</title>");
    
    // Add print-specific CSS for borders
    printWindow.document.write(`
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        h4 {
          text-align: center;
        }
      </style>
    `);
    
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h4><u><b>LIST OF ADDITIONALITIES IN RESPECT OF 9 KUMAON INDBATT-XXIV UNFIL (2ND ROTATION): EX TRADE</u></b></h4>");
    
    // Extract the table element and remove the last column (Actions column)
    const table = document.querySelector("table");
    if (table) {
      const cloneTable = table.cloneNode(true);
      const headers = cloneTable.querySelectorAll("thead th");
      const rows = cloneTable.querySelectorAll("tbody tr");

      // Remove the last column from headers
      if (headers.length) {
        headers[headers.length - 1].remove();
      }

      // Remove the last column from each row
      rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        if (cells.length) {
          cells[cells.length - 1].remove();
        }
      });

      // Write the modified table to the print window
      printWindow.document.write(cloneTable.outerHTML);
    }

    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };


  return (
    <>
      <TableContainer component={Paper}>
        {data.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  {/* Dynamically create table headers */}
                  {Object.keys(data[0]).map((key) => (
                    <TableCell key={key}>{key.toUpperCase()}</TableCell>
                  ))}
                  {/* Actions column */}
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
                        onClick={() => handleDeleteClick(rowIndex)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Print button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrint}
              sx={{ mt: 3, mb: 2 }}
            >
              Print
            </Button>
          </>
        ) : (
          <Typography
            variant="h6"
            align="center"
            style={{ margin: "20px 0", color: "#757575" }}
          >
            No Data
          </Typography>
        )}
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DynamicTable;
