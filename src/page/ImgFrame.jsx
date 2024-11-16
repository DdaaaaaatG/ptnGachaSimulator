import React from 'react'
import imgFrame from '../assets/frame.png'
import sRank from '../assets/srank.png'
import cata from '../assets/catalyst.png'

const ImgFrame = () => {
  return (
    <div>
      <div>
        <div className='relative inline-block overflow-hidden'>
          <img src={imgFrame}/>
          <div className='inline-block absolute overflow-hidden right-5l bottom-3b rotate-3'>
            <div className='bg-dotted-pattern bg-dot-size bg-dot-position relative'>
              <div className='absolute inset-0 bg-fade-mask mix-blend-multiply'></div>
              <img src={sRank} className='mix-blend-multiply'/>
            </div>
          </div>
          <div className='inline-block absolute bottom-custom w-custom left-leftcustom'>
            <img src={cata}/>
          </div>
          <div className='inline-block absolute bottom-custom2 left-leftcustom2'>
            <div className='text-red-300 text-11s'>166</div>
          </div>
          <div className='inline-block absolute bottom-custom3 left-leftcustom3'>
            <div className='text-red-300 text-15s'>점성가</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImgFrame