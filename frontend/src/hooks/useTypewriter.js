import { useState, useEffect, useRef } from 'react';

const useTypewriter = (words, typingSpeed = 60, deletingSpeed = 40, pauseTime = 2000) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const lastUpdateTime = useRef(0);
  const animationFrameId = useRef(null);
  const stateRef = useRef({ currentText, isDeleting, isPaused, currentWordIndex });

  // Keep refs in sync with state
  useEffect(() => {
    stateRef.current = { currentText, isDeleting, isPaused, currentWordIndex };
  }, [currentText, isDeleting, isPaused, currentWordIndex]);

  useEffect(() => {
    if (words.length === 0) return;

    const animate = (currentTime) => {
      const state = stateRef.current;
      const currentWord = words[state.currentWordIndex];
      const fullText = currentWord + '....';

      if (!lastUpdateTime.current) {
        lastUpdateTime.current = currentTime;
      }

      const deltaTime = currentTime - lastUpdateTime.current;

      // Handle pause states first
      if (state.isPaused) {
        if (deltaTime >= pauseTime) {
          setIsPaused(false);
          setIsDeleting(true);
          lastUpdateTime.current = currentTime;
        }
      } else if (!state.isDeleting) {
        // Typing forward
        const targetInterval = typingSpeed;
        if (deltaTime >= targetInterval) {
          if (state.currentText.length < fullText.length) {
            setCurrentText(fullText.substring(0, state.currentText.length + 1));
            lastUpdateTime.current = currentTime;
          } else {
            // Finished typing, pause before deleting
            setIsPaused(true);
            lastUpdateTime.current = currentTime;
          }
        }
      } else {
        // Deleting backward
        const targetInterval = deletingSpeed;
        if (deltaTime >= targetInterval) {
          if (state.currentText.length > 0) {
            setCurrentText(state.currentText.substring(0, state.currentText.length - 1));
            lastUpdateTime.current = currentTime;
          } else {
            // Finished deleting, immediately start next word
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
            setIsDeleting(false);
            lastUpdateTime.current = currentTime;
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      lastUpdateTime.current = 0;
    };
  }, [words, typingSpeed, deletingSpeed, pauseTime]);

  return currentText;
};

export default useTypewriter;
