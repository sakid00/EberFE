'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { loadSlim } from '@tsparticles/slim';
import {
  Container,
  ISourceOptions,
  MoveDirection,
  OutMode,
} from '@tsparticles/engine';

// Dynamically import Particles with no SSR to prevent hydration issues
const Particles = dynamic(() => import('@tsparticles/react'), {
  ssr: false,
});

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // this should be run only once per application lifetime
  useEffect(() => {
    if (isClient) {
      import('@tsparticles/react').then(({ initParticlesEngine }) => {
        initParticlesEngine(async (engine) => {
          // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
          // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
          // starting from v2 you can add only the features you need reducing the bundle size
          //await loadAll(engine);
          //await loadFull(engine);
          await loadSlim(engine);
          //await loadBasic(engine);
        }).then(() => {
          setInit(true);
        });
      });
    }
  }, [isClient]);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        zIndex: -1,
      },
      background: {
        color: {
          value: '#F9FAFB',
        },
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: '#000000',
        },
        links: {
          color: '#000000',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.05,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  // Only render on client side and when initialized
  if (!isClient || !init) {
    return <></>;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      style={{
        zIndex: -1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    />
  );
};

export default ParticlesBackground;
