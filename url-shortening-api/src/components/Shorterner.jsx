import React, { useState } from "react";
import bgMobile from "../images/bg-shorten-mobile.svg";
import bgDesktop from "../images/bg-shorten-desktop.svg";

const Shorterner = () => {
    const [text, setText] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [copySuccess, setCopySuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text) {
            alert("Please enter a valid URL");
            return;
        }

        const url = 'https://url-shortener-service.p.rapidapi.com/shorten'; // API endpoint URL
        const data = new FormData();
        data.append('url', text);

        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_API_KEY, // Use environment variable
                'x-rapidapi-host': 'url-shortener-service.p.rapidapi.com'
            },
            body: data
        };

        try {
            const res = await fetch(url, options);
            if (!res.ok) {
                throw new Error("Something went wrong");
            } else {
                const responseData = await res.json();
                setShortUrl(responseData.result_url); // Adjust this based on the actual response structure
                console.log(responseData.result_url);
                setText("");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl)
            .then(() => setCopySuccess("Copied!"))
            .catch(() => setCopySuccess("Failed to copy"));
    };

    return (
        <>
            <section className="max-width shortener relative">
                <picture>
                    <source media="(max-width: 768px)" srcSet={bgMobile} />
                    <img src={bgDesktop} alt="Background" />
                </picture>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row">
                        <input
                            type="url"
                            placeholder="shorten your link here"
                            className="w-full py-2 px-5 rounded-lg mb-2 md:mb-0 md:w-2/3 form-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="btn-cta rounded-lg w-full md:w-40 md:ml-5"
                        >
                            Shorten it
                        </button>
                    </div>
                </form>
                {shortUrl && (
                    <div className="short-url mt-6 flex items-center justify-between">
                        <p className="text-2xl font-bold mr-4">{shortUrl}</p>
                        <button
                            onClick={handleCopy}
                            className="btn-copy bg-blue-500 text-white rounded-lg py-2 px-4"
                        >
                            Copy
                        </button>
                    </div>
                )}
                {copySuccess && <p className="text-green-500">{copySuccess}</p>}
            </section>
        </>
    );
};

export default Shorterner;
