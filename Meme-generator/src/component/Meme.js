import memesData from "../memesData";
import React from "react";
export default function Meme() {
  const [memeImage, setMemeImage] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1c1uej.jpg"
  });

  const [allMemeImages, setAllMemeImages] = React.useState(memesData);
  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemeImages(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    setMemeImage((prevMeme) => ({
      ...prevMeme,
      randomImage: allMemeImages[randomNumber].url
    }));
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setMemeImage((prevMeme) => ({
      ...prevMeme,
      [name]: value
    }));
  }
  return (
    <main>
      <div className="form">
        <input
          name="topText"
          placeholder="Top"
          type="text"
          value={memeImage.topText}
          onChange={handleChange}
          className="form--input"
        />

        <input
          name="bottomText"
          value={memeImage.bottomText}
          onChange={handleChange}
          className="form--input"
          placeholder="Bottom"
          type="text"
        />

        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={memeImage.randomImage} classname="meme--image" />
        <h2 className="meme--text top">{memeImage.topText}</h2>
        <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
      </div>
    </main>
  );
}
