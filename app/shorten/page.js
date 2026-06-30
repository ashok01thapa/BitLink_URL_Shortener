"use client"
import React, { useState }from 'react'
import Link from 'next/link'


const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState("")

    const handleChange = (e)=>{

    }

    const generate = ()=>{
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "url": url,
  "shorturl": shorturl
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("/api/generate", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
    seturl("")
    setshorturl("")
    console.log(result)
  alert(result.message)
})
  .catch((error) => console.error(error));
    }

  return (
    <div className=' container mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-purple-100 p-4 sm:p-6 md:p-8 my-8 sm:my-12 md:my-16 rounded-lg flex flex-col gap-3 sm:gap-4 md:gap-6'>
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>Generate your short URLs</h1>
        <div className='flex flex-col gap-2'>
            <input type="text"
            value={url}
            className='px-4 py-2 focus:outline-purple-600 rounded-md '
             placeholder='Enter your URL' 
             onChange={e=>{seturl(e.target.value)}}/>
             
            <input  type="text"
            value={shorturl}
            className='px-4 py-2 focus:outline-purple-600 rounded-md'
             placeholder='Enter your preferred short URl text' 
             onChange={e=>{setshorturl(e.target.value)}}/>
            <button onClick={generate} className='bg-purple-500 rounded-lg font-bold p-3 py-3 my-3 text-white'>Generate</button>
        </div>
        {generated && <>
        <span className='font-bold text-lg'>Link</span>
        <code>
          <Link target = "_blank" href={generated}>{generated}</Link>
        
          </code></>}
      
    </div>
  )
}

export default Shorten
