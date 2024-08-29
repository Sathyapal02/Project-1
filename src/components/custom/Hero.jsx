import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 min-h-screen'>
      <h1 className='font-extrabold text-[50px] text-center'>
        <span className='text-[#f28d35]'>Embark on Your Next Journey with AI:</span> 
        <span className='text-[#5c4033]'>Tailored Itineraries Just for You</span>
      </h1>
      <p className='text-xl text-black text-center'>
        Your dedicated travel planner and organizer, crafting personalized itineraries that suit your preferences and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className='bg-center'>Start Now, It's Free</Button>
      </Link> 
      <img src='/tripphoto.png' className='-mt-5 h-[300px]'/>
    </div>
  )
}

export default Hero
