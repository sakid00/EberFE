import Photo from '@public/photo/safety-person.png';
import EmailIcon from '@public/icon/email_purple.svg';
import PhoneIcon from '@public/icon/phone_purple.svg';
import LocationIcon from '@public/icon/location_purple.svg';
import ContactUsContainer from '@/containers/contact-us';

export type infoListType = {
  logo: string;
  title: string;
  desc: string;
};

const infoList = [
  { logo: EmailIcon, title: 'Email', desc: 'info@ebergroup.com' },
  { logo: PhoneIcon, title: 'Phone', desc: '+62 21 1234 5678' },
  {
    logo: LocationIcon,
    title: 'Address',
    desc: 'Eber Tower, 123 Business District\n Jakarta, Indonesia 12345',
  },
];

const ContactUsPage = () => {
  return <ContactUsContainer list={infoList} photo={Photo} />;
};

export default ContactUsPage;
