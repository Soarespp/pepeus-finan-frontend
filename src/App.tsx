import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { FinanProvider } from "./contexts/financeiro/FinanContexts";

import Home from "./pages/Home";
import Parcelas from "./pages/Parcelas";
import CadParcela from "./pages/CadParcela";
import Financeiro from "./pages/Financeiro";
import Resumo from "./pages/Resumo";
import Login from "./pages/Login";
import Geral from "./components/Content/Geral/Geral";
import CadUser from "./pages/CadUser/";

function App() {
  const renderHeader = (item: React.ReactElement) => <Geral>{item}</Geral>;
  return (
    <div style={{ height: "100vh" }}>
      <BrowserRouter>
        <FinanProvider>
          <div
            style={{
              height: "calc(100% - 120px)",
              overflow: "auto",
              padding: "0 20px",
            }}
            data-testid="container-routes"
          >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={renderHeader(<Home />)} />
              <Route path="/parcelados" element={renderHeader(<Parcelas />)} />
              <Route
                path="/cad-parcela"
                element={renderHeader(<CadParcela />)}
              />
              <Route
                path="/financeiro"
                element={renderHeader(<Financeiro />)}
              />
              <Route path="/resumo" element={renderHeader(<Resumo />)} />
              <Route path="/cad-usuario" element={<CadUser />} />
            </Routes>
          </div>
        </FinanProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
