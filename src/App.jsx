import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FormBDC from "./Pages/FormRumbaoBDC";
import FormPostventa from "./Pages/FormRumbaoPost";
import HomePage from "./Pages/Home";
function App() {
  return (
    <div className="app-ctnr">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/bdc" element={<FormBDC />}></Route>
          <Route path="/posventa" element={<FormPostventa />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
