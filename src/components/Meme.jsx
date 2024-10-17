import React from "react";
import memesData from "../../memesData";

export default function Meme() {
    const [memeImage, setMemeImage] = React.useState("");

    function getMemeImage() {
        const {
            data: { memes: memesArray },
        } = memesData;
        const randomIndex = Math.floor(Math.random() * memesArray.length);
        setMemeImage(memesArray[randomIndex].url);
    }
    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top Text"
                    className="form--input"
                />
                <input
                    type="text"
                    placeholder="Bottom Text"
                    className="form--input"
                />
                <button className="form--button" onClick={getMemeImage}>
                    Get a new Meme Image
                </button>
            </div>
            <img src={memeImage} alt="meme image" className="meme--image" />
        </main>
    );
}
