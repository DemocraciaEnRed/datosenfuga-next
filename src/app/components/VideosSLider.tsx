"use client"
import { useEffect, useState } from "react"
import ChevronSVG from "./ChevronSVG";
import Spinner from "./Spinner";

export interface IFrame {
    key: string,
    src: string,
    title?: string
}

const VideosSLider = ({ iframes }: { iframes: IFrame[] }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [fadeIn, setFadeIn] = useState(false);
    const previousSlide = () => {
        const isFirstSlide = currentSlide == 0;
        const newSlide = isFirstSlide ? iframes.length - 1 : currentSlide - 1
        setCurrentSlide(newSlide)
    };
    const nextSlide = () => {
        const isLastSlide = currentSlide == iframes.length - 1;
        const newSlide = isLastSlide ? 0 : currentSlide + 1
        setCurrentSlide(newSlide)
    };
    const manuallySelectSlide = (index: number) => {
        const isCurrent = currentSlide == index
        !isCurrent && setCurrentSlide(index)
    }

    useEffect(() => { setFadeIn(false) }, [currentSlide]);
    return (
        <div className="h-[100%] relative">
            <div className="absolute top-1/2 right-full z-10 cursor-pointer -translate-y-6" onClick={previousSlide}>
                <ChevronSVG direction="left" />
            </div>
            <div className="absolute top-1/2 left-full z-10 cursor-pointer -translate-y-6" onClick={nextSlide}>
                <ChevronSVG direction="right" />
            </div>
            <div className={`flex justify-center items-center ${fadeIn ? '' : "hidden"}`}>
                <div className={`transition-opacity ${fadeIn ? 'opacity-100' : "opacity-0"} w-[70vw] h-[39.5vw] mx-auto`}>
                    <iframe
                        key={iframes[currentSlide].key}
                        src={iframes[currentSlide].src}
                        title={iframes[currentSlide].title}
                        className="w-full h-full rounded-sm shadow"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setFadeIn(true)}
                    />
                </div>
            </div>
            {!fadeIn &&
                <div className="flex justify-center items-center w-[70vw] h-[39.5vw] mx-auto bg-der-black rounded-sm shadow">
                    <Spinner />
                </div>
            }
            <div className="flex justify-center mt-3 z-20">
                {iframes.map((_, i) => (<div key={i}
                    className={`rounded-lg w-3 h-3 mr-3 last:mr-0 select-none cursor-pointer ${currentSlide == i ? 'bg-gray-800' : 'bg-gray-300'}`}
                    onClick={() => manuallySelectSlide(i)}></div>))}
            </div>
        </div>
    )
}
export default VideosSLider