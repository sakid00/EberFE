import {
  Box,
  CircularProgress,
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
import { useTranslation } from '@/hooks/useTranslation';

const ProductTable: React.FC<ProductTableProps> = ({
  cellTitles,
  rows,
  isLoading = false,
}) => {
  const { type } = useDeviceType();
  const { t } = useTranslation();
  return (
    <Box sx={{ position: 'relative' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 10,
            borderRadius: 1,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          ...styles.tableContainer(type),
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.2s ease-in-out',
          border: '1px solid #E5E7EB',
        }}
      >
      <Table sx={styles.table(type)} size="small" aria-label="products table">
        <TableHead>
          <TableRow sx={styles.tableHeaderRow}>
            {cellTitles.map((title, index) => (
              <TableCell align="center" key={`${index}-${title}`}>
                <Typography sx={styles.tableHeaderCell(type)}>
                  {t(title)}
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
                {row.coid}
              </TableCell>
              <TableCell
                component="th"
                align="center"
                scope="row"
                sx={styles.tableCodeCell(type)}
              >
                {row.productCode}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell(type)}>
                {row.group}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell(type)}>
                {row.segment}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell(type)}>
                {row.groupSbu}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell(type)}>
                {row.sbuName}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell(type)}>
                {row.groupName}
              </TableCell>
              <TableCell align="center" sx={styles.tableDataCell(type)}>
                {row.getMoreDetail}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default ProductTable;
