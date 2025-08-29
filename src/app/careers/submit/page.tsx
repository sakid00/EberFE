import Photo from '@public/photo/field-person.png';
import FormSubmitContainer from '@/containers/formSubmit';
import { styles } from './style';

const SubmitApplicationPage = () => {
  return (
    <FormSubmitContainer
      title="Join Our Team"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
      text1={"Let's Build,\u00a0"}
      text2="The Future Together"
      photo={Photo}
      imageStyle={styles.imageStyle}
    />
  );
};

export default SubmitApplicationPage;
