import Photo from '@public/photo/lab-person.png';
import EmailIcon from '@public/icon/email_purple.svg';
import PhoneIcon from '@public/icon/phone_purple.svg';
import LocationIcon from '@public/icon/location_purple.svg';
import SubmitProduct from '@/containers/submit-product';

const infoList = [
  { logo: EmailIcon, title: 'Email', desc: 'info@ebergroup.com' },
  { logo: PhoneIcon, title: 'Phone', desc: '+62 21 1234 5678' },
  {
    logo: LocationIcon,
    title: 'Address',
    desc: 'Eber Tower, 123 Business District\n Jakarta, Indonesia 12345',
  },
];

const SubmitApplicationPage = () => {
  return <SubmitProduct list={infoList} photo={Photo} />;
};

export default SubmitApplicationPage;
