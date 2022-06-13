import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ListingPage from "./Pages/Listing_Page";
import FormPage from "./Pages/Form_Page";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ListingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/form' element={<FormPage />} />
      </Routes>

    </div>
  );
}

export default App;
