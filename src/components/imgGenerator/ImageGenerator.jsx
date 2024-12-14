import React, { useRef, useState } from 'react'

const ImageGenerator = () => {

    const [image, setImage] = useState('/')
    let inpRef = useRef(null)

    const [loading, setLoading] = useState(false)

    const generateImage = async () => {
        const API_KEY = import.meta.env.REACT_APP_API_KEY
        
        
        if(inpRef.current.value === '') return alert('Please type a prompt')
        setLoading(true)
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`,
                    "User-Agent": "OpenAI-Generator"
                },
                body: JSON.stringify({
                    "prompt": inpRef.current.value,
                    "n": 1,
                    "size": "512x512"
                }),
            }
        )
        const data = await response.json()
        setImage(data.data[0].url)
        setLoading(false)
    }

  return (
    <div className='bg-black h-screen w-screen p-0 flex justify-center items-center flex-col '>
        <h1 className='text-white mb-9 text-2xl'>AI Image <span className='text-red-500'>Generator</span> </h1>
        <div className="h-[30vh]">
         <img className='h-[30vh]' src={image === '/' ? `https://img.freepik.com/premium-photo/3d-artificial-intelligence-concept-3d-rendering-conceptual-image_726113-2216.jpg` : image} alt="image" />

         <div className="">
            <div className={`transition-all duration-[15s] ${loading ? "w-[30vh]" : "w-[0vh] transition-none"} h-1 bg-red-800`}></div>
         </div>
        </div>
        <div className="flex flex-col items-center">
            <input 
                ref={inpRef}
                className='border-2 w-[30vw] mt-9 border-gray-300 bg-transparent text-white placeholder-bold p-2 rounded-md' 
                type="text" 
                placeholder='Type your prompt' 
            />
            <button onClick={()=>{generateImage()}} className='mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300'>
                Generate
            </button>
        </div>
    </div>
  )
}

export default ImageGenerator
