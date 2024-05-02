
import { useEffect, useState } from 'react'
import './App.css'

function App() {
let [city, setCity] = useState('');
let [weaDetail,setWeaDetail] = useState();
let [loadingAnimation,setLoadingAnimation] = useState(false);

const apiKey = 'b655aa1d88078ffe16d0e492f8a574c7'

const getWeatherData = (event) =>{

 setLoadingAnimation(true);
   
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
.then((res) => res.json() )
.then((finaldata) =>{
  console.log(finaldata)
  if(finaldata.cod === "404"){
    setWeaDetail(undefined)
  }
  else{  
    setWeaDetail(finaldata)
  }
  setLoadingAnimation(false)

})

  setCity('')
event.preventDefault()
}


  return (
    <>
      <div className=' w-[100%] h-[150vh] bg-[#4b37ff]'> 
        <div className='max-w-[1320px] mx-auto '>
          <h1 className=' lg:text-[40px]  ml-8 font-bold py-[35px] text-white md:text-[15px]'>Saad Weather-App</h1>

          <form className='w-300' onSubmit={getWeatherData}>
         
           <div className='weatherInput w-[100%] flex flex-wrap'>
        
            <input type="text " value={city} onChange={(e) => setCity(e.target.value)} className='w-[300px] ml-7 h-[40px] rounded-l-lg  pl-4' placeholder='Enter City Name :' />
            
             <button className='bg-orange-400 text-white px-10 rounded-r-lg  py-2'>Submit</button>
            </div>

            <div className=' showWeather relative lg:w-[400px] mx-auto  mt-10 p-7  bg-white shadow-lg sm:w-[200px] ' >
            
            <img  width={105} className={`absolute left-[40%] bottom-[13%]  ${loadingAnimation ? 'block' : 'hidden'} `}src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif" alt="" />
            {weaDetail!== undefined
            ?
            <>
            <h3 className='font-bold text-[30px] '>{weaDetail.name} <span className='bg-[yellow]'>{weaDetail.sys.country}</span></h3>
           <h2 className='font-bold text-[40px]'> {weaDetail.main.temp} C </h2>  
          <img src ={`https://openweathermap.org/img/w/${weaDetail.weather[0].icon}.png`}  className='w-[110px]' alt="" />  
           <p>{weaDetail.weather[0]["main"]}</p>   
            </>
            :
            "No Data Found !"
            }

             
            </div>

          </form>
        </div>
        </div>
    </>
  )
}

export default App;
