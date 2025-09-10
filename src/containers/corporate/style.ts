import { DeviceType, dynamicStylingValue } from '../../hooks/useDeviceType';

export const styles = {
  mainContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: dynamicStylingValue(type, 'column', 'row', 'row'),
    gap: dynamicStylingValue(type, '16px', '1%', '1%'),
    marginTop: dynamicStylingValue(type, '-60vh', '-20vh', '-20vh'),
  }),

  contentContainer: (type: DeviceType) => ({
    flex: 1,
    padding: dynamicStylingValue(type, '16px', '32px', '32px'),
    marginTop: dynamicStylingValue(type, '16px', '0px', '0px'),
    backgroundColor: 'white',
    borderRadius: '12px',
    zIndex: 100,
  }),

  infoBox: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    backgroundColor: '#F3F5F7',
    gap: '6px',
  },

  infoBox2: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '8px',
    backgroundColor: '#F3F5F7',
    gap: '6px',
    justifyContent: 'center',
    alignItems: 'center',
  },

  companyTitle: (type: DeviceType) => ({
    color: '#030712',
    fontSize: dynamicStylingValue(type, '1.2em', '2em', '2em'),
    fontWeight: 800,
    marginTop: '5%',
  }),

  addressLabel: (type: DeviceType) => ({
    color: '#4B5563',
    fontSize: dynamicStylingValue(type, '0.8em', '1em', '1em'),
    fontWeight: 400,
  }),

  addressValue: (type: DeviceType) => ({
    color: '#030712',
    fontSize: dynamicStylingValue(type, '0.8em', '1.2em', '1.2em'),
    fontWeight: 700,
  }),

  descriptionText: (type: DeviceType) => ({
    color: '#4B5563',
    fontSize: dynamicStylingValue(type, '0.8em', '1em', '1em'),
    fontWeight: 400,
  }),

  productApplicationTitle: (type: DeviceType) => ({
    color: '#030712',
    fontSize: dynamicStylingValue(type, '0.8em', '1.2em', '1.2em'),
    fontWeight: 800,
  }),

  titleContentText: {
    color: '#030712',
    fontSize: '0.8em',
    fontWeight: 800,
  },

  title3ContentText: {
    color: '#030712',
    fontSize: '1.2em',
    fontWeight: 800,
  },

  productApplicationText: (type: DeviceType) => ({
    color: '#4B5563',
    fontSize: dynamicStylingValue(type, '0.8em', '1em', '1em'),
    fontWeight: 400,
  }),

  infoBoxTitle: {
    fontSize: '0.8em',
    fontWeight: 700,
    color: '#030712',
  },

  infoBoxTitle2: {
    fontSize: '1.5em',
    fontWeight: 700,
    color: '#784791',
  },

  infoBoxValue: {
    fontSize: '0.8em',
    fontWeight: 400,
    color: '#030712',
  },

  infoBoxValue2: {
    textAlign: 'center',
    fontSize: '0.8em',
    fontWeight: 400,
    color: '#030712',
  },

  addressContainer: (type: DeviceType) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: dynamicStylingValue(type, 'flex-start', 'center', 'center'),
    gap: dynamicStylingValue(type, '16px', '0px', '0px'),
  }),

  addressTextContainer: {
    marginTop: '8px',
  },

  gridContainer: {
    marginTop: '24px',
  },

  productApplicationContainer: {
    marginTop: '20px',
  },

  mapsButton: (type: DeviceType) => ({
    padding: '2% 3%',
    borderRadius: '100px',
    backgroundColor: '#D6CBE3',
    color: '#784791',
    textTransform: 'none',
    fontSize: dynamicStylingValue(type, '0.5em', '1em', '1em'),
    '&:hover': {
      backgroundColor: '#C4B5D1',
    },
  }),

  headerImageStyle: {
    width: '100%',
    borderRadius: '8px',
  },

  imageGridContainer: (type: DeviceType) => ({
    display: 'grid',
    gridTemplateColumns: dynamicStylingValue(
      type,
      '1fr', // mobile: 1 column
      'repeat(2, 1fr)', // tablet: 2 columns
      'repeat(4, 1fr)' // desktop: 4 columns
    ),
    gap: dynamicStylingValue(type, '16px', '20px', '24px'),
    marginTop: '16px',
  }),

  imageCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },

  imageStyle: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover' as const,
    borderRadius: '8px',
    maxHeight: '150px',
  },

  imageTitle: (type: DeviceType) => ({
    width: '100%',
    color: '#4B5563',
    fontSize: dynamicStylingValue(type, '0.7em', '0.5em', '0.6em'),
    fontWeight: 500,
    textAlign: 'start',
  }),
};

export const constants = {
  companyList: [
    {
      name: 'PT Eternal Buana Chemical Industries',
      type: 'Manufacturing Facility',
    },
    { name: 'PT Eterindo Nusa Graha', type: 'Manufacturing Facility' },
    { name: 'Petrowidada', type: 'Manufacturing Facility' },
    { name: 'Mega Prima Solvindo', type: 'Manufacturing Facility' },
  ],

  infoboxList: [
    {
      title: 'Product Type',
      value: 'Certified to Standard',
    },
    {
      title: 'Certified to Standard',
      value: 'Certified to Standard',
    },
    {
      title: 'Capacity',
      value: 'Capacity',
    },
    {
      title: 'Capacity Storage Tank Raw Material',
      value: 'Capacity Storage Tank Raw Material',
    },
    {
      title: 'Solid R.M. – Finish Goods Whs Cap',
      value: 'Solid R.M. – Finish Goods Whs Cap',
    },
  ],

  address: 'Eber Tower, 123 Business District Jakarta, Indonesia 12345',

  description1:
    'First Production in 1982 with capacity 10.000 TPY, expanded to 20.000 TPY in 1986 then final expansion capacity to 82.000 TPY.',

  description2:
    'PT Eternal Buana Chemicals Industry Plant is one of the biggest Specialty Chemical Resin Production facility in Indonesia, occupying area app. 16,2 Hectare, located in Tangerang – Banten Province.',

  productApplicationDescription:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, aliquid excepturi placeat tempora non cum, quaerat voluptatem sint reprehenderit impedit nemo eveniet incidunt vero maiores harum. Non obcaecati repellendus eos?',
};
