import Image from "next/image";
import Navbar from "@/components/root/Navbar";
import Footer from "@/components/root/Footer";
import Hero from "@/components/root/Hero";
export default function Home() {
  return (
    <main className="flex flex-col h-screen ">

        <Navbar/>
        <Hero/>
        <Footer/>


    </main>
  );
}
