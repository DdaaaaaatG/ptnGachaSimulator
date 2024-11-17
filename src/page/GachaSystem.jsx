import React, { useState, useEffect } from 'react';
import characters from '../assets/characters.json';
import ImgFrame from './Character/ImgFrame';

const GachaSystem = () => {
  const [results, setResults] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pullCount, setPullCount] = useState(0);
  const [pityCount, setPityCount] = useState(0);
  const [guaranteedSCount, setGuaranteedSCount] = useState(0);
  const [guaranteedFeatured, setGuaranteedFeatured] = useState(false);
  const [featuredCharacter, setFeaturedCharacter] = useState(null);
  const [isLimitedEvent, setIsLimitedEvent] = useState(true);
  
  useEffect(() => {
    console.log('Loaded characters:', characters);
    if (!characters || !characters.S || !characters.A || !characters.B) {
      console.error('캐릭터 데이터가 올바르지 않습니다.');
    }
    
    const targetCharacter = characters.S[23]; //  캐릭터 선택
    if (!targetCharacter.limited || isLimitedEvent) {
      setFeaturedCharacter(targetCharacter);
    }
  }, [isLimitedEvent]);

  const getNormalSPool = () => {
    // 한정 이벤트 중일 때는 픽업 캐릭터도 풀에 포함
    return characters.S.filter(char => 
      !char.limited || (isLimitedEvent && char.id === featuredCharacter?.id)
    );
  };

  const getCharacter = (isPity = false, isGuaranteed = false) => {
    let rand = Math.random() * 100;
    let rarity;

    if (isPity) {
      rand = Math.random() * 20;
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
        const normalSPool = getNormalSPool();
        return normalSPool[Math.floor(Math.random() * normalSPool.length)];
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
      
      {/* 결과 표시 부분을 ImgFrame을 사용하도록 수정 */}
      <div className="mt-8 grid grid-cols-5 gap-4">
        {results.map((character, index) => (
          <ImgFrame 
            key={index} 
            character={character}  // character 객체를 props로 전달
          />
        ))}
      </div>
    </div>
  );
};

export default GachaSystem;