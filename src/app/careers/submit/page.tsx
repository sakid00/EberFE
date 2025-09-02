'use client';
import Photo from '@public/photo/field-person.png';
import FormSubmitContainer from '@/containers/formSubmit';
import { styles } from './style';
import { useDeviceType } from '@/hooks';
import { CSSProperties } from 'react';

const SubmitApplicationPage = () => {
  const { type } = useDeviceType();
  const imageStyle =
    type === 'mobile'
      ? ({
          left: '2vw',
          top: '30vh',
          width: '100vw',
          height: '50vh',
        } as CSSProperties)
      : styles.imageStyle;

  return (
    <FormSubmitContainer
      title="Join Our Team"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
      text1={"Let's Build,\u00a0"}
      text2="The Future Together"
      photo={Photo}
      type={type}
      imageStyle={imageStyle}
    />
  );
};

export default SubmitApplicationPage;
