'use client';

import Image from "next/image";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import { BsFillClipboard2Fill, BsFillClipboard2CheckFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const jose = Josefin_Sans({
    weight: "600",
    subsets: ["latin"]
});

const DashboardPage = () => {
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const form = useForm({
        defaultValues: {
            url: ""
        }
    });

    const onSubmit = async (data: { url: any; }) => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://article-extractor-and-summarizer.p.rapidapi.com/summarize', {
                params: {
                    url: data.url,
                    length: '3'
                },
                headers: {
                    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com',
                }
            })

            console.log(response.data);
            setSummary(response.data); // Assuming the response.data contains the summarized article
        } catch (error) {
            console.error(error);
            toast.error("Failed to summarize the article");
        } finally {
            setIsLoading(false);
        }
    };

    // const copyToClipboard = () => {
    //     navigator.clipboard.writeText(summary)
    //         .then(() => {
    //             toast.success("Text copied to clipboard");
    //         })
    //         .catch((error) => {
    //             console.error("Failed to copy text: ", error);
    //             toast.error("Failed to copy text to clipboard");
    //         });
    // };
    return (
        <main className="bg-pink-100 min-h-screen">
            <nav className="flex justify-between p-5 items-center">
                <Link href={"/dashboard"}><Image className="" src={"/weblogo.svg"} alt={"logo"} width={50} height={50} /></Link>
                <h1 className={`${jose.className} text-4xl text-cyan-300`}>SummAIzer</h1>
                <div className=" rounded-full ring-2 ring-white"><UserButton afterSignOutUrl="/"/></div>
            </nav>
            <div className="text-gray-500 text-center mt-10"><p>Summarize your article with SummAIzer by entering URL here</p></div>
            <section className="flex flex-col gap-5 mt-5 justify-center ml-32 mr-32">

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center">
                    <span className="pt-3 pb-3 pl-2 border-l-2 border-t-2 border-b-2 rounded-l-lg bg-white"><FaLink className="text-gray-500" /></span>
                    <input className="w-full border-t-2 border-b-2 p-2 outline-none" type="url" placeholder="Enter a URL" {...form.register("url", { required: true })} />
                    <button className="p-2 bg-cyan-500 text-white rounded-r-lg" type="submit" disabled={isLoading}>Summarize</button>
                </form>
                {
                    isLoading &&
                    <div className="loader">
                        <div className="loader-inner">
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                            <div className="loader-line-wrap">
                                <div className="loader-line"></div>
                            </div>
                        </div>
                    </div>
                }
                {summary && (
                    <div>
                        {Object.entries(summary).map(([key, value]) => (
                            <div key={key} className="flex flex-col space-y-5 mt-10">
                                <p className="text-black" key={key}><strong>{key}:</strong></p>
                                <p className="text-white p-5 bg-gradient-to-b from-violet-800 to-red-500 rounded-xl">
                                    <div className="flex justify-end mb-2 transition hover:text-cyan-500">
                                        {copied ? (
                                            <>
                                                <BsFillClipboard2CheckFill className="text-cyan-500" />
                                                <span className="ml-1 text-xs text-gray-300">Copied</span>
                                            </>

                                        ) : (
                                            <BsFillClipboard2Fill onClick={() => {
                                                navigator.clipboard.writeText(value)
                                                    .then(() => {
                                                        setCopied(true);
                                                        toast.success("Text copied to clipboard");
                                                    })
                                                    .catch((error) => {
                                                        console.error("Failed to copy text: ", error);
                                                        toast.error("Failed to copy text to clipboard");
                                                    });
                                            }} />
                                        )}
                                    </div>
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default DashboardPage;