import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Utility function to format numbers in Indian number format
function formatNumberToIndian(num) {
  if (num && !num.includes(',')) {
    // If the number is not already formatted
    const x = num.toString().split('.');
    let intPart = x[0];
    const decPart = x.length > 1 ? '.' + x[1] : '';
    const lastThree = intPart.slice(-3);
    const otherNumbers = intPart.slice(0, -3);
    if (otherNumbers !== '') {
      intPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    }
    return intPart + decPart;
  }
  return num; // Return as-is if already formatted
}

function createDataFromModal(modalData) {
  return modalData.map((item, index) => ({
    UnitName: item.UnitName,
    sNo: item.SNo || '',
    GenericName: item.GenericName || '',
    sec: '', // Leave blank as per your requirement
    catPartNo: '',
    nomenclature: item.NomenclatureName || '',
    au: item.AU || '',
    qtyHeld: formatNumberToIndian(item.QtyMsn || ''),
    qtyUnsv: formatNumberToIndian(item.QtyUnsv || ''),
    qtyReqd: formatNumberToIndian(item.QtyReqd || ''),
    lppLcr: formatNumberToIndian(item.LPP || ''),
    mktSvyRate: '', // Leave blank as per your requirement
    year: item.LppDate || '',
    escalationPercent: '', // Leave blank as per your requirement
    escalationAmt: '', // Leave blank as per your requirement
    newRate: formatNumberToIndian(item.newRate || ''),
    gstPercent: '18', // Leave blank as per your requirement
    gstAmt: formatNumberToIndian(item.GST || ''), // Leave blank as per your requirement
    costPerItem: formatNumberToIndian(parseFloat((item.newRate || '0').replace(/,/g, '')).toFixed(2)), // Ensure it's a string and format
    totalCost: formatNumberToIndian(item.TotalCost || ''),
    photo: '', // Leave blank as per your requirement
  }));
}


