import React from 'react'
import ReusableTable from '../../components/SharedComponent/ReusableTable';

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
];

const columns = [
  { id: 'id', label: 'id' },
  { id: 'name', label: 'Name' },
  { id: 'position', label: 'Position' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
];

export default function UserManagement() {

  const handleDelete = (id) => {

  }

  return (
    // <ReusableTable columns={columns} data={rows} onDelete={handleDelete} />
    <></>
  )
}