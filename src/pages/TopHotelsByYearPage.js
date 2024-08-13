import React, { useState } from 'react';
import axios from 'axios';
//import './YourStyles.css'; // Import your CSS file for styling

const TopHotelsByYearPage = () => {
  const [startYear, setStartYear] = useState('2010');
  const [endYear, setEndYear] = useState('2020');
  const [topHotels, setTopHotels] = useState([]);

  const fetchTopHotels = async () => {
    try {
      const response = await axios.get('/api/v1/users/top-hotels', {
        params: {
          startYear: startYear,
          endYear: endYear,
        },
      });

      if (response.data.success) {
        setTopHotels(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchTopHotels();
  };

  return (
    <div className="table-container">
      <h1>Top Hotels by Revenue</h1>
      <div className="input-container">
        <label>Start Year:</label>
        <input
          type="text"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label>End Year:</label>
        <input
          type="text"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Branch</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {topHotels.map((hotel, index) => (
            <tr key={index}>
              <td>{hotel._id}</td>
              <td>{hotel.revenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopHotelsByYearPage;
