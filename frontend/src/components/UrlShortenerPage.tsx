import React, { useState } from 'react';
import axios from 'axios';
import './UrlShortenerPage.css';

const UrlShortenerPage: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [shortenedUrl, setShortenedUrl] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [copyMessage, setCopyMessage] = useState<string>('');

    const API_ENDPOINT = 
        process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:3001";

    const handleShorten = async () => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/url/shorten`, { originalUrl: url }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setShortenedUrl(response.data.shortUrl);
            setMessage(`Success! Here’s your short URL: ${response.data.shortUrl}`);
            setIsError(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMessage('Error: ' + error.response.data.message);
            } else {
                setMessage('An unexpected error occurred.');
            }
            setIsError(true);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedUrl);
        setCopyMessage('Copied successfully!');
        setTimeout(() => setCopyMessage(''), 2000); // Clear the message after 2 seconds
    };

    return (
        <div className="url-shortener-container">
            <h2 className="url-shortener-title">URL Shortener</h2>
            <label className="url-shortener-label">Enter the URL to shorten</label>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="url-input"
                disabled={shortenedUrl !== ''}
            />
            <button
                onClick={handleShorten}
                disabled={shortenedUrl !== ''}
                className={`shorten-button ${shortenedUrl ? 'disabled' : ''}`}
            >
                Shorten
            </button>
            {message && (
                <div className={`message ${isError ? 'error' : 'success'}`}>{message}</div>
            )}
            {shortenedUrl && (
                <div className="shortened-url-container">
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="shortened-url">
                        {shortenedUrl}
                    </a>
                    <button onClick={handleCopy} className="copy-button">📋</button>
                </div>
            )}
            {copyMessage && (
                <div className="copy-message">{copyMessage}</div>
            )}
        </div>
    );
};

export default UrlShortenerPage;
