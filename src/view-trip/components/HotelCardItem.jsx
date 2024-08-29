import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotelOptions }) {

    const [photoUrl, setphotourl] = useState();
    useEffect(() => {
        hotelOptions && GetPlacePhoto();
    }, [hotelOptions])
    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotelOptions?.hotelName
        }
        const result = await GetPlaceDetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name)
            const photurl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setphotourl(photurl);
        })
    }
    return (
        <div>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotelOptions?.hotelName + "," + hotelOptions?.hotelAddress} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
                    <div className='my-2 flex-col gap-2'>
                        <h2 className='font-medium'>{hotelOptions?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📌{hotelOptions?.hotelAddress}</h2>
                        <h2 className='text-sm'>🏷️{hotelOptions?.price}</h2>
                        <h2 className='text-sm'>⭐{hotelOptions?.rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default HotelCardItem