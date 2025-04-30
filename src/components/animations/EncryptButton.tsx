
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface EncryptButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const TARGET_TEXT = "Add to Cart";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = ({ onClick, children, className = "" }: EncryptButtonProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalText = typeof children === 'string' ? children : TARGET_TEXT;
  const [text, setText] = useState(originalText);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = originalText.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= originalText.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setText(originalText);
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-blue-300 ${className}`}
    >
      <div className="relative z-10 flex items-center gap-2">
        <Lock className="w-4 h-4" />
        <span>{text}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-blue-400/0 from-40% via-blue-400/100 to-blue-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};

export default EncryptButton;
