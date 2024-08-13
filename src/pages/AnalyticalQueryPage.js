import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticalQueryPage = () => {
  const [averageRoomExpense, setAverageRoomExpense] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/users/analytical-query');
        if (response.data.success) {
          setAverageRoomExpense(response.data.data.averageRoomExpense);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Analytical Query Results</h1>
      {averageRoomExpense !== null ? (
        <p>Average Room Expense: ${averageRoomExpense.toFixed(2)}</p>
      ) : (
        <p>Loading analytical query results...</p>
      )}
    </div>
  );
};

export default AnalyticalQueryPage;