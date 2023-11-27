import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletDashboard } from "./pages/WalletDashboard/WalletDashboard";
import { Assets } from "./pages/Assets/Assets";
import { TransactionsList } from "./pages/TransactionsList/TransactionsList";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="bg-black">
      <BrowserRouter>
        <Routes>
          <Route element={<WalletDashboard />}>
            <Route path="/" element={<Assets />} />
            <Route path="/transactions/:assetName" element={<TransactionsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
