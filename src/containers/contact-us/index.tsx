import DualColorText from '@/components/DualColorText';
import InfoBox from '@/components/InfoBox';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { infoListType } from '@/app/contact-us/page';
import { StaticImageData } from 'next/image';
import { styles, classNames } from './style';

const ContactUsContainer = ({
  list,
  photo,
}: {
  list: infoListType[];
  photo: StaticImageData;
}) => {
  return (
    <Box sx={styles.containerBox}>
      <Box sx={styles.formBox}>
        <Typography sx={styles.getInTouchText}>Get in touch</Typography>
        <DualColorText
          text1={"Let's Chat,\u00a0"}
          text2=" Reach Out to Us"
          inline
          text1Variant="h4"
          text2Variant="h4"
        />
        <Typography sx={styles.descriptionText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio
          nobis reprehenderit nulla nisi recusandae nemo similique facilis ex
          ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione,
          officia quaerat?
        </Typography>
        <Box sx={styles.formRow}>
          <Box sx={styles.halfWidthBox}>
            <InputLabel sx={styles.inputLabel}>First Name</InputLabel>
            <TextField
              className={classNames.firstNameField}
              placeholder="First Name"
              sx={styles.textField}
              InputProps={{
                sx: styles.textFieldInput,
              }}
            />
          </Box>
          <Box sx={styles.halfWidthBox}>
            <InputLabel sx={styles.inputLabel}>Last Name</InputLabel>
            <TextField
              className={classNames.lastNameField}
              placeholder="Last Name"
              sx={styles.textField}
              InputProps={{
                sx: styles.textFieldInput,
              }}
            />
          </Box>
        </Box>
        <Box sx={styles.fieldContainer}>
          <InputLabel sx={styles.inputLabel}>Email Address</InputLabel>
          <TextField
            className={classNames.emailField}
            placeholder="Email Address"
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Box sx={styles.fieldContainer}>
          <InputLabel sx={styles.inputLabel}>Message</InputLabel>
          <TextField
            className={classNames.messageField}
            multiline
            rows={7}
            placeholder="Leave us message"
            sx={styles.textField}
            InputProps={{
              sx: styles.textFieldInput,
            }}
          />
        </Box>
        <Button sx={styles.submitButton}>Submit</Button>
      </Box>
      <InfoBox infoList={list} photo={photo} />
    </Box>
  );
};

export default ContactUsContainer;
