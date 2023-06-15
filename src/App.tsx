import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import { FinanProvider } from "./contexts/financeiro/FinanContexts";

import Home from "./pages/Home";
import Parcelas from "./pages/Parcelas";
import CadParcela from "./pages/CadParcela";
import Financeiro from "./pages/Financeiro";
import Resumo from "./pages/Resumo";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <BrowserRouter>
        <FinanProvider>
          <Header />
          <div
            style={{
              height: "calc(100% - 120px)",
              overflow: "auto",
              padding: "0 20px",
            }}
            data-testid="container-routes"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/parcelados" element={<Parcelas />} />
              <Route path="/cad-parcela" element={<CadParcela />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/resumo" element={<Resumo />} />
            </Routes>
          </div>
        </FinanProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
