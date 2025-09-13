import React from 'react';
import { 
  Skeleton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Box
} from '@mui/material';
import { DeviceType } from '@/hooks/useDeviceType';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  type: DeviceType;
  showHeader?: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 5, 
  columns = 5,
  type,
  showHeader = true 
}) => {
  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      {/* Filter skeleton */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexDirection: type === 'mobile' ? 'column' : 'row' }}>
        <Skeleton variant="rectangular" width={type === 'mobile' ? '100%' : 200} height={56} animation="wave" />
        <Skeleton variant="rectangular" width={type === 'mobile' ? '100%' : 200} height={56} animation="wave" />
        <Skeleton variant="rectangular" width={type === 'mobile' ? '100%' : 150} height={56} animation="wave" />
      </Box>

      {/* Search skeleton */}
      <Skeleton variant="rectangular" width={type === 'mobile' ? '100%' : 300} height={56} animation="wave" sx={{ marginBottom: 2 }} />

      {/* Table skeleton */}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          {showHeader && (
            <TableHead>
              <TableRow>
                {Array.from({ length: columns }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton variant="text" height={24} animation="wave" />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    {colIndex === columns - 1 ? (
                      // Last column with button
                      <Skeleton variant="rectangular" width={120} height={36} animation="wave" />
                    ) : (
                      <Skeleton 
                        variant="text" 
                        height={20} 
                        width={`${Math.random() * 40 + 60}%`} 
                        animation="wave" 
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Skeleton variant="rectangular" width={300} height={40} animation="wave" />
      </Box>
    </Box>
  );
};

export default TableSkeleton;
