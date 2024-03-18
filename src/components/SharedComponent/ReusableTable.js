import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel, IconButton, Box, Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockOpenIcon from '@mui/icons-material/LockOpen';



const ReusableTable = ({ data, columns, onView, onDelete, onEdit, disableView, disableDelete, disableEdit, disableActionButton, onPageChange, onRowsPerPageChange, page, rowsPerPage, count, unlock, handleUnlock }) => {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');


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
      if (/\.(jpg|jpeg|gif|png|avif|tiff|JPG|JPEG|GIF|PNG|AVIF|TIFF|BMP|bmp|webp)$/.test(value[0])) {
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

            {columns.map((column, key) => (
              <TableCell variant='head' sx={{ textWrap: 'nowrap', fontWeight: 600 }} key={key}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            {!disableActionButton && <TableCell sx={{ textWrap: 'nowrap', fontWeight: 600 }}>Actions</TableCell>}


          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData && sortedData.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => {
                return (
                  <TableCell key={column.id}>
                    {IsImage(row[column.id])}
                  </TableCell>
                )
              })}
              {!disableActionButton &&
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {!disableView &&
                      <IconContainer onClick={() => onView(row)}>
                        <Tooltip title="View">
                          <VisibilityIcon />
                        </Tooltip>
                      </IconContainer>}

                    {!disableEdit &&
                      <IconContainer onClick={() => onEdit(row)}>
                        <Tooltip title="Update">
                          <EditIcon />
                        </Tooltip>
                      </IconContainer >
                    }

                    {!disableDelete &&
                      <IconContainer onClick={() => onDelete(row)}>
                        <Tooltip title="Delete">
                          <DeleteIcon />
                        </Tooltip>
                      </IconContainer>
                    }

                    {unlock &&
                      <IconContainer onClick={() => handleUnlock(row)}>
                        <Tooltip title="Unlock User">
                          <LockOpenIcon />
                        </Tooltip>
                      </IconContainer>}

                  </Box>
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
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