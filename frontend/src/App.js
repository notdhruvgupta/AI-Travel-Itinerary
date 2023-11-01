import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const options = {
    interestsNew: [
      { name: "History", emoji: "🏛️" },
      { name: "Art", emoji: "🎨" },
      { name: "Food", emoji: "🍴" },
      { name: "Music", emoji: "🎵" },
      { name: "Nature", emoji: "🌳" },
      { name: "Sports", emoji: "⚽" },
      { name: "Photography", emoji: "📷" },
      { name: "Architecture", emoji: "🏰" },
      { name: "Literature", emoji: "📚" },
    ],
    activityTypes: [
      "Outdoor",
      "Sightseeing",
      "Shopping",
      "Nightlife",
      "Museums",
      "Theme Parks",
      "Water Sports",
      "Yoga and Wellness",
    ]
  }

  const [formData, setFormData] = useState({
    destination: '',
    duration: 0,
    budget: 0,
    interests: [],
    travelStyle: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'duration' || name === 'budget' ? parseInt(value) : value,
    });
  };

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      interests: checked
        ? [...formData.interests, name]
        : formData.interests.filter((item) => item !== name),
    });
  };

  const handleTravelStyleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      travelStyle: checked
        ? [...formData.travelStyle, name]
        : formData.travelStyle.filter((item) => item !== name),
    });
  };

  const handleSubmit = async (e) => {
    if (formData.destination !== "" && formData.budget !== 0 && formData.duration !== 0 && formData.interests.length !== 0 && formData.travelStyle.length !== 0) {
      const newprompt = `Generate a personalized travel itinerary for a trip to ${formData.destination} with a budget of ${formData.budget}. The traveler is interested in a ${formData.interests} vacation and enjoys ${formData.travelStyle} activities. Please provide a detailed itinerary with daily recommendations for ${formData.duration} days, including suggested destinations, activities, and dining options. Keep it short and concise`
      setPrompt(newprompt)
      console.log(newprompt)

      handleRequest(newprompt)
    } else {
      console.log("Error")
    }
  }

  const handleRequest = (newprompt) => {
    const apiUrl = 'http://127.0.0.1:5000/generate-response';

    if (newprompt !== "") {
      axios
        .post(apiUrl, { prompt: newprompt })
        .then((res) => {
          setResponse(res.data.response);
          console.log(res.data.response)
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log('retry')
    }
  };

  function parseItinerary(rawText) {
    if (rawText) {
      const lines = rawText.split("\n");
      let newText = ""
      for (const text in lines) {
        if(lines[text].startsWith('Day ')) {
          newText += "<b>" + lines[text] + "</b><br/>"
        } else {
          newText += lines[text] + "<br/>"
        }
      }
      return newText
    }
  }

  return (
    <div className='bg-[#352F44] w-full min-h-screen'>
      <div className='flex'>
        <div className='border-2 w-[50%] min-h-screen rounded-md'>

          <h2 className=' font-outfit font-[700] text-[3em] text-center text-[#fff] my-2'>🚀 Travel Planner</h2>
          <form onSubmit={handleSubmit} className='flex flex-col mx-20'>

            <div className='flex flex-col my-2'>
              <label htmlFor="destination" className=' font-outfit font-[400] text-white text-[1.2em] mb-1'>Destination:</label>
              <input
                className='h-8 font-outfit font-[500] text-[1.2em] indent-1 rounded-[3px]'
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
              />
            </div>

            <div className='flex flex-col my-2'>
              <label htmlFor="duration" className=' font-outfit font-[400] text-white text-[1.2em] mb-1'>Travel Duration (days):</label>
              <input
                className='h-8 font-outfit font-[500] text-[1.2em] indent-1 rounded-[3px]'
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
              />
            </div>

            <div className='flex flex-col my-2'>
              <label htmlFor="budget" className=' font-outfit font-[300] text-white text-[1.2em] mb-1'>Budget (USD):</label>
              <input
                className='h-8 font-outfit font-[500] text-[1.2em] indent-1 rounded-[3px]'
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
              />
            </div>

            <div className='mt-2'>
              <label className='font-outfit font-[400] text-white text-[1.5em]'>Interests:</label>
              <div>
                {options.interestsNew.map((interests, index) => (
                  <label key={index} className={` text-white font-outfit bg-[#5C5470] checkbox-label inline-block mx-1 px-2 my-1 ${formData.interests.includes(interests.name) ? 'border border-white bg-[#8d8899]' : 'border border-black'} rounded-sm duration-500 text-[1.25em]`}>
                    <input
                      type="checkbox"
                      name={interests.name}
                      checked={formData.interests.includes(interests.name)}
                      onChange={handleInterestChange}
                      className='hidden'
                    />
                    {interests.emoji} {interests.name}
                  </label>
                ))}
              </div>
            </div>

            <div className='mt-2'>
              <label className='font-outfit font-[400] text-white text-[1.5em]'>Activities:</label>
              <div>
                {options.activityTypes.map((activities, index) => (
                  <label key={index} className={` text-white font-outfit bg-[#5C5470] checkbox-label inline-block mx-1 px-2 my-1 ${formData.travelStyle.includes(activities) ? 'border border-white bg-[#8d8899]' : 'border border-black'} rounded-sm duration-500 text-[1.25em]`}>
                    <input
                      type="checkbox"
                      name={activities}
                      checked={formData.travelStyle.includes(activities)}
                      onChange={handleTravelStyleChange}
                      className='hidden'
                    />
                    {activities}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="font-outfit font-[500] text-[1.2em] text-black bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 rounded-lg px-5 py-2.5 text-center mx-auto my-7"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div className='w-[50%] min-h-screen rounded-md'>
          <h1 className=' font-outfit font-[700] text-white text-[3em] text-center'>🧭Itinerary</h1>
          {response === "" ? (
            <p className='font-outfit font-[500] text-white text-[1.2em] text-center my-5'>waiting for data....</p>
          ) : (
            <p className='font-outfit font-[400] text-white text-[1.2em] text-justify my-5 mx-8' dangerouslySetInnerHTML={{ __html: parseItinerary(response) }} ></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
