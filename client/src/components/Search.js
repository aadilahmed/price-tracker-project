import React from "react"

function Search({ query, onQuery}) {
    function handleSubmit(event) {
        onQuery(event.target.value);
    }

    return (
      <div className="ui search">
        <div className="ui icon input">
          <input
            className="prompt"
            placeholder="Search products..."
            value={query}
            onChange={handleSubmit}
          />
          <i className="search icon" />
        </div>
      </div>
    );
}

export default Search