import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Police_office from "./scenes/policeOffice";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Protected from "./scenes/protected";
import Chart from "./scenes/chart";
import ProtectedScenes from "./scenes/protectedScenes";
import CCTVViewer from "./scenes/ccTVViewer";
import SafeReturnHome from "./scenes/safe_return_home";
import React from 'react';
import SafeReturnRoad from "./scenes/safeReturnRoad";
import BarChart from "./components/BarChart";
import MapKaKao from "./scenes/mapKakao";
import PostApp from "./PostApp";
import PostView from "./page/post/PostView";
import EmergencyModal from "./scenes/modal";
import WeatherButton from "./scenes/weather/WeatherButton";
import WeatherParent from "./scenes/weather/WeatherParent";



function App() {
  const [theme, colorMode] = useMode();

  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        setEmergencyModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/police_office" element={<Police_office />} />
            <Route path="/protected" element={<Protected />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/protectedScenes" element={<ProtectedScenes />} />
            <Route path="/cctv" element={<CCTVViewer /> }/>
            <Route path="/returnHome" element={<SafeReturnHome />} />
            <Route path="/returnRoad" element={<SafeReturnRoad />} />
            <Route path="/bar" element={<BarChart />} />
            <Route path="/mapkakao" element={<MapKaKao />} />
            <Route path="/post" element={<PostApp />} />
            <Route path="/post/:no" element={<PostView />} />
            <Route path="/weather" element={<WeatherParent />} />
            <Route path="/button" element={<WeatherButton />} />
            </Routes>
            <EmergencyModal open={emergencyModalOpen} onClose={() => setEmergencyModalOpen(false)} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;