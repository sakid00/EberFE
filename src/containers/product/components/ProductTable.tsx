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
import { useDeviceType } from '@/hooks';

const ProductTable: React.FC<ProductTableProps> = ({ cellTitles, rows }) => {
  const { type } = useDeviceType();
  return (
    <TableContainer component={Paper} sx={styles.tableContainer(type)}>
      <Table sx={styles.table(type)} size="small" aria-label="products table">
        <TableHead>
          <TableRow sx={styles.tableHeaderRow}>
            {cellTitles.map((title, index) => (
              <TableCell align="center" key={`${index}-${title}`}>
                <Typography sx={styles.tableHeaderCell(type)}>
                  {title}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.productCode}-${index}`}
              sx={styles.tableBodyRow}
            >
              <TableCell
                component="th"
                align="center"
                scope="row"
                sx={styles.tableCodeCell(type)}
              >
                {row.productCode}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell(type)}>
                {row.application}
              </TableCell>
              <TableCell
                align="center"
                sx={styles.tableDataCellWrappable(type)}
              >
                {row.perfFeature}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell(type)}>
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
