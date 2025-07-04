import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import Photo from '@public/photo/chem_person.png';
import EmailIcon from '@public/icon/email_purple.svg';
import PhoneIcon from '@public/icon/phone_purple.svg';
import LocationIcon from '@public/icon/location_purple.svg';
import DualColorText from '@/components/dualColorText';

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
  const infoListMap = infoList.map((val, index) => {
    return (
      <Box
        className={`flex ${index !== infoList.length - 1 ? 'mb-3' : 'mb-0'}`}
        key={index}
      >
        <Image src={val.logo} width={30} height={30} alt="" />
        <Box className="ml-3">
          <Typography color="black">{val.title}</Typography>
          <Typography sx={{ whiteSpace: 'pre-line', color: 'black' }}>
            {val.desc}
          </Typography>
        </Box>
      </Box>
    );
  });

  return (
    <Box className="flex items-end justify-center px-[10vw]">
      <Box className="bg-white p-8 max-w-1/2 h-full rounded-xl">
        <Typography variant="h6" sx={{ color: 'black' }}>
          Get in touch
        </Typography>
        <DualColorText
          text1={"Let's Chat,\u00a0"}
          text2=" Reach Out to Us"
          inline
          text1Variant="h4"
          text2Variant="h4"
        />
        <Typography
          variant="body1"
          sx={{ marginTop: 1, color: 'rgba(75, 85, 99, 1)' }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio
          nobis reprehenderit nulla nisi recusandae nemo similique facilis ex
          ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione,
          officia quaerat?
        </Typography>
        <Box className="flex mt-8">
          <Box className="w-1/2">
            <InputLabel className="mb-1">First Name</InputLabel>
            <TextField className="w-[95%]" placeholder="First Name" />
          </Box>
          <Box className="w-1/2">
            <InputLabel className="mb-1">Last Name</InputLabel>
            <TextField className="w-full" placeholder="Last Name" />
          </Box>
        </Box>
        <Box className="mt-5">
          <InputLabel className="mb-1">Email Address</InputLabel>
          <TextField className="w-full" placeholder="Email Address" />
        </Box>
        <Box className="mt-5">
          <InputLabel className="mb-1">Message</InputLabel>
          <TextField
            className="w-[100%]"
            multiline
            rows={7}
            placeholder="Leave us message"
          />
        </Box>
        <Button
          sx={{
            color: 'white',
            background:
              'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
            marginTop: 4,
            width: '100%',
            borderRadius: 5,
          }}
        >
          Submit
        </Button>
      </Box>
      <Box className="flex flex-col justify-end ml-5 items-center h-full">
        <Image
          src={Photo}
          style={{
            width: '95%',
            height: 500,
          }}
          alt=""
        />
        <Box className="bg-white w-fit py-5 px-10 rounded-xl">
          {infoListMap}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
