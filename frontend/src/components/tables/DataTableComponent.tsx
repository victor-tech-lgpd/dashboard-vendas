// frontend/src/components/tables/DataTableComponent.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import useFetch from '../../hooks/useFetch';

interface SaleData {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  description?: string;
}

interface DataTableProps {
  apiQuery: string;
}

const DataTableComponent = ({ apiQuery }: DataTableProps) => {
  const { data, loading, error } = useFetch<SaleData[]>(`http://localhost:8000/sales?${apiQuery}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Preço Unitário</TableCell>
            <TableCell>Descrição</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.product_name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit_price}</TableCell>
              <TableCell>{item.description || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTableComponent;