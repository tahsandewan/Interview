import React from 'react'
import SearchTable from "./components/SearchTable"
import TShirt from "./components/T_Shirt"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default function App() {
  return (
    <Router>
    <nav>
      <ul>
       
        <li><Link to="/table-task">Table Task</Link></li>

        <li><Link to="/t-shirt">T-Shirt Task</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<SearchTable />} />
      <Route path="/t-shirt" element={<TShirt />} />
      <Route path="/table-task" element={<SearchTable />} />
    </Routes>
  </Router>
   
  )
}
