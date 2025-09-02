'use client';
import Photo from '@public/photo/safety-person.png';
import FormSubmitContainer from '@/containers/formSubmit';
import { useDeviceType } from '@/hooks';
import { CSSProperties } from 'react';

const ContactUsPage = () => {
  const { type } = useDeviceType();
  const imageStyle =
    type === 'mobile'
      ? ({ top: '30vh', width: '100vw', height: '50vh' } as CSSProperties)
      : ({ top: '30vh' } as CSSProperties);

  return (
    <FormSubmitContainer
      title="Get in touch"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
      text1={"Let's Chat,\u00a0"}
      text2=" Reach Out to Us"
      photo={Photo}
      type={type}
      imageStyle={imageStyle}
    />
  );
};

export default ContactUsPage;
