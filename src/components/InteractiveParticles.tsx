'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export const InteractiveParticles = () => {
  const [init, setInit] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    setId(`particles-${Math.floor(Math.random() * 10000)}`);
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log('Particles container loaded', container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'repulse' },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 150, duration: 0.4 },
        },
      },
      particles: {
        color: { value: '#ffffff' },
        links: {
          color: '#0070f3',
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          random: false,
          speed: 1.5,
          straight: false,
        },
        number: {
          density: { enable: true, width: 800, height: 800 },
          value: 65,
        },
        opacity: { value: 0.5 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
      // CRITICAL FIX: is pure object ko false ki bajaye is tarah likhein
      fullScreen: {
        enable: false,
        zIndex: -1
      },
    }),
    []
  );

  if (!init || !id) {
    return null;
  }

  return (
    // Is div ka pointer events aur height parent tak limited rahegi
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden max-h-full">
      <Particles
        id={id}
        particlesLoaded={particlesLoaded}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};
