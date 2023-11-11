import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [ theme, colorMode] = useMode();

  return (<ColorModeContext.Provider value = {colorMode}>
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
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
