import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styles } from '../style';
import { ProductTableProps } from '../types';

const ProductTable: React.FC<ProductTableProps> = ({ cellTitles, rows }) => {
  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table sx={styles.table} size="small" aria-label="products table">
        <TableHead>
          <TableRow sx={styles.tableHeaderRow}>
            {cellTitles.map((title, index) => (
              <TableCell align="center" key={index}>
                <Typography sx={styles.tableHeaderCell}>{title}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.productCode} sx={styles.tableBodyRow}>
              <TableCell
                component="th"
                align="center"
                scope="row"
                sx={styles.tableCodeCell}
              >
                {row.productCode}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell}>
                {row.application}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell}>
                {row.perfFeature}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell}>
                {row.typeOfProd}
              </TableCell>
              <TableCell align="center">{row.getMoreDetail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
