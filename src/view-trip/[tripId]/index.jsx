import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    //destructurized the parameter
    const {tripId}=useParams();
    const[trip,setTrip]=useState([]);

    //Fetch the trip information from the firebase
    //source from firebase doc
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docsnap=await getDoc(docRef);

        if(docsnap.exists()){
            console.log("Document:",docsnap.data());
            setTrip(docsnap.data());
        }
        else{
            console.log("No such Document")
            toast("No trip Found")
        }
    }

  return (
    //we can see the ID
    //<div>viewtrip: {tripId}</div>
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/*Information Section*/}
        <InfoSection trip={trip}/>
        <Hotels trip={trip}/> 
        <PlacesToVisit trip={trip}/>
        <Footer trip={trip}/>


    </div>
  )
}

export default Viewtrip