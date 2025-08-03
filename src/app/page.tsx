'use client';
import { Box, Button, Typography } from '@mui/material';
import DualColorText from '@/components/dualColorText';
import Image from 'next/image';
import { useEffect } from 'react';
import bgHeader from '@public/background/homepage_header_bg.png';
import advancedSVG from '@public/svg/advanced.svg';
import expertSVG from '@public/svg/expert.svg';
import focusSVG from '@public/svg/focus.svg';
import recycleSVG from '@public/svg/recycle.svg';
import fieldPerson from '@public/photo/field_person2.png';
import headerImage from '@public/photo/header_corporate.png';
import locationSVG from '@public/icon/location.svg';
import tangki from '@public/photo/tangki.png';
import collabSVG from '@public/icon/collab.svg';
import rndSVG from '@public/icon/rnd.svg';
import sustainSVG from '@public/icon/sustain.svg';
import transfromSVG from '@public/icon/transform.svg';

const specialty = [
  {
    title: 'Advanced Materials',
    desc: 'Specializing in high-performance chemical manufacturing and processing.',
    img: advancedSVG,
  },
  {
    title: 'Innovation Focus',
    desc: 'Focused on sustainable chemical production and innovation.',
    img: focusSVG,
  },
  {
    title: 'Sustainability',
    desc: 'Specialized in solvent production and chemical solutions.',
    img: recycleSVG,
  },
  {
    title: 'Expert Team',
    desc: 'Leading producer of petrochemical products and solutions.',
    img: expertSVG,
  },
];

const subsidiaries = [
  {
    title: 'PT Eternal Buana Chemical Industries',
    location: 'Cikupa, Banten',
    desc: 'Specializing in high-performance chemical manufacturing and processing.',
  },
  {
    title: 'PT Eternal Buana Chemical Industries',
    location: 'Cikupa, Banten',
    desc: 'Specializing in high-performance chemical manufacturing and processing.',
  },
  {
    title: 'PT Eternal Buana Chemical Industries',
    location: 'Cikupa, Banten',
    desc: 'Specializing in high-performance chemical manufacturing and processing.',
  },
  {
    title: 'PT Eternal Buana Chemical Industries',
    location: 'Cikupa, Banten',
    desc: 'Specializing in high-performance chemical manufacturing and processing.',
  },
];

const innovation = [
  {
    title: 'Research & Development',
    desc: 'Continuous investment in R&D to develop cutting-edge chemical solutions and materials.',
    img: rndSVG,
  },
  {
    title: 'Digital Transformation',
    desc: 'Leveraging advanced technologies to optimize our manufacturing processes and operations.',
    img: transfromSVG,
  },
  {
    title: 'Sustainable Solutions',
    desc: 'Developing eco-friendly products and processes to minimize environmental impact.',
    img: sustainSVG,
  },
  {
    title: 'Collaborative Innovation',
    desc: 'Partnering with industry leaders and research institutions to drive breakthrough innovations.',
    img: collabSVG,
  },
];

// Custom hook for scroll animations
const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-stagger'
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

