import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <nav className='h-18 bg-purple-700 flex justify-between px-10 items-center text-white'>
        <div className="logo font-bold text-lg">
            <Link href="/">BitLinks</Link>
        </div>
        <ul className='flex justify-center gap-4 items-center'>
            <Link href="/"><li>Home</li></Link>
            <Link href="/About"><li>About</li></Link>
            <Link href="/shorten"><li>Shorten</li></Link>
            <Link href="/Contact"><li>Contact Us</li></Link>
            <li className='flex gap-3'>
                <Link href="/shorten"><button className='bg-purple-500 shadow-lg rounded-lg py-1 font-bold cursor-pointer p-3'>Try Now</button></Link>
                <Link href="/github"><button className='bg-purple-500 shadow-lg rounded-lg py-1 font-bold  cursor-pointer p-3'>GitHub</button></Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
