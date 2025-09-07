import { DeviceType, dynamicStylingValue } from '@/hooks/useDeviceType';

export const styles = {
  // Main container
  mainContainer: {
    marginX: '2vw',
  },

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
    zIndex: 10,
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
    borderRadius: '8px',
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
    alignItems: 'center',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    position: 'relative' as const,
    zIndex: 10,
  }),

  filterButtonContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    width: dynamicStylingValue(type, '100%', '70%', '70%'),
    marginBottom: dynamicStylingValue(type, '20px', '0px', '0px'),
    gap: '20px',
  }),

  // Filter button base style
  getFilterButtonStyle: (isActive: boolean, type: DeviceType) => ({
    display: 'flex',
    color: isActive ? '#784791' : '#4B5563',
    backgroundColor: isActive ? '#D6CBE3' : '#F3F5F7',
    borderColor: isActive ? '#784791' : '#4B5563',
    borderWidth: isActive ? 1 : 0,
    borderRadius: '20px',
    marginRight: '0.5vw',
    width: dynamicStylingValue(type, '100%', '20%', '20%'),
    textTransform: 'none' as const,
    fontSize: '0.875em',
    fontWeight: 500,
  }),

  // Select dropdown base style
  getSelectStyle: (hasSelection: boolean, type: DeviceType) => ({
    color: hasSelection ? '#784791' : '#4B5563',
    backgroundColor: hasSelection ? '#D6CBE3' : '#F3F5F7',
    borderColor: hasSelection ? '#784791' : '#4B5563',
    borderWidth: hasSelection ? 1 : 0,
    padding: '16px',
    borderRadius: '20px',
    width: dynamicStylingValue(type, '100%', '40%', '40%'),
    marginRight: '0.5vw',
    textTransform: 'none' as const,
    fontSize: '0.875em',
    fontWeight: 500,
    '& .MuiSelect-select': {
      padding: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  }),

  getApplicationSelectStyle: (hasSelection: boolean, type: DeviceType) => ({
    color: hasSelection ? '#784791' : '#4B5563',
    backgroundColor: hasSelection ? '#D6CBE3' : '#F3F5F7',
    borderColor: hasSelection ? '#784791' : '#4B5563',
    borderWidth: hasSelection ? 1 : 0,
    padding: '16px',
    borderRadius: '20px',
    width: dynamicStylingValue(type, '100%', '40%', '40%'),
    marginRight: '0.5vw',
    textTransform: 'none' as const,
    fontSize: '0.875em',
    fontWeight: 500,
    '& .MuiSelect-select': {
      padding: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
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
    paddingX: '12px',
    paddingY: '4px',
  },

  selectedText: {
    marginLeft: '8px',
    color: '#784791',
  },

  // Search field styles
  searchField: (type: DeviceType) => ({
    width: dynamicStylingValue(type, '100%', '40%', '40%'),
    borderRadius: '20px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
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
  },

  searchIcon: {
    marginRight: '16px',
  },

  // Table styles
  tableContainer: {
    marginTop: '16px',
    position: 'relative' as const,
    zIndex: 10,
    borderRadius: '20px',
    overflow: 'hidden',
    // Enable horizontal scrolling on mobile
    overflowX: 'auto',
    // Ensure smooth scrolling
    scrollBehavior: 'smooth',
    // Add custom scrollbar styling for better UX
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
  },

  table: {
    minWidth: 650,
    // Ensure table doesn't shrink below minimum width
    width: 'max-content',
  },

  tableHeaderRow: {
    backgroundColor: '#F9FAFB',
    border: 0,
  },

  tableHeaderCell: {
    fontWeight: 600,
    fontSize: '1.2em',
    padding: '32px',
    color: '#784791',
    // Ensure minimum width for mobile readability
    minWidth: '120px',
    whiteSpace: 'nowrap' as const,
  },

  tableBodyRow: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },

  tableCodeCell: {
    backgroundColor: '#F9FAFB',
    fontSize: '1em',
    fontWeight: 400,
    minWidth: '120px',
    whiteSpace: 'nowrap' as const,
  },

  tableDataCell: {
    fontSize: '1em',
    fontWeight: 400,
    minWidth: '120px',
    whiteSpace: 'nowrap' as const,
  },

  tableDataCellWrappable: {
    fontSize: '1em',
    fontWeight: 400,
    minWidth: '120px',
    whiteSpace: 'normal' as const,
    wordWrap: 'break-word' as const,
    maxWidth: '200px',
    lineHeight: '1.4',
    padding: '16px',
  },
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
  tableHeaderRow: 'bg-[#F9FAFB] border-0',
  tableHeaderCell: 'p-8 text-[#784791]',
  tableCodeCell: 'bg-[#F9FAFB] text-[1em] font-[400]',
  tableDataCell: 'text-[1em] font-[400]',
  tableDataCellWrappable:
    'text-[1em] font-[400] whitespace-normal break-words max-w-[200px] leading-[1.4] p-4',
};
