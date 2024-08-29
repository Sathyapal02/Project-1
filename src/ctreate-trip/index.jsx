import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import React, { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { chatSession } from '@/service/AIModal';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
  const [place, setplace] = useState();
  const [formData, setformData] = useState();
  const [openDailog, setopenDailog] = useState(false);
  const [loading, setLoding] = useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value
    })
  }
  useEffect(() => {
    console.log(formData);
  }, [formData])
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setopenDailog(true)
      return;
    }
    if (formData?.noOfDays > 10 && !formData?.location || !formData?.Budget || !formData?.People) {
      toast("Please fill all the detials and select  plan Days less than 10")
      return;
    }
    setLoding(true);
    //console.log(formData);
    const FINAl_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.People)
      .replace('{budget}', formData?.Budget)
      .replace('{totalDays}',formData?.noOfDays)
    //console.log(FINAl_PROMPT);
    const result = await chatSession.sendMessage(FINAl_PROMPT);
    console.log("--", result?.response?.text());
    setLoding(false);
    SaveAiTrip(result?.response?.text())
    //AI Response-result?.response?.text()
  }

  const SaveAiTrip = async (TripData) => {
    setLoding(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    // Add a new document in collection "cities"
    //docId- should need be to in the form of string and it should be unique. so it will write time stramp and conver into string and it is unique
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoding(false);
    navigate('/view-trip/'+docId)
  }

  //call whenever the login is sucessfull
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Beare ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setopenDailog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🧳🌍</h2>
      <p className='mt-3 text-gray-500 text-xl'>Simply provide some basic details, and our trip planner will create a personalized itinerary tailored to your preferences.</p>
      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What's your preferred destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={
              {
                place,
                onChange: (v) => { setplace(v); handleInputChange('location', v) }
              }
            }
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days do you plan to spend on your trip?</h2>
          <div>
            <Input placeholder={'Ex:3'} type="number"
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <h3 className='text-gray-600'>The budget is exclusively allocated for activities and dining purposes.</h3>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('Budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg
              ${formData?.Budget == item.title && 'shadow-lg border-black'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('People', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg
            ${formData?.People == item.title && 'shadow-lg border-black'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>
                <FcGoogle className='h-7 w-7' />
                Sign with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip