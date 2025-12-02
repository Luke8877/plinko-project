import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import BaseCard from './BaseCard';
import PigMascot from '@shared/components/PigMascot';

const PIG_COUNT = 9;
const FALL_DURATION = 5;

// Generate 5 random X positions spread across card width
const positions = Array.from({ length: PIG_COUNT }).map(
  () => Math.random() * 700 - 350 // -350px to +350px from center
);

export default function GamePreview() {
  const navigate = useNavigate();

  return (
    <BaseCard className="row-start-2 col-start-1 col-span-2 relative overflow-hidden">
      {/* Falling pig animations */}
      {positions.map((posX, i) => {
        const rotateSpeed = Math.random() > 0.5 ? 360 : -360;

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
              delay: i * 0.6,
            }}
          >
            <PigMascot size={55} />
          </motion.div>
        );
      })}

      {/* Center button */}
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

      <p className="absolute bottom-4 right-4 text-brandPink font-bold text-lg">
        PlinkOink
      </p>
    </BaseCard>
  );
}
