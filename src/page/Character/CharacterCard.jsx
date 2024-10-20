import React from 'react'

const CharacterCard = props => {
  const { image, job, grade, name, number } = props
  return (
    <div className="relative w-64 h-96 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="absolute top-0 left-0 right-0 h-8 bg-yellow-500 flex items-center justify-between px-2">
        <span className="text-black font-bold">{job}</span>
        <span className="text-black font-bold">{grade}</span>
      </div>
      
      <div className="absolute top-8 left-0 right-0 bottom-16">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900 flex items-center justify-between px-4">
        <span className="text-white font-bold text-lg">{name}</span>
        <span className="text-orange-500 font-bold text-2xl">{number}</span>
      </div>
    </div>
  )
}


export default CharacterCard