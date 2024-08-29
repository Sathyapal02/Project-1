import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FiSend } from "react-icons/fi";

function InfoSection({ trip }) {

  const [photoUrl, setphotourl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip])
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name)
      const photurl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setphotourl(photurl);
    })
  }
  return (
    <div>
      <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='h-[300px] w-full object-cover rounded-xl' />
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 🗓️{trip.userSelection?.noOfDays} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💷{trip.userSelection?.Budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'> 👨‍👨‍👦‍👦Type of Travelers: {trip.userSelection?.People}
            </h2>
          </div>
        </div>
        <Button><FiSend /></Button>
      </div>
    </div>
  )
}

export default InfoSection