import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import Floor2 from "../pages/Floor2";
import Floor3 from "../pages/Floor3";
import BookingHistory from "../pages/BookingHistory";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/floor2" element={<Floor2 />} />
        <Route path="/floor3" element={<Floor3 />} />
        <Route path="/bookinginfo" element={<BookingHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
