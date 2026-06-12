import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries",
        );

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search for countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "8px",
            marginBottom: "20px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "16px",
        }}
      >
        {filteredCountries.map((country) => (
          <div
            key={country.common}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              textAlign: "center",
            }}
          >
            <img
              src={country.png}
              alt={`Flag of ${country.common}`}
              style={{
                width: "100px",
                height: "60px",
                objectFit: "cover",
              }}
            />

            <h4>{country.common}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
