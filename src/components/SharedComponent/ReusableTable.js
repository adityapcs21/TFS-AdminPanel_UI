import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel, IconButton, Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import VisibilityIcon from '@mui/icons-material/Visibility';


const ReusableTable = ({ data, columns, onView, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = data && data.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    return (order === 'asc' ? aValue > bValue : aValue < bValue) ? 1 : -1;
  });

  function IsImage(value) {
    if (Array.isArray(value)) {
      if (/\.(jpg|jpeg|gif|png)$/.test(value[0])) {
        return <ImageCont src={value[0]} alt="thumbnails" />
      }
      else {
        return <ImageCont src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg" alt="no image" />
      }
    }
    else {
      return <Box sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value && value.toString()}</Box>
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>

            {columns.map((column) => (
              <TableCell variant='head' sx={{ textWrap: 'nowrap', fontWeight: 600 }} key={column.id}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ textWrap: 'nowrap', fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData && sortedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => {
                  return (
                    <TableCell key={column.id}>

                      {IsImage(row[column.id])}
                    </TableCell>
                  )
                })}
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconContainer onClick={() => onView(row)}>
                      <VisibilityIcon />
                    </IconContainer>
                    <IconContainer onClick={() => onEdit(row)}>
                      <EditIcon />
                    </IconContainer >
                    <IconContainer onClick={() => onDelete(row)}>
                      <DeleteIcon />
                    </IconContainer>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data && data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
export default ReusableTable;

const ImageCont = styled('img')({
  width: '80px',
  height: 'auto',
  borderRadius: '4px',
  ":hover": {
    backgroundColor: ''
  }
})

const IconContainer = styled(IconButton)({
  opacity: "0.9"
})