const Modal = ({ data, onDelete }) => {
  const rows = createDataFromModal(data);

  // Calculate totals
  const total = rows.reduce((sum, row) => sum + parseFloat(row.totalCost.replace(/,/g, '') || 0), 0);
  const roundOff = Math.round(total) - total;
  const grandTotal = total + roundOff;

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=842,width=595"); // A4 dimensions in points (height=842, width=595)
    printWindow.document.write("<html><head><title></title>");
    printWindow.document.write(`
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 10mm;
          position: relative;
          height: 100%;
          box-sizing: border-box;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          font-size: 10px; /* Adjust font size to fit within A4 */
          border: 1px solid black; /* Add border to the entire table */
        }
        th, td {
          border: 1px solid black; /* Add border to table cells */
          padding: 6px; /* Adjust padding for better fit */
          text-align: left;
          background-color: #f5f5f5; /* Uniform background color for all cells */
        }
        th {
          background-color: #f5f5f5;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        h4, h3 {
          text-align: center;
          margin-bottom: 20px;
        }
        .footer-text {
          position: absolute;
          bottom: 10mm; /* Stick text to the bottom with 10mm margin */
          left: 10mm; /* Align to the left */
          width: calc(100% - 20mm); /* Adjust width to fit within A4 */
          font-size: 10px; /* Consistent font size */
        }
        .appendix-text {
          position: absolute;
          top: 10mm; /* Stick to the top with 10mm margin */
          right: 10mm; /* Align to the right */
          font-size: 12px;
          font-weight: bold;
        }
        @media print {
          @page {
            size: A4;
            margin: 10mm; /* Standard A4 margin */
          }
          body {
            margin: 0;
          }
        }
      </style>
    `);
    printWindow.document.write("</head><body>");
    
    // Add "Appendix" text at the top right corner
    printWindow.document.write('<div class="appendix-text">Appendix</div>');
  
    printWindow.document.write(`<h3><u><b>UNIT NAME: ${data.length > 0 ? data[0]['UnitName'] : ''}</b></u></h3>`);
    printWindow.document.write("<h4><u><b>LIST OF ADDITIONALITIES IN RESPECT OF 9 KUMAON INDBATT-XXIV UNIFIL (2ND ROTATION): EX TRADE</b></u></h4>");
  
    // Clone the table for printing
    const table = document.querySelector("table");
    if (table) {
      const cloneTable = table.cloneNode(true);
      const thead = cloneTable.querySelector("thead");
      const tbody = cloneTable.querySelector("tbody");
  
      // Remove the last column from the header, ensuring it is not the "(t)" column
      thead.querySelectorAll("tr").forEach(row => {
        if (row.cells.length > 1 && !row.cells[row.cells.length - 1].innerText.includes("(t)")) {
          row.deleteCell(row.cells.length - 1); // Removes the last column if it's not "(t)"
        }
      });
  
      // Remove the last column from each row in the body, ensuring it is not the "(t)" column
      tbody.querySelectorAll("tr").forEach(row => {
        if (row.cells.length > 1 && !row.cells[row.cells.length - 1].innerText.includes("(t)")) {
          row.deleteCell(row.cells.length - 1); // Removes the last column if it's not "(t)"
        }
      });

       // Remove the last three rows (Total, Round Off, Grand Total) if they exist
       const totalRows = tbody.querySelectorAll("tr");
       if (totalRows.length >= 3) {
         totalRows[totalRows.length - 1].remove(); // Grand Total
         totalRows[totalRows.length - 2].remove(); // Round Off
         totalRows[totalRows.length - 3].remove(); // Total
       }
   
       // Append the total, round off, and grand total rows to the table with proper values
       const totalRow = document.createElement("tr");
       totalRow.innerHTML = `
         <td colspan="18" style="border: 1px solid black; text-align: right;"><b>Total</b></td>
         <td style="border: 1px solid black; text-align: left;">${formatNumberToIndian(total.toFixed(2))}</td>
       `;
       tbody.appendChild(totalRow);
   
       const roundOffRow = document.createElement("tr");
       roundOffRow.innerHTML = `
         <td colspan="18" style="border: 1px solid black; text-align: right;"><b>Round Off</b></td>
         <td style="border: 1px solid black; text-align: left;">${formatNumberToIndian(roundOff.toFixed(2))}</td>
       `;
       tbody.appendChild(roundOffRow);
   
       const grandTotalRow = document.createElement("tr");
       grandTotalRow.innerHTML = `
         <td colspan="18" style="border: 1px solid black; text-align: right;"><b>Grand Total</b></td>
         <td style="border: 1px solid black; text-align: left;">${formatNumberToIndian(grandTotal.toFixed(2))}</td>
       `;
       tbody.appendChild(grandTotalRow);
   
  
      printWindow.document.write(cloneTable.outerHTML);
    }
  
    // Append additional instructions at the bottom of the page
    printWindow.document.write(`
      <div class="footer-text">
        <p>(a) Coln No d,f,g & h will be filled by unit.</p>
        <p>(b) Coln No a,b,c,e,j,k,l,m,n,o,p & q will be filled by OSG in back hand.</p>
        <p>(c) Coln no s will be auto gen based on mathematical calculation {s=h(q+o)}.</p>
        <p>(d) Coln t will be filled subsequently as and when photos are available.</p>
      </div>
    `);
  
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  
  return (
    <>
      <DialogTitle>Unit Name: {data.length > 0 ? data[0]['UnitName'] : ''} </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, border: '1.5px solid white' }} aria-label="simple table">
            <TableHead sx={{ border: '1px solid white' }}>
              <TableRow>
                <TableCell sx={{ border: '1px solid white' }}>S No.</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Generic Name</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Sec</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Cat Part No</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Nomenclature</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>A/U</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Qty held in msn A</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Qty UNSV in Svy Bd</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Qty Reqd</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>LPP/LCR</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Mkt Svy Rate</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Year</TableCell>
                <TableCell sx={{ border: '1px solid white' }} align="center" colSpan={2}>Escalation per Year</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>New rate without GST</TableCell>
                <TableCell sx={{ border: '1px solid white' }} align="center" colSpan={2}>GST</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Cost per Item with GST</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Total Cost</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Photo</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>Actions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid white' }} colSpan={12}></TableCell>
                <TableCell sx={{ border: '1px solid white' }} align="center">%</TableCell>
                <TableCell sx={{ border: '1px solid white' }} align="center">Amt</TableCell>
                <TableCell sx={{ border: '1px solid white' }} colSpan={1}></TableCell>
                <TableCell sx={{ border: '1px solid white' }} align="center">%</TableCell>
                <TableCell sx={{ border: '1px solid white' }} align="center">Amt</TableCell>
                <TableCell sx={{ border: '1px solid white' }} colSpan={4}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid white' }}>(a)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>{' '}</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(b)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(c)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(d)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(e)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(f)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(g)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(h)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(j)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(k)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(l)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(m)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(n)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(o)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(p)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(q)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(r)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(s)</TableCell>
                <TableCell sx={{ border: '1px solid white' }}>(t)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid white' }}>{row.sNo}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.GenericName}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.sec}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.catPartNo}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.nomenclature}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.au}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.qtyHeld}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.qtyUnsv}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.qtyReqd}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.lppLcr}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.mktSvyRate}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.year}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }} align="center">{row.escalationPercent}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }} align="center">{row.escalationAmt}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.newRate}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }} align="center">{row.gstPercent}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }} align="center">{row.gstAmt}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.costPerItem}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.totalCost}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>{row.photo}</TableCell>
                  <TableCell sx={{ border: '1px solid white' }}>
                    <IconButton
                      color="secondary"
                      onClick={() => onDelete(index)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {/* Adding total, round off, and grand total rows */}
              <TableRow>
                <TableCell sx={{ border: '1px solid white' }} colSpan={18} align="right"><b>Total</b></TableCell>
                <TableCell sx={{ border: '1px solid white' }}>{formatNumberToIndian(total.toFixed(2))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid white' }} colSpan={18} align="right"><b>Round Off</b></TableCell>
                <TableCell sx={{ border: '1px solid white' }}>{formatNumberToIndian(roundOff.toFixed(2))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid white' }} colSpan={18} align="right"><b>Grand Total</b></TableCell>
                <TableCell sx={{ border: '1px solid white' }}>{formatNumberToIndian(grandTotal.toFixed(2))}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ mt: 3, mb: 2 }}
        >
          Print
        </Button>
        {rows.length === 0 && (
          <Typography
            variant="h6"
            align="center"
            style={{ margin: "20px 0", color: "#757575" }}
          >
            No Data
          </Typography>
        )}
      </DialogContent>
    </>
  );
};

export default Modal;
