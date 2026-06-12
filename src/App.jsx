import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries",
    )
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {filteredCountries.map((country) => (
          <div key={country.common} className="countryCard">
            <img src={country.png} alt={`Flag of ${country.common}`} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
