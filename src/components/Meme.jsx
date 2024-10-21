import React from "react";
import memesData from "../../memesData";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });

    const [allMemes, setAllMemes] = React.useState(memesData);

    function getMemeImage() {
        const {
            data: { memes: memesArray },
        } = allMemes;
        const randomIndex = Math.floor(Math.random() * memesArray.length);
        const url = memesArray[randomIndex].url;
        setMeme((prevMeme) => {
            return { ...prevMeme, randomImage: url };
        });
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
            <img
                src={meme.randomImage}
                alt="meme image"
                className="meme--image"
            />
        </main>
    );
}
