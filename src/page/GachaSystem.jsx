import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const characters = {
  S: Array.from({ length: 34 }, (_, i) => ({ id: `S${i + 1}`, name: `S급 캐릭터 ${i + 1}`, rarity: 'S' })),
  A: Array.from({ length: 44 }, (_, i) => ({ id: `A${i + 1}`, name: `A급 캐릭터 ${i + 1}`, rarity: 'A' })),
  B: Array.from({ length: 14 }, (_, i) => ({ id: `B${i + 1}`, name: `B급 캐릭터 ${i + 1}`, rarity: 'B' })),
};

const featuredCharacter = { ...characters.S[0], name: "픽업 S급 캐릭터" };

const GachaSystem = () => {
  const [results, setResults] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pullCount, setPullCount] = useState(0);
  const [pityCount, setPityCount] = useState(0);
  const [guaranteedSCount, setGuaranteedSCount] = useState(0);
  const [revealIndex, setRevealIndex] = useState(-1);
  const [guaranteedFeatured, setGuaranteedFeatured] = useState(false);

  const getCharacter = (isPity = false, isGuaranteed = false) => {
    let rand = Math.random() * 100;
    let rarity;

    if (isPity) {
      rand = Math.random() * 20;  // A급 또는 S급만 뽑기
    }

    if (isGuaranteed || pityCount >= 79 || (isPity && rand < 2.84) || (!isPity && rand < 2)) {
      rarity = 'S';
    } else if (isPity || (!isPity && rand < 20)) {
      rarity = 'A';
    } else {
      rarity = 'B';
    }

    if (rarity === 'S') {
      if (guaranteedFeatured || Math.random() < 0.5) {
        setGuaranteedFeatured(false);
        return featuredCharacter;
      } else {
        setGuaranteedFeatured(true);
        return characters.S[Math.floor(Math.random() * characters.S.length)];
      }
    } else {
      return characters[rarity][Math.floor(Math.random() * characters[rarity].length)];
    }
  };

  const pullGacha = () => {
    setIsSpinning(true);
    setRevealIndex(-1);
    const newCharacters = [];
    let localPityCount = pityCount;
    let localGuaranteedSCount = guaranteedSCount;

    for (let i = 0; i < 10; i++) {
      const isPity = (pullCount + i + 1) % 10 === 0;
      const isGuaranteed = localPityCount >= 79;
      const char = getCharacter(isPity, isGuaranteed);

      if (char.rarity === 'S') {
        localPityCount = 0;
        localGuaranteedSCount = 0;
      } else {
        localPityCount++;
        localGuaranteedSCount++;
      }

      newCharacters.push(char);
    }

    setResults(newCharacters);
    setPullCount(prev => prev + 10);
    setPityCount(localPityCount);
    setGuaranteedSCount(localGuaranteedSCount);

    setTimeout(() => {
      setIsSpinning(false);
      revealCharacters();
    }, 2000);
  };

  const revealCharacters = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < 10) {
        setRevealIndex(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">가챠 시스템 테스트 (10연차)</h1>
      <div className="mb-4">
        <p>총 뽑기 횟수: {pullCount}</p>
        <p>현재 Pity: {pityCount}/80</p>
        <p>다음 S급 보장: {guaranteedFeatured ? '픽업' : '비픽업'}</p>
      </div>
      <motion.button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={pullGacha}
        disabled={isSpinning}
      >
        10연차 뽑기
      </motion.button>
      {isSpinning ? (
        <motion.div
          className="mt-8 text-xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          🎰
        </motion.div>
      ) : (
        <div className="mt-8 grid grid-cols-5 gap-4">
          <AnimatePresence>
            {results.map((result, index) => (
              index <= revealIndex && (
                <motion.div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-lg font-semibold">{result.name}</h2>
                  <p className={`text-md ${result.rarity === 'S' ? 'text-yellow-500' : result.rarity === 'A' ? 'text-blue-500' : 'text-green-500'}`}>
                    {result.rarity}급
                  </p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default GachaSystem;