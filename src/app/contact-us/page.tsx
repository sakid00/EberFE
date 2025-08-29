import Photo from '@public/photo/safety-person.png';
import FormSubmitContainer from '@/containers/formSubmit';

const ContactUsPage = () => {
  return (
    <FormSubmitContainer
      title="Get in touch"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur odio nobis reprehenderit nulla nisi recusandae nemo similique facilis ex ducimus quos beatae, magni exercitationem dolorum omnis ipsa. Ratione, officia quaerat?"
      text1={"Let's Chat,\u00a0"}
      text2=" Reach Out to Us"
      photo={Photo}
    />
  );
};

export default ContactUsPage;
