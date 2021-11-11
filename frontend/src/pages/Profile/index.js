import React, { useState, useEffect } from "react";

import logoImg from "../../assets/logo.svg";

import { Link, useHistory } from "react-router-dom";

import { FiPower, FiTrash2 } from "react-icons/fi";
import "./styles.css";

import api from "../../services/api";

const Profile = () => {
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");
  const history = useHistory();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: userId,
        },
      })
      .then((res) => {
        setQuotes(res.data);
      });
  }, []);

  async function handleDeleteQuote(id) {
    try {
      await api.delete(`quotes/${id}`, {
        headers: {
          Authorization: userId,
        },
      });

      setQuotes(quotes.filter((quotes) => quotes.id !== id));
    } catch (error) {
      alert("Error, try again");
      console.error(error.message);
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className='profile-container'>
      <header>
        <span>Welcome, {name}</span>

        <Link className='button' to='quotes/new'>
          Write a Quote
        </Link>
        <button onClick={handleLogout} name='Logout' type='button'>
          <FiPower size={18} color='#E02041' />
        </button>
      </header>

      <h1>Latest Quotes</h1>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            <strong>Author:</strong>
            <p>{quote.quote_author}</p>

            <strong>Quote:</strong>
            <p>{quote.quote_text}</p>

            <button
              name='delete'
              onClick={() => handleDeleteQuote(quote.id)}
              type='button'
            >
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
