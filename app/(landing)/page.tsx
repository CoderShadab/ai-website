'use client'

import Link from "next/link";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TbBrandNextjs } from "react-icons/tb";
import { SiTailwindcss } from "react-icons/si";
import {  FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { HiVolumeOff } from "react-icons/hi";

const jose = Josefin_Sans({
    weight: "600",
    subsets: ["latin"]
});

const LandingPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const textRef = useRef<HTMLDivElement | null>(null);
    const range = 16;

    const handleAudioAction = () => {
        const player = document.getElementById('player') as HTMLAudioElement;
        if (player) {
            if (isPlaying) {
                player.pause();
            } else {
                player.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const updateShadow = (event: MouseEvent) => {
        if (textRef.current) {
            const x = Math.round((event.pageX * range) / window.innerWidth) - range / 2;
            const y = Math.round((event.pageY * range) / window.innerHeight) - range / 2;
            gsap.to(textRef.current, {
                '--x': x,
                '--y': y,
            });
        }
    };


    useEffect(() => {
        document.body.addEventListener('mousemove', updateShadow);
        return () => {
            document.body.removeEventListener('mousemove', updateShadow);
        };
    }, []);



    return (
        <div className="flex flex-col gap-5 bg-pink-100 min-h-screen">

            <nav className="m-4 flex justify-between items-center">
                <Link href={"/"}>
                    <Image className="" src={"/weblogo.svg"} alt={"logo"} width={55} height={55} />
                </Link>
                <div className="space-x-2 flex">
                    <Link href={"/sign-in"}>
                        <button id="btn">Login</button>
                    </Link>
                    <Link href={"/sign-up"}>
                        <button id="btn">Register</button>
                    </Link>
                </div>
            </nav>
            <div className="m-10 flex justify-center relative">
                <div className="absolute z-10 top-16 left-[10%]">
                    <h2 className="flex items-center text-black font-bold text-[5rem]">
                        Welcome to
                    </h2>
                    <span id="text" ref={textRef} className={`${jose.className} text-cyan-300 text-7xl`}>SummAIzer</span>
                    <p className="mt-10 bg-white text-black p-2 rounded-xl bg-opacity-30 backdrop-blur-3xl w-[35rem] text-xl">Simplify your reading with SummAIze, an open-source article summarizer that transform lengthy articles into cleat and concise summaries</p>
                </div>
                <div>
                    <Image className="" src={"/bg-image.svg"} alt={"bg"} width={500} height={500}></Image>
                </div>
                <div className="absolute left-[42rem] text-outline bg-transparent text-transparent overflow-hidden">
                    <p className="text-[12rem]">NEXT.JS</p>
                </div>
                <div className="absolute right-12 flex space-x-16 bottom-[20%]">
                    <TbBrandNextjs size={80} title="next.js" className="floating-icon1" />
                    <SiTailwindcss size={80} title="tailwindcss" className="text-cyan-600 mt-10 floating-icon2" />
                    <FaReact size={80} title="react" className="text-sky-500 mt-5 floating-icon3" />
                </div>
            </div>
            <Link href={"/sign-up"} className="absolute left-[20%] bottom-[5%]">
                <button className="button button--janus"><span className="">Get Started</span></button>
            </Link>
            <p className="text-center mt-10 text-[6rem]">Services</p>
            <div className=" flex justify-evenly mt-10 text-center">
                <div className="w-52 mt-16 p-10 border-2 bg-opacity-50 border-blue-700 rounded-full bg-blue-400 text-white">
                    <b>SummAIze</b> created with NEXT.JS
                </div>
                <div className="z-10 w-52 backdrop-blur-md p-10 mb-16 rounded-l-full border-2 bg-opacity-50 border-pink-700 rounded-r-full bg-pink-400 text-white">
                    <b>SummAIze</b> authenticated with Clerk
                </div>
                <div className="z-10 w-52 backdrop-blur-md p-10 mt-5 mb-12 rounded-l-full bg-opacity-50 border-2 border-green-700 rounded-r-full bg-green-400 text-white">
                    <b>SummAIze</b> provide fast summerize of article
                </div>
                <Image className="absolute " src={"/bg2.svg"} alt={"bg"} width={900} height={900}></Image>
            </div>
            <div className="flex flex-col space-y-16 mt-16 mb-16 items-center justify-center z-20">
                <h2 className="text-[8rem] text-outline2 text-transparent bg-transparent">Social</h2>
                <div className="main">
                    <div className="up">
                        <button className="card1" title="instagram">
                            <FaInstagram size={30} className="instagram" />
                        </button>
                        <button className="card2" title="twitter">
                            <RiTwitterXLine size={30} className="twitter" />
                        </button>
                    </div>
                    <div className="down" title="github">
                        <button className="card3">
                            <FaGithub className="github" size={30} />
                        </button>
                        <button className="card4" title="discord">
                            <FaDiscord size={30} className="discord" />
                        </button>
                    </div>
                </div>
            </div>
            <footer className="flex flex-col items-center justify-center mb-5">
                <div>
                    All Right Reserved
                </div>
                <p className="">
                    Made with Love
                </p>
                <FaHeart className="text-pink-500" size={20} />
            </footer>
            <audio src="/bg-music.mp3" id="player"></audio>
            <div className="fixed bottom-2 right-2">
                <button id="btn" className="" onClick={handleAudioAction}>{isPlaying ? <FaVolumeHigh size={20}/> : <HiVolumeOff size={20}/>}</button>
            </div>
           
        </div>
    );
}

export default LandingPage;
