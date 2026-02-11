import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

export const styles = {
  // Main container
  mainContainer: (type: DeviceType) => ({
    marginX: '2vw',
    marginTop: dynamicStylingValue(type, '-45vh', '-20vh', '-20vh'),
  }),

  // Header section styles
  headerContainer: {
    display: 'flex',
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    padding: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: '10vh',
    position: 'relative' as const,
    zIndex: 100,
  },

  headerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    padding: '16px',
    height: '80%',
    marginRight: '12px',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  customProductButton: {
    color: 'white',
    background:
      'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
    padding: '16px',
    borderRadius: '100px',
    textTransform: 'none' as const,
    fontSize: '0.875em',
    fontWeight: 700,
    '&:hover': {
      background:
        'linear-gradient(to right, rgba(255, 138, 0, 0.9), rgba(245, 75, 2, 0.9))',
    },
  },

  // Filter section styles
  filterContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '16px 20px',
    marginTop: '16px',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    position: 'relative' as const,
    zIndex: 10,
    gap: '8px',
  }),

  filterButtonContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
    overflowX: 'auto' as const,
    scrollBehavior: 'smooth' as const,
    flexGrow: 1,
    minWidth: 0,
    // Hide scrollbar but keep scrolling
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    msOverflowStyle: 'none' as const,
    scrollbarWidth: 'none' as const,
  }),

  // Filter button base style
  getFilterButtonStyle: (isActive: boolean, _type: DeviceType) => ({
    display: 'flex',
    color: isActive ? '#784791' : '#4B5563',
    backgroundColor: isActive ? '#D6CBE3' : '#F3F5F7',
    borderColor: isActive ? '#784791' : 'transparent',
    borderWidth: 1,
    borderStyle: 'solid' as const,
    borderRadius: '24px',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    minWidth: 'fit-content',
    padding: '18px 16px',
    textTransform: 'none' as const,
    fontSize: '0.85em',
    fontWeight: 500,
    lineHeight: 1.5,
  }),

  // Select dropdown base style
  getSelectStyle: (hasSelection: boolean, _type: DeviceType) => ({
    color: hasSelection ? '#784791' : '#4B5563',
    backgroundColor: hasSelection ? '#D6CBE3' : '#F3F5F7',
    borderColor: hasSelection ? '#784791' : 'transparent',
    borderWidth: 1,
    borderStyle: 'solid' as const,
    padding: '18px 16px',
    borderRadius: '24px',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    minWidth: 'fit-content',
    textTransform: 'none' as const,
    fontSize: '0.85em',
    fontWeight: 500,
    '& .MuiSelect-select': {
      padding: 0,
      paddingRight: '24px !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-icon': {
      right: 4,
      fontSize: '1.2em',
      color: hasSelection ? '#784791' : '#6B7280',
    },
  }),

  getApplicationSelectStyle: (hasSelection: boolean, _type: DeviceType) => ({
    color: hasSelection ? '#784791' : '#4B5563',
    backgroundColor: hasSelection ? '#D6CBE3' : '#F3F5F7',
    borderColor: hasSelection ? '#784791' : 'transparent',
    borderWidth: 1,
    borderStyle: 'solid' as const,
    padding: '4px 12px',
    borderRadius: '24px',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0,
    minWidth: 'fit-content',
    textTransform: 'none' as const,
    fontSize: '0.85em',
    fontWeight: 500,
    '& .MuiSelect-select': {
      padding: 0,
      paddingRight: '24px !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-icon': {
      right: 4,
      fontSize: '1.2em',
      color: hasSelection ? '#784791' : '#6B7280',
    },
  }),

  selectedCounter: {
    display: 'flex',
    alignItems: 'center',
  },

  selectedBadge: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C1B0D3',
    width: 'fit-content',
    paddingX: '10px',
    paddingY: '2px',
    fontSize: '0.85em',
  },

  selectedText: {
    marginLeft: '6px',
    color: '#784791',
    fontSize: '0.85em',
  },

  // Search field styles
  searchField: (type: DeviceType) => ({
    width: dynamicStylingValue(type, '180px', '200px', '220px'),
    minWidth: dynamicStylingValue(type, '150px', '180px', '200px'),
    flexShrink: 0,
    borderRadius: '24px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '24px',
      height: '60px',
      '& fieldset': {
        borderWidth: 0,
      },
      '&:hover fieldset': {
        borderWidth: 0,
      },
      '&.Mui-focused fieldset': {
        borderWidth: 0,
      },
    },
  }),

  searchInput: {
    backgroundColor: '#F3F5F7',
    fontSize: '0.85em',
  },

  searchIcon: {
    marginRight: '8px',
    fontSize: '1.1em',
    color: '#6B7280',
  },

  // Table styles
  tableContainer: (type: DeviceType) => ({
    marginTop: '16px',
    position: 'relative' as const,
    zIndex: 10,
    borderRadius: '20px',
    overflow: 'hidden',
    // Enable horizontal scrolling only on mobile
    overflowX: dynamicStylingValue(type, 'auto', 'visible', 'visible'),
    // Ensure smooth scrolling
    scrollBehavior: 'smooth',
    // Add custom scrollbar styling for better UX (only on mobile)
    ...(type === 'mobile' && {
      '&::-webkit-scrollbar': {
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#c1c1c1',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: '#a8a8a8',
        },
      },
    }),
  }),

  table: (type: DeviceType) => ({
    // Only set minWidth on mobile to force horizontal scroll
    minWidth: dynamicStylingValue(type, '650px', '100%', '100%'),
    // On desktop/tablet, use full width and let content wrap
    width: dynamicStylingValue(type, 'max-content', '100%', '100%'),
    // Allow table to be responsive on larger screens
    tableLayout: dynamicStylingValue(type, 'fixed', 'auto', 'auto'),
  }),

  tableHeaderRow: {
    backgroundColor: '#F9FAFB',
    '& .MuiTableCell-root': {
      borderBottom: '1px solid #E5E7EB',
    },
  },

  tableHeaderCell: (type: DeviceType) => ({
    fontWeight: 600,
    fontSize: dynamicStylingValue(type, '0.85em', '0.9em', '1.2em'),
    padding: dynamicStylingValue(type, '14px 10px', '16px 12px', '16px 12px'),
    color: '#784791',
    // Only set minWidth on mobile for horizontal scroll
    minWidth: dynamicStylingValue(type, '100px', 'auto', 'auto'),
    // Allow text wrapping on desktop/tablet
    whiteSpace: dynamicStylingValue(
      type,
      'nowrap' as const,
      'normal' as const,
      'normal' as const
    ),
  }),

  tableBodyRow: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '& .MuiTableCell-root': {
      borderBottom: '1px solid #F3F4F6',
    },
  },

  tableCodeCell: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.85em', '0.875em', '0.875em'),
    fontWeight: 400,
    color: '#374151',
    padding: dynamicStylingValue(type, '14px 10px', '16px 12px', '16px 12px'),
    // Only set minWidth on mobile
    minWidth: dynamicStylingValue(type, '100px', 'auto', 'auto'),
    // Allow text wrapping on desktop/tablet
    whiteSpace: dynamicStylingValue(
      type,
      'nowrap' as const,
      'normal' as const,
      'normal' as const
    ),
  }),

  tableDataCell: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.85em', '0.875em', '0.875em'),
    fontWeight: 400,
    color: '#374151',
    padding: dynamicStylingValue(type, '14px 10px', '16px 12px', '16px 12px'),
    // Only set minWidth on mobile
    minWidth: dynamicStylingValue(type, '100px', 'auto', 'auto'),
    // Allow text wrapping on desktop/tablet
    whiteSpace: dynamicStylingValue(
      type,
      'nowrap' as const,
      'normal' as const,
      'normal' as const
    ),
  }),

  tableDataCellWrappable: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.85em', '0.875em', '0.875em'),
    fontWeight: 400,
    color: '#374151',
    // Only set minWidth on mobile
    minWidth: dynamicStylingValue(type, '100px', 'auto', 'auto'),
    whiteSpace: 'normal' as const,
    wordWrap: 'break-word' as const,
    // Responsive maxWidth
    maxWidth: dynamicStylingValue(type, '200px', 'none', 'none'),
    lineHeight: '1.4',
    padding: dynamicStylingValue(type, '14px 10px', '16px 12px', '16px 12px'),
  }),

  // Pagination styles
  paginationContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '24px',
    padding: dynamicStylingValue(type, '12px 8px', '16px', '16px'),
    gap: dynamicStylingValue(type, '12px', '16px', '16px'),
    width: '100%',
    // Ensure proper spacing on mobile
    marginX: dynamicStylingValue(type, '0', '0', '0'),
  }),

  paginationInfo: (type: DeviceType) => ({
    fontSize: dynamicStylingValue(type, '0.75rem', '0.875rem', '0.875rem'),
    fontWeight: 400,
    color: '#6B7280',
    whiteSpace: 'nowrap' as const,
    // Hide on mobile, show on tablet and desktop
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

export const classNames = {
  mainContainer: 'mx-[2vw]',
  headerContainer:
    'flex backdrop-blur-sm bg-white/30 rounded-2xl p-5 justify-between items-center max-h-[10vh] relative z-10',
  headerContent: 'flex justify-center items-center',
  iconContainer:
    'justify-center items-center rounded-full p-4 h-[80%] flex mr-3',
  filterContainer:
    'flex bg-white rounded-2xl p-4 px-5 mt-4 justify-between items-center shadow-lg relative z-10',
  filterButtonContainer: 'flex flex-row w-[70%]',
  selectedCounter: 'flex items-center',
  selectedBadge:
    'rounded-full flex items-center justify-center bg-[#C1B0D3] w-fit px-3 py-1',
  searchInput: 'bg-[#F3F5F7]',
  searchIcon: 'mr-4',
  tableContainer: 'mt-4 relative z-10',
  tableHeaderRow: 'bg-[#F0EBF4]',
  tableHeaderCell: 'p-4 text-[#784791] font-medium text-[0.9em]',
  tableCodeCell: 'text-[0.875em] font-[400] text-[#374151] p-4',
  tableDataCell: 'text-[0.875em] font-[400] text-[#374151] p-4',
  tableDataCellWrappable:
    'text-[0.875em] font-[400] text-[#374151] whitespace-normal break-words max-w-[200px] leading-[1.4] p-4',
};
