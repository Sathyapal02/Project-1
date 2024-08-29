import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='h-[220px] w-full rounded-xl object-cover'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.Budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem