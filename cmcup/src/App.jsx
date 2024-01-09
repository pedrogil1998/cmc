import "./App.css";
import { TitleText } from "./utils/utils";
import { Box, Typography } from "@mui/material";
import kcdmlogo from "./assets/kcdmlogo.png";
import Sheet from "./pages/Sheet";
import Scoring from "./pages/Scoring";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

// Create Document Component

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          className="header-box"
        >
          <TitleText variant="h2" style={{ color: "black" }}>
            Classificações
          </TitleText>
          
          <a
            rel="noreferrer"
            href="https://cabodomundokarting.pt/"
            target="_blank"
          >
            <img src={kcdmlogo} className="logo cm" alt="Cm logo" />
          </a>
        </Box>
        <Box>
            <nav className="navbar">
              <Link className="link" to="/cmc">
                <Typography>{"Sheet"}</Typography>
              </Link>
              <Link className="link" to="/scoring">
                <Typography>{"Scoring"}</Typography>
              </Link>
            </nav>
            <Outlet />
          </Box>
        <Routes>
          <Route path="/cmc" index element={<Sheet />} />
          <Route path="/scoring" element={<Scoring />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
