
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

interface EncryptButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const TARGET_TEXT = "Add to Cart";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton: React.FC<EncryptButtonProps> = ({ 
  children, 
  onClick,
  className = "" 
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [text, setText] = useState<string>(
    typeof children === "string" ? children : TARGET_TEXT
  );
  const displayText = typeof children === "string" ? children : TARGET_TEXT;

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = displayText.split("")
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

      if (pos >= displayText.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setText(displayText);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      className="relative"
    >
      <Button
        variant="outline"
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        onClick={onClick}
        className={`group relative overflow-hidden border-neutral-500 bg-neutral-700 font-mono text-neutral-300 transition-colors hover:text-indigo-300 ${className}`}
      >
        <div className="relative z-10 flex items-center gap-2">
          <Lock className="h-4 w-4" />
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
          className="absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-indigo-400/100 to-indigo-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
        />
      </Button>
    </motion.div>
  );
};

export default EncryptButton;
