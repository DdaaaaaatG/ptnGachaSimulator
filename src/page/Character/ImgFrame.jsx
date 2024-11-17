import React from 'react'
import imgFrame from '../../assets/frame.png'
import sRank from '../../assets/srank.png'
import backGround from '../../assets/sinners/background.png'
import bi from '../../assets/sinners/S017-base.png'
import aRank from '../../assets/arank.png';
import bRank from '../../assets/brank.png';
import fury from '../../assets/fury.png';
import umbra from '../../assets/umbra.png';
import catalyst from '../../assets/catalyst.png';
import arcane from '../../assets/arcane.png';
import reticle from '../../assets/reticle.png';
import endura from '../../assets/endura.png';

// { "id": "A019", "name": "헤카테", "rarity": "A" ,"tendency": "arcane" },

const ImgFrame = ({ character }) => {
  // 등급에 따른 이미지 선택
  const getRankImage = (rarity) => {
    switch (rarity) {
      case 'S':
        return sRank;
      case 'A':
        return aRank;
      case 'B':
        return bRank;
      default:
        return sRank;
    }
  };

  const characterImagePath = `/sinners/${character.id}-base.png`;

  // 캐릭터 이미지 경로 생성
  const getCharacterImage = (id) => {
    try {
      // 예: S1 -> 조야, A1 -> 돌리 등의 형식으로 이미지를 불러옵니다.
      return require(`../../assets/sinners/${id}-base.png`);
    } catch (error) {
      console.error(`Character image not found for ID: ${id}`);
      return bi; // 기본 이미지
    }
  };

    // tendency에 따른 이미지 선택
    const getTendencyImage = (tendency) => {
      switch (tendency.toLowerCase()) {
        case 'fury':
          return fury;
        case 'umbra':
          return umbra;
        case 'catalyst':
          return catalyst;
        case 'arcane':
          return arcane;
        case 'reticle':
          return reticle;
        case 'endura':
          return endura;
        default:
          return catalyst; // 기본 이미지
      }
    };

  return (
    <div>
      <div>
        <div className='relative inline-block overflow-hidden' style={{width:213, height:370}}>
          <div className='inline-block absolute top-3b2 left-16l'>
            <img src={backGround} alt="background"/>
          </div>
          <div className='inline-block absolute top-3b2 left-16l'>
          <img 
              src={characterImagePath}
              alt={character.name}
              onError={(e) => {
                console.error(`Failed to load image for ${character.id}`);
                e.target.src = bi;
              }}
            />
          </div>
          <div className='inline-block relative'>
            <img src={imgFrame} alt="frame"/>
          </div>
          <div className='inline-block absolute overflow-hidden right-5l bottom-3b rotate-3'>
            <div className='bg-dotted-pattern bg-dot-size bg-dot-position relative'>
              <div className='absolute inset-0 bg-fade-mask mix-blend-multiply'></div>
              <img 
                src={getRankImage(character.rarity)} 
                className='mix-blend-multiply'
                alt={`${character.rarity} rank`}
              />
            </div>
          </div>
          <div className='inline-block absolute bottom-custom w-custom left-leftcustom'>
            <img 
                src={getTendencyImage(character.tendency)}
                alt={character.tendency}
                onError={(e) => {
                  console.error(`Failed to load tendency image for ${character.tendency}`);
                  e.target.src = catalyst; // 기본 이미지로 폴백
                }}
            />
          </div>
          <div className='inline-block absolute bottom-custom2 left-leftcustom2'>
            <div className='text-white text-11s'>
              {character.id.substring(1)} {/* S1, A1 등에서 숫자만 추출 */}
            </div>
          </div>
          <div className='inline-block absolute bottom-custom3 left-leftcustom3'>
            <div className='text-white text-15s'>{character.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgFrame