'use client';
import Photo from '@public/photo/lab-person.png';
import FormSubmitContainer from '@/containers/formSubmit';
import { styles } from './style';
import { useDeviceType } from '@/hooks';
import { CSSProperties } from 'react';

const SubmitApplicationPage = () => {
  const { type } = useDeviceType();
  const imageStyle =
    type === 'mobile'
      ? ({
          left: '0',
          top: '20vh',
          width: '100vw',
          height: '60vh',
        } as CSSProperties)
      : styles.imageStyle;

  return (
    <FormSubmitContainer
      title="Talk to Us!"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
      text1={'Let’s Build Your\u00a0'}
      text2="Custom Product"
      photo={Photo}
      imageStyle={imageStyle}
      type={type}
    />
  );
};

export default SubmitApplicationPage;
