import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

export const styles = {
  // Main container
  mainContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    marginTop: dynamicStylingValue(type, '-60vh', '-20vh', '-20vh'),
  }),

  // Content container
  contentContainer: (type: DeviceType) => ({
    flex: 1,
    padding: '32px',
    marginLeft: dynamicStylingValue(type, '0', '16px', '16px'),
    marginTop: dynamicStylingValue(type, '16px', '0', '0'),
    backgroundColor: 'white',
    borderRadius: '12px',
    zIndex: 100,
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  }),

  // Title styles
  title: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '1.5em', '2em', '2em'),
    fontWeight: 700,
    color: '#030712',
  }),

  subtitle: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.8em', '16px', '16px'),
    fontWeight: 400,
    color: '#4B5563',
    marginTop: '16px',
  }),

  // Activities grid
  activitiesGrid: (type: DeviceType) => ({
    width: '100%',
    maxWidth: '1200px',
    flexWrap: 'wrap',
    display: 'grid',
    gridTemplateColumns: dynamicStylingValue(
      type,
      '1fr',
      'repeat(3, 1fr)',
      'repeat(3, 1fr)'
    ),
    gridTemplateRows: dynamicStylingValue(
      type,
      'auto',
      'repeat(3, 1fr)',
      'repeat(3, 1fr)'
    ),
    gap: '16px',
    marginTop: '16px',
  }),

  // Empty state
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '10%',
    gridColumn: '1 / -1',
    marginTop: '15%',
    gap: '16px',
  },

  emptyImage: (type: DeviceType) => ({
    width: dynamicStylingValue(type, '50%', '25%', '25%'),
    height: 'auto',
    marginTop: '10%',
  }),

  emptyTitle: {
    fontSize: '1em',
    fontWeight: 700,
    color: '#030712',
  },

  emptyDescription: {
    fontSize: '0.8em',
    fontWeight: 400,
    color: '#4B5563',
    textAlign: 'center',
  },

  // Loading state
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    marginTop: '16px',
  },

  // Pagination styles (matching product page)
  paginationContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '24px',
    padding: dynamicStylingValue(type, '12px 8px', '16px', '16px'),
    gap: dynamicStylingValue(type, '12px', '16px', '16px'),
    width: '100%',
    marginX: dynamicStylingValue(type, '0', '0', '0'),
  }),

  paginationInfo: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.75rem', '0.875rem', '0.875rem'),
    fontWeight: 400,
    color: '#6B7280',
    whiteSpace: 'nowrap' as const,
    display: dynamicStylingValue(type, 'none', 'block', 'block'),
  }),

  paginationInfoMobile: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#6B7280',
    textAlign: 'center' as const,
    marginBottom: '8px',
  },

  pagination: (type: DeviceType) => ({
    '& .MuiPaginationItem-root': {
      color: '#784791',
      fontSize: dynamicStylingValue(type, '0.875rem', '1rem', '1rem'),
      minWidth: dynamicStylingValue(type, '32px', '40px', '40px'),
      height: dynamicStylingValue(type, '32px', '40px', '40px'),
      margin: dynamicStylingValue(type, '0 2px', '0 4px', '0 4px'),
      '&.Mui-selected': {
        backgroundColor: '#D6CBE3',
        color: '#784791',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: '#C1B0D3',
        },
      },
      '&:hover': {
        backgroundColor: '#F3F5F7',
      },
      // Better touch targets for mobile
      ...(type === 'mobile' && {
        minWidth: '36px',
        height: '36px',
        margin: '0 1px',
      }),
    },
    '& .MuiPaginationItem-ellipsis': {
      fontSize: dynamicStylingValue(type, '0.875rem', '1rem', '1rem'),
      color: '#9CA3AF',
    },
    '& .MuiPaginationItem-previousNext': {
      fontSize: dynamicStylingValue(type, '0.875rem', '1rem', '1rem'),
      minWidth: dynamicStylingValue(type, '32px', '40px', '40px'),
      height: dynamicStylingValue(type, '32px', '40px', '40px'),
      ...(type === 'mobile' && {
        minWidth: '36px',
        height: '36px',
      }),
    },
    // Responsive spacing
    '& .MuiPagination-ul': {
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: dynamicStylingValue(type, '4px', '8px', '8px'),
    },
  }),
};
