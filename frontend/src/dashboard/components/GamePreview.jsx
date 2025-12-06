/**
 * GamePreview Component
 * ---------------------------------------------------------
 * Dashboard entry point into the PlinkOink gameplay.
 * Uses floating/animated pigs to visually hint at the
 * Plinko mechanics while staying lightweight on performance.
 *
 * Responsibilities:
 * • Provide animated game teaser using framer-motion
 * • Offer a clear CTA button to navigate into /game
 * • Maintain clean card layout using BaseCard wrapper
 *
 * Notes:
 * • Animation is purely cosmetic — no game physics here
 * • Pigs spawn at random X offsets to keep visuals varied
 */

import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import BaseCard from './BaseCard';
import PigMascot from '@shared/components/PigMascot';

const PIG_COUNT = 9;
const FALL_DURATION = 5;

// Random X offsets to distribute falling pigs across card space
const positions = Array.from({ length: PIG_COUNT }).map(
  () => Math.random() * 700 - 350 // Range: -350px to +350px from center
);

export default function GamePreview() {
  const navigate = useNavigate();

  return (
    <BaseCard className="row-start-2 col-start-1 col-span-2 relative overflow-hidden">
      {/* Falling pig animations (infinite looping motion) */}
      {positions.map((posX, i) => {
        const rotateSpeed = Math.random() > 0.5 ? 360 : -360; // Random spin direction

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{ y: -250, x: posX, rotate: 0 }}
            animate={{ y: 600, rotate: rotateSpeed }}
            transition={{
              duration: FALL_DURATION,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.6, // Staggered falling
            }}
          >
            <PigMascot size={55} />
          </motion.div>
        );
      })}

      {/* Center CTA button to start gameplay */}
      <button
        onClick={() => navigate('/game')}
        className="
          bg-surfaceDark
          text-brandPink 
          border border-brandPink/40
          shadow-[0_0_10px_rgba(255,77,141,0.4)]
          px-8 py-3 
          rounded-full 
          text-xl font-semibold 
          hover:bg-brandPink hover:text-black 
          transition-all 
          z-20
        "
      >
        Play Game
      </button>

      {/* Logo flavor text */}
      <p className="absolute bottom-4 right-4 text-brandPink font-bold text-lg">
        PlinkOink
      </p>
    </BaseCard>
  );
}
