import React, { useState } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

const Logon = () => {
  const [id, setId] = useState(window.localStorage.getItem("ID") || "");
  const history = useHistory();

  async function handlelogon(e) {
    e.preventDefault();

    try {
      const res = await api.post("/sessions", { id });

      localStorage.setItem("userId", id);
      localStorage.setItem("name", res.data.name);
      history.push("./profile");
    } catch (error) {
      console.log("Logon failed");
      console.error(error.message);
    }
  }

  return (
    <>
      <div className='logon-container'>
        <section className='form'>
          <form onSubmit={handlelogon}>
            <h1>Logon</h1>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder='Your ID'
            />
            <button className='button' type='submit'>
              Enter
            </button>
            <Link className='back-link' to='/register'>
              I don't have an account
              <FiLogIn size={16} color='#E02041' />
            </Link>
          </form>
        </section>
      </div>
    </>
  );
};

export default Logon;
