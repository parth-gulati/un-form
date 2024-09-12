import React from "react";
import {
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
  return num;
}

function createDataFromModal(modalData) {
  return modalData.map((item, index) => ({
    UnitName: item.UnitName,
    sNo: item.SNo || '',
    GenericName: item.GenericName || '',
    sec: '',
    catPartNo: '',
    nomenclature: item.NomenclatureName || '',
    au: item.AU || '',
    qtyHeld: formatNumberToIndian(item.QtyMsn || ''),
    qtyUnsv: formatNumberToIndian(item.QtyUnsv || ''),
    qtyReqd: formatNumberToIndian(item.QtyReqd || ''),
    lppLcr: formatNumberToIndian(item.LPP || ''),
    mktSvyRate: '',
    year: item.LppDate || '',
    escalationPercent: item.EscalationYearPercentage || '',
    escalationAmt: formatNumberToIndian(item.EscalationYearAmt || ''),
    newRate: formatNumberToIndian(item.newRate || ''),
    gstPercent: '18',
    gstAmt: formatNumberToIndian(item.GST || ''),
    costPerItem: formatNumberToIndian(item.costPerItem || ''),
    totalCost: formatNumberToIndian(item.TotalCost || ''),
    photo: '',
  }));
}

const Modal = ({ data, onDelete }) => {
  const rows = createDataFromModal(data);

  // Calculate totals
  const total = rows.reduce((sum, row) => sum + parseFloat(row.totalCost.replace(/,/g, '') || 0), 0);
  const roundOff = Math.round(total) - total;
  const grandTotal = total + roundOff;

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=842,width=595");
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
          font-size: 10px;
          border: 1px solid black;
        }
        th, td {
          border: 1px solid black;
          padding: 6px;
          text-align: left;
          background-color: #f5f5f5;
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
          bottom: 10mm;
          left: 10mm;
          width: calc(100% - 20mm);
          font-size: 10px;
        }
        .appendix-text {
          position: absolute;
          top: 10mm;
          right: 10mm;
          font-size: 12px;
          font-weight: bold;
        }
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            margin: 0;
          }
        }
      </style>
    `);
    printWindow.document.write("</head><body>");
    printWindow.document.write('<div class="appendix-text">Appendix</div>');
    printWindow.document.write(`<h3><u><b>UNIT NAME: ${data.length > 0 ? data[0]['UnitName'] : ''}</b></u></h3>`);

    const table = document.querySelector("table");
    if (table) {
      const cloneTable = table.cloneNode(true);
      const thead = cloneTable.querySelector("thead");
      const tbody = cloneTable.querySelector("tbody");

      thead.querySelectorAll("tr").forEach(row => {
        if (row.cells.length > 1 && !row.cells[row.cells.length - 1].innerText.includes("(t)")) {
          row.deleteCell(row.cells.length - 1);
        }
      });

      tbody.querySelectorAll("tr").forEach(row => {
        if (row.cells.length > 1 && !row.cells[row.cells.length - 1].innerText.includes("(t)")) {
          row.deleteCell(row.cells.length - 1);
        }
      });

      const totalRows = tbody.querySelectorAll("tr");
      if (totalRows.length >= 3) {
        totalRows[totalRows.length - 1].remove();
        totalRows[totalRows.length - 2].remove();
        totalRows[totalRows.length - 3].remove();
      }

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

    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleExportCSV = () => {
    const csvRows = [];
    const headers = [
      ' ', 'S No.', 'Generic Name', 'Sec', 'Cat Part No', 'Nomenclature', 'A/U', 
      'Qty held in msn A', 'Qty UNSV in Svy Bd', 'Qty Reqd', 'LPP/LCR', 'Year',
      'Mkt Svy Rate', 'Escalation per Year %', 'Escalation per Year Amt', 
      'New rate without GST', 'GST %', 'GST Amt', 'Cost per Item with GST', 'Total Cost', 'Photo'
    ];
    csvRows.push(headers.join(','));
  
    rows.forEach(row => {
      const rowData = [ '',
        `"${row.sNo}"`, `"${row.GenericName}"`, `"${row.sec}"`, `"${row.catPartNo}"`, 
        `"${row.nomenclature}"`, `"${row.au}"`, `"${row.qtyHeld}"`, `"${row.qtyUnsv}"`, 
        `"${row.qtyReqd}"`, `"${row.lppLcr}"`, `"${row.year}"`, `"${row.mktSvyRate}"`, 
        `"${row.escalationPercent}"`, `"${row.escalationAmt}"`, `"${row.newRate}"`, 
        `"${row.gstPercent}"`, `"${row.gstAmt}"`, `"${row.costPerItem}"`, 
        `"${row.totalCost}"`, `"${row.photo}"`
      ];
      csvRows.push(rowData.join(','));
    });
  
    const totalRow = [
      '"Total"', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
      `"${formatNumberToIndian(total.toFixed(2))}"`, ''
    ];
    const roundOffRow = [
      '"Round Off"', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
      `"${formatNumberToIndian(roundOff.toFixed(2))}"`, ''
    ];
    const grandTotalRow = [
      '"Grand Total"', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
      `"${formatNumberToIndian(grandTotal.toFixed(2))}"`, ''
    ];
  
    csvRows.push(totalRow.join(','));
    csvRows.push(roundOffRow.join(','));
    csvRows.push(grandTotalRow.join(','));
  
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "table_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <>
      <DialogTitle>Unit Name: {data.length > 0 ? data[0]['UnitName'] : ''} </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, border: '1.5px solid black' }} aria-label="simple table">
            <TableHead sx={{ border: '1px solid black' }}>
              <TableRow>
                <TableCell sx={{ border: '1px solid black' }}>S No.</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Generic Name</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Sec</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Cat Part No</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Nomenclature</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>A/U</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Qty held in msn A</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Qty UNSV in Svy Bd</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Qty Reqd</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>LPP/LCR</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Year</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Mkt Svy Rate</TableCell>
                <TableCell sx={{ border: '1px solid black' }} align="center" colSpan={2}>Escalation per Year (Compoundly)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>New rate without GST</TableCell>
                <TableCell sx={{ border: '1px solid black' }} align="center" colSpan={2}>GST</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Cost per Item with GST</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Total Cost</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Photo</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Actions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid black' }} colSpan={12}></TableCell>
                <TableCell sx={{ border: '1px solid black' }} align="center">%</TableCell>
                <TableCell sx={{ border: '1px solid black' }} align="center">Amt</TableCell>
                <TableCell sx={{ border: '1px solid black' }} colSpan={1}></TableCell>
                <TableCell sx={{ border: '1px solid black' }} align="center">%</TableCell>
                <TableCell sx={{ border: '1px solid black' }} align="center">Amt</TableCell>
                <TableCell sx={{ border: '1px solid black' }} colSpan={4}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid black' }}>(a)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{' '}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(b)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(c)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(d)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(e)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(f)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(g)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(h)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(j)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(k)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(l)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(m)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(n)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(o)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(p)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(q)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(r)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(s)</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>(t)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid black' }}>{row.sNo}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.GenericName}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.sec}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.catPartNo}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.nomenclature}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.au}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.qtyHeld}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.qtyUnsv}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.qtyReqd}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.lppLcr}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.year}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.mktSvyRate}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }} align="center">{row.escalationPercent}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }} align="center">{row.escalationAmt}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.newRate}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }} align="center">{row.gstPercent}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }} align="center">{row.gstAmt}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.costPerItem}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.totalCost}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.photo}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>
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
              <TableRow>
                <TableCell sx={{ border: '1px solid black' }} colSpan={18} align="right"><b>Total</b></TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{formatNumberToIndian(total.toFixed(2))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid black' }} colSpan={18} align="right"><b>Round Off</b></TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{formatNumberToIndian(roundOff.toFixed(2))}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid black' }} colSpan={18} align="right"><b>Grand Total</b></TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{formatNumberToIndian(grandTotal.toFixed(2))}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ mt: 3, mb: 2, mr: 2 }}
        >
          Print
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportCSV}
          sx={{ mt: 3, mb: 2 }}
        >
          Export CSV
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
