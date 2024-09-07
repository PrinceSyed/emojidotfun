// components/EmojiAnimation.tsx
"use client";

import { motion } from "framer-motion";

const emojiVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.5, // Delay between each emoji's animation
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

const EmojiAnimation = () => {
  return (
    <motion.span
      className="inline-flex bg-nb p-2 rounded-md text-white"
      //@ts-ignore
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.span
        className="mr-1"
        variants={emojiVariants}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        🫵
      </motion.span>
      <motion.span
        className="mr-1"
        variants={emojiVariants}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.5, // Starts animating 0.5 seconds after the first emoji
        }}
      >
        😹 
      </motion.span>
      <motion.span
        variants={emojiVariants}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1, // Starts animating 1 second after the first emoji
        }}
      >
        🥹
      </motion.span>
    </motion.span>
  );
};

export default EmojiAnimation;
