import React, { useState, useEffect } from "react";
import "./styles.css";

import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

const NewQuote = () => {
  const [quote_author, setQuoteAuthor] = useState("");
  const [quote_text, setQuoteText] = useState("");
  const [rQuote, setRQuote] = useState("");
  const [rAuthor, setRAuthor] = useState("");

  const userID = localStorage.getItem("userId");
  const history = useHistory();

  const random = Math.floor(Math.random() * 101);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setRQuote(data[random].text);
        setRAuthor(data[random].author || "Anonymous");
      });
  }, []);

  async function handleAddIncident(e) {
    e.preventDefault();

    try {
      const data = {
        quote_author,
        quote_text,
      };
      await api.post("quotes", data, {
        headers: {
          Authorization: userID,
        },
      });
      history.push("/profile");
    } catch (e) {
      alert("Error, could not submit quote");
      console.error(e.message);
    }
  }

  return (
    <div className='new-incident-container'>
      <div className='content'>
        <section>
          <h1>Write your favorite quote</h1>
          <p>
            If you are testing this and have no idea what to write I decided to
            give you a hand.
            <br />
            Try {`"${rQuote}" wrote by ${rAuthor}`}
          </p>
          <Link className='back-link' to='/profile'>
            <FiArrowLeft size={16} color='#E02041' />
            Back to Home
          </Link>
        </section>
        <form onSubmit={handleAddIncident}>
          <input
            value={quote_author}
            onChange={(e) => setQuoteAuthor(e.target.value)}
            placeholder='Author'
          />
          <textarea
            value={quote_text}
            onChange={(e) => setQuoteText(e.target.value)}
            placeholder='Quote'
          />

          <button className='button' type='submit'>
            Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewQuote;
