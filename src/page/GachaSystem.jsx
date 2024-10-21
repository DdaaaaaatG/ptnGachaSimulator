import React, { useState, useEffect } from 'react';
import characters from '../assets/characters.json';

const GachaSystem = () => {
  const [results, setResults] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pullCount, setPullCount] = useState(0);
  const [pityCount, setPityCount] = useState(0);
  const [guaranteedSCount, setGuaranteedSCount] = useState(0);
  const [guaranteedFeatured, setGuaranteedFeatured] = useState(false);
  const [featuredCharacter, setFeaturedCharacter] = useState(null);

  useEffect(() => {
    console.log('Loaded characters:', characters);
    if (!characters || !characters.S || !characters.A || !characters.B) {
      console.error('캐릭터 데이터가 올바르지 않습니다.');
    }
    // 예시로 S급 첫 번째 캐릭터를 픽업 캐릭터로 설정
    setFeaturedCharacter(characters.S[38]);
  }, []);

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
        return featuredCharacter || characters.S[Math.floor(Math.random() * characters.S.length)];
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
    setIsSpinning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">가챠 시스템 테스트 (10연차)</h1>
      <div className="mb-4">
        <p>총 뽑기 횟수: {pullCount}</p>
        <p>현재 Pity: {pityCount}/80</p>
        <p>다음 S급 보장: {guaranteedFeatured ? '픽업' : '비픽업'}</p>
        {featuredCharacter && <p>픽업 캐릭터: {featuredCharacter.name}</p>}
      </div>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
        onClick={pullGacha}
        disabled={isSpinning}
      >
        10연차 뽑기
      </button>
      <div className="mt-8 grid grid-cols-5 gap-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md text-center"
          >
            <h2 className="text-lg font-semibold">{result.name}</h2>
            <p className={`text-md ${
              result.rarity === 'S' ? 'text-yellow-500' : 
              result.rarity === 'A' ? 'text-blue-500' : 'text-green-500'
            }`}>
              {result.rarity}급
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GachaSystem;