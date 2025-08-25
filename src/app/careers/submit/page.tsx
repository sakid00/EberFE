import { Box } from '@mui/material';
import Photo from '@public/photo/field_person.png';
import EmailIcon from '@public/icon/email_purple.svg';
import PhoneIcon from '@public/icon/phone_purple.svg';
import LocationIcon from '@public/icon/location_purple.svg';
import InfoBox from '@/components/InfoBox';
import FormBox from '@/components/FormBox';

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
  return (
    <Box className="flex items-end justify-center">
      <FormBox
        title="Join Our Team"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
        text1={"Let's Build,\u00a0"}
        text2="The Future Together"
      />
      <InfoBox infoList={infoList} photo={Photo} />
    </Box>
  );
};

export default SubmitApplicationPage;
