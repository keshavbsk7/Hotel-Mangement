import React, { useState } from 'react';
import axios from 'axios';
import '../styles/YearwiseCitywiseRevenuePage.css';

const YearwiseCitywiseRevenuePage = () => {
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [branch, setBranch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/v1/users/yearwise-citywise-revenue`, {
        params: {
          startYear: startYear,
          endYear: endYear,
          branch: branch
        }
      });

      if (response.data.success) {
        setResults(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table-container">
      <h1>Yearwise, Citywise Revenue Generator</h1>
      <div className="search-form">
        <input
          type="text"
          placeholder="Start Year"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="End Year"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {results !== null ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result._id.branch}</td>
                <td>{result.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading analytical query results...</p>
      )}
    </div>
  );
};

export default YearwiseCitywiseRevenuePage;