export default function Home() {
  useScrollAnimation();

  const specialtyMap = specialty.map((val, index) => {
    return (
      <Box
        id={`specialty-${index}`}
        key={index}
        className={`flex flex-col justify-center items-center bg-white w-[40%] h-[40%] py-10 px-8 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
      >
        <Image src={val.img} alt={`specialty-img-${index}`} />
        <Typography
          variant="h6"
          fontSize={'16px'}
          textAlign={'center'}
          fontWeight={'800'}
          color="#030712"
        >
          {val.title}
        </Typography>
        <Typography
          variant="body1"
          fontSize={'15px'}
          textAlign={'center'}
          color="#4B5563"
        >
          {val.desc}
        </Typography>
      </Box>
    );
  });

  const subsidiariesMap = subsidiaries.map((val, index) => {
    return (
      <Box
        id={`subsidiaries-${index}`}
        key={index}
        className={`flex flex-col justify-center items-start bg-white w-[40%] h-[40%] p-3 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
      >
        <Image src={headerImage} alt={`specialty-img-${index}`} />
        <Typography
          variant="h6"
          fontSize={'16px'}
          textAlign={'left'}
          fontWeight={'800'}
          color="#030712"
        >
          {val.title}
        </Typography>
        <Box className="flex flex-row gap-2">
          <Image src={locationSVG} alt="location-icon" />
          <Typography
            color="#784791"
            variant="subtitle1"
            fontSize={'14px'}
            fontWeight={400}
          >
            {val.location}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          fontSize={'15px'}
          textAlign={'start'}
          color="#4B5563"
        >
          {val.desc}
        </Typography>
      </Box>
    );
  });

  const innovationMap = innovation.map((val, index) => {
    return (
      <Box
        id={`innovation-${index}`}
        key={index}
        className={`flex flex-col justify-center items-center bg-white w-[40%] h-[40vh] py-10 px-6 gap-2 rounded-2xl shadow-lg animate-stagger animate-delay-${(index + 1) * 100}`}
      >
        <Image src={val.img} alt={`specialty-img-${index}`} />
        <Typography
          variant="h6"
          fontSize={'26px'}
          textAlign={'center'}
          fontWeight={'700'}
          color="#030712"
        >
          {val.title}
        </Typography>
        <Typography
          variant="body1"
          fontSize={'16px'}
          textAlign={'center'}
          fontWeight={400}
          color="#4B5563"
        >
          {val.desc}
        </Typography>
      </Box>
    );
  });

  return (
    <>
      <Image
        src={bgHeader}
        alt=""
        style={{
          position: 'absolute',
          width: '100vw',
          height: '80vh',
          right: '10vw',
          left: 0,
          top: 0,
          zIndex: -1,
        }}
      />
      <Box id="home-header" className="items-center justify-center h-[70vh]">
        <Box id="home-header-left-side">
          <h2 className="text-6xl font-bold">Innovating</h2>
          <DualColorText
            text1={'as\u00a0'}
            text2="Sustainable"
            text1Variant="h2"
            text2Variant="h2"
            inline
            color="white"
          />
          <h2 className="text-6xl font-bold">Future</h2>
          <Typography className="w-1/4" style={{ marginTop: '20px' }}>
            Established in 2021, Eber Group oversees four top-performing
            chemical manufacturing companies operating across Indonesia.
          </Typography>
          <Box id="buttons-wrapper" className="flex flex-row gap-4 mt-8">
            <Button
              size="small"
              sx={{
                color: 'white',
                background:
                  'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
                padding: 2,
                borderRadius: 10,
                fontWeight: 600,
                textTransform: 'none',
              }}
            >
              Explore Our Product
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{
                color: 'white',
                background: 'transparent',
                padding: 2,
                borderRadius: 10,
                fontWeight: 600,
                borderColor: '#786C95',
                borderWidth: 1,
                textTransform: 'none',
              }}
            >
              Custom Product
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        id="home-second-section"
        className="flex flex-col items-center justify-center animate-on-scroll"
      >
        <Box className="flex flex-col animate-fade-in justify-center">
          <DualColorText
            text1={'Leader in\u00a0'}
            text2="High-Performance"
            text1Variant="h4"
            text2Variant="h4"
            fontWeight={700}
            inline
          />
          <Typography variant="h4" fontWeight={700} className="text-[#030712]">
            Specialty Materials
          </Typography>
        </Box>
        <Typography
          variant="body1"
          flexWrap={'wrap'}
          className=" text-[#4B5563] animate-fade-in"
          textAlign={'center'}
          fontSize={'18px'}
          style={{ width: '70%', marginTop: '20px' }}
        >
          Established in 2021, Eber Group oversees four top-performing chemical
          manufacturing companies operating across Indonesia, bringing together
          decades of expertise and innovation in the petrochemical industry.
        </Typography>
        <Box id="specialty-list" className="flex flex-row gap-3 mt-10">
          {specialtyMap}
        </Box>
      </Box>

      <Box id="home-third-section" className="relative">
        <Box
          className="w-full z-20 animate-slide-left"
          sx={{ position: 'absolute', top: -10, left: 45 }}
        >
          <Image
            src={fieldPerson}
            alt="field-person"
            width={550}
            height={400}
          />
        </Box>
        <Box
          className="clip-custom-shape relative text-white flex flex-row gap-8 mt-40 animate-on-scroll"
          sx={{
            background:
              'linear-gradient(145deg,rgba(19, 64, 91, 1) 21%, rgba(120, 71, 145, 1) 70%, rgba(221, 156, 54, 1) 100%)',
            zIndex: -1,
          }}
        >
          <Box
            className="w-full flex justify-center"
            sx={{ width: 600, height: 509 }}
          />
          <Box className="flex flex-col justify-center max-w-[45%] animate-slide-right">
            <DualColorText
              text1="Make it Yours,"
              text2="Customize Your Product"
              text1Variant="h4"
              text2Variant="h4"
              color="white"
              fontWeight={700}
            />
            <Typography variant="h4" fontWeight={700}>
              Today!
            </Typography>
            <Typography
              color="#D6CBE3"
              variant="body1"
              fontSize={'14px'}
              fontWeight={400}
              sx={{ marginTop: '20px' }}
            >
              Eber Group’s expertise in specialty materials is supported by a
              strong in-house R&D team, which enables the company to provide
              solutions for products and processes improvement in the
              infrastructure, construction, automotive, environmental and
              manufacturing industries.
            </Typography>

            <Button
              size="small"
              sx={{
                color: 'white',
                background:
                  'linear-gradient(to right, rgba(255, 138, 0, 1), rgba(245, 75, 2, 1))',
                paddingY: 2,
                paddingx: 1,
                borderRadius: 10,
                fontWeight: 600,
                width: '30%',
                height: '10%',
                fontSize: '12px',
                marginTop: 4,
                textTransform: 'none',
              }}
            >
              Custom Product
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        id="home-fourth-section"
        className="flex flex-col justify-center items-center mt-40 animate-on-scroll"
      >
        <div className="animate-fade-in">
          <DualColorText
            text1={'Our Key\u00a0'}
            text2="Subsidiaries"
            text1Variant="h4"
            text2Variant="h4"
            fontWeight={700}
            inline
          />
        </div>
        <Typography
          variant="body1"
          flexWrap={'wrap'}
          className=" text-[#4B5563] animate-fade-in"
          textAlign={'center'}
          fontSize={'18px'}
          style={{ width: '70%', marginTop: '20px' }}
        >
          Eber Group oversees four top-performing chemical manufacturing
          companies operating across Indonesia
        </Typography>
        <Box className="flex flex-row gap-3 mt-10">{subsidiariesMap}</Box>
      </Box>

      <Box id="home-fifth-section" className="relative mt-40">
        <Box className="absolute w-[60vw]" style={{ top: '-20%', left: '30%' }}>
          <Image src={tangki} alt="tangki-image" />
          <Box className="tangki-gradient-overlay" />
        </Box>
        <Box id="content-wrapper" className="flex flex-row">
          <Box id="content-left-side" className="mt-20  w-[25%]">
            <DualColorText
              text1={'Driving\u00a0'}
              text2="Innovation"
              text1Variant="h4"
              text2Variant="h4"
              fontWeight={700}
              color="#030712"
              inline
            />
            <Typography
              variant="h4"
              fontWeight={700}
              color="#030712"
              sx={{ width: '23vw' }}
            >
              Through Technology
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={400}
              color="#4B5563"
              textAlign={'left'}
              fontSize={'16px'}
              sx={{ marginTop: 2 }}
            >
              {`At Eber Group, we're committed to pushing the boundaries of what's
              possible in the petrochemical industry. Our state-of-the-art
              research facilities and dedicated team of scientists and engineers
              work tirelessly to develop innovative solutions that address the
              evolving needs of our customers and the global market.`}
            </Typography>
          </Box>
          <Box sx={{ width: '80%' }} />
          {/* <Box className="relative w-[300vw] animate-slide-right">
            <Image src={tangki} alt="tangki-image" />
            <Box className="tangki-gradient-overlay" />
          </Box> */}
        </Box>
        <Box id="innovation-list" className="flex flex-row gap-3 mt-10">
          {innovationMap}
        </Box>
      </Box>
    </>
  );
}
