import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
//import SearchPage from './pages/Search';
import React from 'react';
import './styles/globalStyles.css';

import YearwiseCitywiseRevenuePage from './pages/YearwiseCitywiseRevenuePage'; // Import the new page
import TopCustomersByBranchPage from './pages/TopCustomersByBranchPage';
import TopHotelsByYearPage from './pages/TopHotelsByYearPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminSignupPage from './pages/AdminSignupPage';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<AdminSignupPage />} />
        <Route path="/query1" element={<YearwiseCitywiseRevenuePage />} />
        <Route path="/query2" element={<TopCustomersByBranchPage />} />
        <Route path="/query3" element={<TopHotelsByYearPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
