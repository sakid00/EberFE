import Photo from '@public/photo/lab-person.png';
import FormSubmitContainer from '@/containers/formSubmit';
import { styles } from './style';

const SubmitApplicationPage = () => {
  return (
    <FormSubmitContainer
      title="Talk to Us!"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
      text1={'Let’s Build Your\u00a0'}
      text2="Custom Product"
      photo={Photo}
      imageStyle={styles.imageStyle}
    />
  );
};

export default SubmitApplicationPage;
