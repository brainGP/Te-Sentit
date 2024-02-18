"use client";
import React, { useState } from "react";
import Head from "next/head";
import Gallery from "../components/Gallery";
import Countdown from "../components/Countdown";
import Envelope from "../components/Envelope";
import Modal from "../components/Modal";
import letters from "../data/letterContents"; // Ensure this path is correct

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLetterContent, setSelectedLetterContent] = useState("");
  const [selectedLetterFrom, setSelectedLetterFrom] = useState("");

  const handleOpenLetter = (letter) => {
    setSelectedLetterContent(letter.content);
    setSelectedLetterFrom(letter.from);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Head>
        <title>Te Sentit</title>
        <link rel="icon" href="/logo.webp" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <Countdown birthday="2006-02-16" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
          {letters.map((letter, index) => (
            <Envelope key={index} onClick={() => handleOpenLetter(letter)} />
          ))}
        </div>
        <Gallery />
      </main>

      <Modal show={modalOpen} onClose={handleCloseModal}>
        <p className="whitespace-pre-wrap">{selectedLetterContent}</p>
        <p className="mt-4 italic text-right font-bold">
          From: {selectedLetterFrom}
        </p>
      </Modal>
    </div>
  );
}
