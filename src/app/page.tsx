
"use client";
import { useState } from "react";
import Confetti from "react-confetti";
import styles from "./styles/Greeting-Card.module.css";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export default function GreetingCard() {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleGenerateCard = () => {
    if (greeting && name) {
      setShowCard(true);
      setConfetti(true);

      // Stop confetti after 8 seconds
      setTimeout(() => {
        setConfetti(false);
      }, 8000);
    }
  };

  // Type emojiObject as EmojiClickData
  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setGreeting((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className={styles.body}>
      {confetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <div className={styles.cardContainer}>
        <h1 className={styles.title}>Create Your Cute Greeting Card🌷</h1>

        {!showCard ? (
          <div className={styles.form}>
            <textarea
              className={styles.input}
              placeholder="Type your greeting or wish here..."
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
            />
            <button
              className={styles.emojiButton}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {showEmojiPicker ? "Hide Emoji Picker" : "Show Emoji Picker"}
            </button>

            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}

            <input
              type="text"
              className={styles.input}
              placeholder="Enter the recipient's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.button} onClick={handleGenerateCard}>
              Generate Card
            </button>
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.cardText}>
                <h2 className={styles.cardGreeting}>{greeting}</h2>
                <h3 className={styles.cardName}>{name}</h3>
                <button
                  className={styles.resetButton}
                  onClick={() => setShowCard(false)}
                >
                  Create Another Card
                </button>
              </div>
              <img
                src="balloons.png" // Ensure this image is in the public folder
                alt="Bunch of Balloons"
                className={styles.balloonsImage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


