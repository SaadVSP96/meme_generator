import React from "react";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });

    const [allMemes, setAllMemes] = React.useState([]);

    /*
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemes(data);
        }
        getMemes();
    }, []);

    function handleChange(event) {
        const { name, value, type } = event.target;
        setMeme((prevMeme) => {
            return {
                ...prevMeme,
                [name]: value && type === "text" ? value : prevMeme.name,
            };
        });
    }

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
                    onChange={handleChange}
                    name="topText"
                    value={meme.topText}
                />
                <input
                    type="text"
                    placeholder="Bottom Text"
                    className="form--input"
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button className="form--button" onClick={getMemeImage}>
                    Get a new Meme Image
                </button>
            </div>
            <div className="meme">
                <img
                    src={meme.randomImage}
                    alt="meme image"
                    className="meme--image"
                />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}
