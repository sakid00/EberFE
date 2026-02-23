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
import Image from 'next/image';
import emptyActivity from '@/public/svg/empty-activity.svg';
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
    <Box sx={styles.tableWrapper}>
      {isLoading && (
        <Box sx={styles.tableLoadingOverlay}>
          <CircularProgress color="primary" />
        </Box>
      )}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={styles.tableContainerOuter(type, isLoading)}
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
            {rows.length > 0 ? (
              rows.map((row, index) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={cellTitles.length} sx={styles.emptyStateCell}>
                  <Box sx={styles.emptyState}>
                    <Image
                      src={emptyActivity}
                      alt="empty-product"
                      width={100}
                      height={100}
                      style={styles.emptyImage(type)}
                    />
                    <Typography sx={styles.emptyTitle}>
                      {t('product.empty_list_title')}
                    </Typography>
                    <Typography sx={styles.emptyDescription}>
                      {t('product.empty_list_desc')}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
