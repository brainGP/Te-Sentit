"use client";
import React, { useState, useEffect } from "react";

const calculateTimeLeft = (birthday) => {
  const now = new Date();
  const birthdate = new Date(birthday);
  const nextBirthday = new Date(birthday);
  nextBirthday.setFullYear(now.getFullYear());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const difference = +nextBirthday - +now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      Хоног: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Цаг: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Минут: Math.floor((difference / 1000 / 60) % 60),
      Секунд: Math.floor((difference / 1000) % 60),
    };
  }

  let age = now.getFullYear() - birthdate.getFullYear();
  if (
    now < new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate())
  ) {
    age--;
  }

  return { timeLeft, age, nextBirthday: nextBirthday.toDateString() };
};

const Countdown = ({ birthday }) => {
  const [{ timeLeft, age, nextBirthday }, setTimeLeftState] = useState(
    calculateTimeLeft(birthday)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeftState(calculateTimeLeft(birthday));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, birthday]);

  return (
    <div className="text-center mt-40 mb-8">
      <span className="text-xl text-pink-600 ">Happy Birthday!</span>
      <h2 className="text-5xl font-bold mb-8 ">Мөнгөншагай Сүнжидмаа</h2>
      <p className="text-2xl mb-2">
        Нас: <span className="text-3xl text-blue-500">{age}</span>
      </p>
      <p className="text-lg mb-2">
        Дараагийн төрсөн өдөр:{" "}
        <span className="text-xl text-green-500">{nextBirthday}</span>
      </p>
      <div className="flex justify-center items-end space-x-8">
        {Object.keys(timeLeft).length > 0 ? (
          Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <span className="text-4xl font-semibold text-indigo-500 animate-pulse">
                {value}
              </span>
              <span className="text-md text-gray-600">{unit}</span>
            </div>
          ))
        ) : (
          <span className="text-xl">Happy Birthday!</span>
        )}
      </div>
    </div>
  );
};

export default Countdown;
