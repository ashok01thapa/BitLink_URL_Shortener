import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const poppins = localFont({
  src : "./Fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className= "bg-purple-100 ">
     <section className="grid grid-cols-2 md:grid-cols-2 h-[50vh] md:h-[50vh]">
      <div className=" flex flex-col gap-4 items-center justify-center">
        <p className={`font-bold text-3xl md-text-3xl text-center ${poppins.className}`}>
          The best URL shortener in the Market
        </p>

      <p className="px-6 sm:px-10 md:px-20 lg:px-40 text-center sm:text-left ">
        We are the best URL Shortener in the world. Most of the Url shosteners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortener.
      </p>
      <div className='flex gap-3 justify-between md:justify-between '>
                <Link href="/shorten"><button className='  md:block bg-purple-500 shadow-lg rounded-lg py-2 font-bold cursor-pointer text-white p-3'>Try Now</button></Link>
                <Link href="/github"><button className='bg-purple-500 shadow-lg rounded-lg py-2 font-bold  cursor-pointer text-white p-3'>GitHub</button></Link>
            </div>

      </div>

      <div className="  relative md:h-full h-64 w-full">
      <Image  className="mix-blend-darken" alt='vector img' src={"/drawing241.jpg"} fill={true} />

      </div>

     </section>
    </main>
  );
}
