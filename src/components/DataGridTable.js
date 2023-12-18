import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Input, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const rows = [
 { id: 1, name: 'John Doe', position: 'developer', email: 'John.doe@mail.com', role: 'Engineer' },
 { id: 2, name: 'Jane Smith', position: 'tester', email: 'John.doe@mail.com', role: 'Manager' },
 { id: 3, name: 'John Doe', position: 'developer', email: 'John.doe@mail.com', role: 'Engineer' },
 { id: 4, name: 'Jane Smith', position: 'tester', email: 'John.doe@mail.com', role: 'Manager' },
 { id: 5, name: 'John Doe', position: 'developer', email: 'John.doe@mail.com', role: 'Engineer' },
 { id: 6, name: 'Jane Smith', position: 'tester', email: 'John.doe@mail.com', role: 'Manager' },
 { id: 7, name: 'John Doe', position: 'developer', email: 'John.doe@mail.com', role: 'Engineer' },
 { id: 8, name: 'Jane Smith', position: 'tester', email: 'John.doe@mail.com', role: 'Manager' },
 { id: 9, name: 'John Doe', position: 'developer', email: 'John.doe@mail.com', role: 'Engineer' },
 { id: 10, name: 'Jane Smith', position: 'tester', email: 'John.doe@mail.com', role: 'Manager' },
 { id: 11, name: 'John Doe', position: 'developer', email: 'John.doe@mail.com', role: 'Engineer' },
 { id: 12, name: 'Jane Smith', position: 'tester', email: 'John.doe@mail.com', role: 'Manager' },
 // Add more data here
];

const columns = [
 { id: 'id', label: 'id' },
 { id: 'name', label: 'Name' },
 { id: 'position', label: 'Position' },
 { id: 'email', label: 'Email' },
 { id: 'role', label: 'Role' },
 { id: 'actions', label: 'Actions' }, // For edit and delete buttons
];

const DataGridTable = () => {
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);
 const [editingRowId, setEditingRowId] = useState(null);
 const [editedRows, setEditedRows] = useState({});
 const [data, setData] = useState(rows)


 const handleEdit = (id) => {
  setEditingRowId(id);
  setEditedRows({ ...editedRows, [id]: { ...rows.find((row) => row.id === id) } });
 };

 const handleDelete = (id) => {
  let filtered = rows.filter(i => i.id !== id)
  setData(filtered)
 }

 const handleSave = (id) => {
  // Implement save functionality
  console.log('Save edited row with id:', id, 'Data:', editedRows[id]);
  setEditingRowId(null);
 };

 const handleCancel = (id) => {
  // Implement cancel functionality
  console.log('Cancel editing row with id:', id);
  setEditingRowId(null);
 };

 const handleInputChange = (id, field, value) => {
  setEditedRows({
   ...editedRows,
   [id]: {
    ...editedRows[id],
    [field]: value,
   },
  });
 };

 return (
  <Paper>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow>
       {columns.map((column) => (
        <TableCell key={column.id}>{column.label}</TableCell>
       ))}
      </TableRow>
     </TableHead>
     <TableBody>
      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
       <TableRow key={row.id}>
        {Object.keys(row).map((key) => (
         <TableCell key={key}>
          {editingRowId === row.id ? (
           <Input
            value={editedRows[row.id][key]}
            onChange={(e) => handleInputChange(row.id, key, e.target.value)}
           />
          ) : (
           row[key]
          )}
         </TableCell>
        ))}
        <TableCell>
         {editingRowId === row.id ? (
          <>
           <Button onClick={() => handleSave(row.id)}>Save</Button>
           <Button onClick={() => handleCancel(row.id)}>Cancel</Button>
          </>
         ) : (
          <>
           <IconButton onClick={() => handleEdit(row.id)}><EditIcon /></IconButton>
           <IconButton onClick={() => handleDelete(row.id)}> <DeleteIcon /></IconButton>
          </>
         )}
        </TableCell>
       </TableRow>
      ))}
     </TableBody>
    </Table>
   </TableContainer>
   <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={rows.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={(event, newPage) => setPage(newPage)}
    onRowsPerPageChange={(event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
    }}
   />
  </Paper >
 );
};

export default DataGridTable;
