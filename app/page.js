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
    <main className="bg-purple-100">
     <section className="grid grid-cols-2 h-[50vh]">
      <div className=" flex flex-col gap-4 items-center justify-center">
        <p className={`font-bold text-3xl ${poppins.className}`}>
          The best URL shortener in the Market
        </p>

      <p className="px-40">
        We are the best URL Shortener in the world. Most of the Url shosteners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortener.
      </p>
      <div className='flex gap-3 justify-start'>
                <Link href="/shorten"><button className='bg-purple-500 shadow-lg rounded-lg py-1 font-bold cursor-pointer text-white p-3'>Try Now</button></Link>
                <Link href="/github"><button className='bg-purple-500 shadow-lg rounded-lg py-1 font-bold  cursor-pointer text-white p-3'>GitHub</button></Link>
            </div>

      </div>

      <div className=" justify-start relative ">
      <Image  className="mix-blend-darken" alt='vector img' src={"/drawing241.jpg"} fill={true} />

      </div>

     </section>
    </main>
  );
}
