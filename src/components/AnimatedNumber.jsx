import { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AnimatedNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;
      
      let totalDuration = 2000;
      let incrementTime = (totalDuration / end) * 10;

      let timer = setInterval(() => {
        start += Math.ceil(end / 100);
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setDisplayValue(start);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}