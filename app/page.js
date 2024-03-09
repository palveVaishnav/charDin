"use client"
import { useState } from 'react';

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calculateTimePassed(start, today) {
    const msPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const daysPerYear = 365;
    const daysPerLeapYear = 366;

    // Calculate the difference in milliseconds between the two dates
    const passedMs = today.getTime() - start.getTime();

    // Calculate the number of milliseconds in a year, accounting for leap years
    const msInYear = (msPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay * (daysPerYear + 0.25)); // 365 days + 1 leap day

    // Calculate the number of years and remaining milliseconds
    let passedYears = Math.floor(passedMs / msInYear);
    let remainingMs = passedMs % msInYear;

    // Calculate the number of days and remaining milliseconds
    let passedDays = Math.floor(passedMs / (msPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay));
    remainingMs %= (msPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay);

    // Calculate the number of hours and remaining milliseconds
    let passedHours = Math.floor(passedMs / (msPerSecond * secondsPerMinute * minutesPerHour));
    remainingMs %= (msPerSecond * secondsPerMinute * minutesPerHour);

    // Calculate the number of minutes and remaining milliseconds
    let passedMinutes = Math.floor(passedMs / (msPerSecond * secondsPerMinute));
    remainingMs %= (msPerSecond * secondsPerMinute);

    // Calculate the number of months
    let passedMonths = (passedYears * 12) + today.getMonth() - start.getMonth();
    if (today.getDate() < start.getDate()) {
        passedMonths--;
    }

    return { years: passedYears, months: passedMonths, days: passedDays, hours: passedHours, minutes: passedMinutes };
}

export default function Home() {
    const today = new Date();
    const [start, setStart] = useState(today);
    const { years, months, days, hours, minutes } = calculateTimePassed(start, today);

    const handleChange = (e) => {
        const inputedDate = new Date(e.target.value);
        setStart(inputedDate);
    };

    return (
        <div className="bg-gray-800 text-white font-serif">
            <div className="bg-gray-900 w-full p-2 flex justify-between shadow-md shadow-zinc-500">
                <div className="flex gap-2 p-2">
                    <a href="#" className=" p-2 border rounded-md border-orange-500 bg-orange-500">CharDin</a>
                </div>
                <div className="p-2 flex gap-2">
                    <a href="#" className=" p-1 border rounded-md border-green-500 hover:bg-green-500">Calci</a>
                    <a href="#" className=" p-1 border rounded-md border-green-500 hover:bg-green-500">Repoository</a>
                    <a href="#" className=" p-1 border rounded-md border-green-500 hover:bg-green-500">Why?</a>
                    <a href="#" className=" p-1 border rounded-md border-green-500 hover:bg-green-500">Contact</a>
                </div>
            </div>
            <div className="my-20 text-center">
                <div className="grid p-4 w-screen font-serif gap-4 place-content-center text-3xl">
                    <h2 className="">Enter Birth Date </h2>
                    <input
                        className="bg-gray-500 w-fit p-2"
                        type="date"
                        value={start ? start.toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="m-6 p-2 grid gap-6 grid-cols-2 h-dvh">
                <div className="grid border rounded-lg border-orange-300 bg-green-300 text-black place-content-center text-center p-4 ">
                    <div className="text-5xl">
                        {years}
                    </div>
                    <div className="text-xl">
                        Years Old
                    </div>
                </div>
                <div className="grid border rounded-lg border-orange-300 bg-green-300 text-black place-content-center text-center p-4 ">
                    <div className="text-5xl">
                        {months}
                    </div>
                    <div className="text-xl">
                        Months Passed
                    </div>
                </div>
                <div className="grid border rounded-lg border-orange-300 bg-green-300 text-black place-content-center text-center p-4 ">
                    <div className="text-5xl">
                        {days}
                    </div>
                    <div className="text-xl">
                        Days Passed
                    </div>
                </div>
                <div className="grid border rounded-lg border-orange-300 bg-green-300 text-black place-content-center text-center p-4 ">
                    <div className="text-5xl">
                        {hours}
                    </div>
                    <div className="text-xl">
                        Hours Passed
                    </div>
                </div>
                <div className="grid col-span-2 border rounded-lg border-orange-300 bg-green-300 text-black place-content-center text-center p-4 ">
                    <div className="text-5xl">
                        {minutes}
                    </div>
                    <div className="text-xl">
                        Minutes Passed
                    </div>
                </div>
				
				<div className="grid border col-span-2 rounded-lg border-orange-300 bg-green-300 text-black place-content-center text-center p-4 ">
                    <div className="text-5xl">
                        {minutes*60}
                    </div>
                    <div className="text-xl">
                        Seconds Passed
                    </div>
                </div>
            </div>
        </div>
    );
}
