"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown(){


//use state for duration and time left

const [duration, setDuration ]=useState<number |string>("");
 const[timeLeft, setTimeLeft]= useState<number>(0);
 const [isActive, setIsActive]=useState<boolean>(false);
 const [isPaused, setIsPaused]=useState<boolean>(false);
 const timerRef =useRef<NodeJS.Timeout | null>(null);


//function for timer control

 const handleSetDuration =():void=>{
    if (typeof duration === "number" && duration > 0){
        setTimeLeft(duration);
        setIsActive(false);
        setIsPaused(false);
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }
 };

 //handleStart

 const handleStart =():void => {
    if (timeLeft>0){
        setIsActive(true);
        setIsPaused(false);
    }
 };

 //handlePaused

 const handlePaused =():void =>{
    if(isActive){
        setIsPaused(true);
        setIsActive(false);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    }
 }

 //handleReset
 const handleReset = ():void =>{
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number"? duration:0);
    if(timerRef.current){
        clearInterval(timerRef.current);
    }
 };

 //useEffect

 useEffect(
    ()=>{
        if(isActive && !isPaused){
            timerRef.current =setInterval(() => {
                setTimeLeft((prevTime)=>{
                    if(prevTime <=1){
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime-1;
                });
            },1000);
        }
        return() => {
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    },[isActive,isPaused]
 );
 
//helper Function

const formatTime = (time:number):string =>{
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
};

const handleDurationChange =(e:ChangeEvent<HTMLInputElement>):void =>{
    setDuration(Number(e.target.value)|| "");;
};



// JSX return statement 
return(
    <div className="flex flec-col  item-center judtify-center h-screen bg-gray-100 dark:bg-gray-900">
         {/* Timer box container */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
            {/* Title of the countdown timer */}
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                Countdown Timer
            </h1>
             {/* Input and set button container */}
             <div className="flex items-center mb-6">
                <Input
                 type="number" 
                 id="duration"
                 placeholder="Enter duration in seconds"
                 value={duration}
                 onChange={handleDurationChange}
                 className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                 />
                 <Button onClick={handleSetDuration}
                 variant="outline"
                 className="text-gray-800 dark:text-gray-200"
                 >
                    Set
                 </Button>
             </div>
              {/* Display the formatted time left */}
              <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                {formatTime(timeLeft)}
              </div>
               {/* Buttons to start, pause, and reset the timer */}
               <div className="flex justify-center gap-4">
                <Button
                onClick={handleStart}
                variant="outline"
                className="text-gray-800 dark:text-gray-200">
                    {isPaused ? "Resume":"Start"}
                </Button>
                <Button
                onClick={handlePaused}
                variant="outline"
                className="text-gray-800 dark:text-gray-200">
                    Pause
                </Button>
                <Button
                onClick={handleReset}
                variant="outline"
                className="text-gray-800 dark:text-gray-200">
                    Reset
                </Button>
               </div>
        </div>
    </div>
);
}