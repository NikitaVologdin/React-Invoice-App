import { motion } from "motion/react";

const BouncingDotsLoader = ({ text }: { text: string }) => {
  return (
    <div className="flex items-baseline space-x-1">
      <span>{text}</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block w-1 h-1 bg-current rounded-full"
          animate={{
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default BouncingDotsLoader;
