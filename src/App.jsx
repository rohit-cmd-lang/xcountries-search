import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchCountries = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");

      const data = await res.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const performSearch = async (name) => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const filteredData = data.filter((country) =>
          country.name.common.toLowerCase().includes(name.toLowerCase())
        );
        setCountries(filteredData);
      } else {
        setCountries([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchText) {
      performSearch(searchText);
    } else {
      fetchCountries();
    }
  }, [searchText]);

  return (
    <>
      <div className="searchDiv">
        <input
          className="searchBox"
          type="text"
          placeholder="Search for countries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="grid">
        {countries.map((country, i) => (
          <CountryCard
            key={i}
            name={country.name.common}
            flag={country.flags.png}
          />
        ))}
      </div>
    </>
  );
}

export default App;
