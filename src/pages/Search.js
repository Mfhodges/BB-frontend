import React, { useState } from "react";
import { BBCard } from "../components/BBCard";
import { Link } from "react-router-dom";
import { getBeanies } from "../data/utils";

function refreshPage() {
  window.location.reload();
}

export const Search = () => {
  const [title, updateTitle] = useState();
  const [beanies, setBeanies] = useState([]);
  const [isResults, setIsResults] = useState(false); // if we have searched 

  const queryBeanies = () => {
    const result = getBeanies(title);
    if (result.length) {
      setBeanies(result);
    }
    // else no results
    setIsResults(true);
  };
  if (isResults && !beanies.length) {
    return (
      <>
        <p>no results for that search, please try again!</p>
        <button type="button" onClick={refreshPage}>
          {" "}
          <span className="big" role="img" aria-label="left pointing hand">
            👈
          </span>{" "}
          Go Back{" "}
        </button>
      </>
    );
  }

  if (!beanies.length) {
    return (
      <>
        <h2>
          <span role="img" aria-label="Magnifying Glass">
            🔎
          </span>{" "}
          Search by Name{" "}
          <span role="img" aria-label="Magnifying Glass">
            🔍
          </span>
        </h2>
        <h4>Searching: `{title}`</h4>
        <p>To Query Alphabetically, just search the desired letter.</p>
        <form
          className="form-inline"
          onSubmit={(e) => {
            e.preventDefault();
            queryBeanies(e);
          }}
        >
          <label htmlFor="title">
            Name
            <input
              id="title"
              value={title}
              placeholder="Name"
              onChange={(e) => updateTitle(e.target.value)}
            />
          </label>
          <button>Submit</button>
        </form>

        <hr></hr>
        <h2>Looking for your perfect match?</h2>
        <p>
          {" "}
          Checkout out the <Link to="/match">matchmaker</Link>!
        </p>
      </>
    );
  }
  if (isResults) {
    return (
      <>
        <h1>Results For: {title}</h1>
        <div className="cards">
          {beanies.map((beanie) => (
            <BBCard beaniebaby={beanie} key={beanie.id} />
          ))}
        </div>
      </>
    );
  }
  return <p>an error occurred</p>;
};
