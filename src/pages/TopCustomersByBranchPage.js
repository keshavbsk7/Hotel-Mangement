import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TopCustomersByBranchPage.css';

const TopCustomersByBranchPage = () => {
  const [topCustomers, setTopCustomers] = useState([]);
  const [branch, setBranch] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/v1/users/top-customers-by-branch`, {
        params: {
          branch: branch
        }
      });

      if (response.data.success) {
        setTopCustomers(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Top Customers by Branch</h1>
      <div>
        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {topCustomers.length > 0 && (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Branch</th>
              <th>Customer Name</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((branchData) => (
              branchData.topCustomers.map((customer, index) => (
                <tr key={index}>
                  {index === 0 && (
                    <>
                      <td rowSpan={branchData.topCustomers.length}>
                        {branchData.year}
                      </td>
                      <td rowSpan={branchData.topCustomers.length}>
                        {branchData.branch}
                      </td>
                    </>
                  )}
                  <td>{customer.name}</td>
                  <td>{customer.totalRevenue.toFixed(2)}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TopCustomersByBranchPage;
