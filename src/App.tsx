import React from "react";
import "./App.css";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWaasEVMConnectors } from "@dynamic-labs/waas-evm";
import MPCDemo from "./components/MPCDemo";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const App: React.FC = () => {
  // Get environment ID from .env file or use a placeholder
  const environmentId = process.env.VITE_DYNAMIC_ENVIRONMENT_ID;

  if (!environmentId) {
    throw new Error("VITE_DYNAMIC_ENVIRONMENT_ID is not set");
  }

  // Configure settings for Dynamic provider
  const settings = {
    environmentId,
    walletConnectors: [EthereumWalletConnectors, DynamicWaasEVMConnectors],
    apiBaseUrl: "https://app.dynamicauth.com/api/v0",
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic TSS-MPC Demo</h1>
        <p>Demonstrates the TSS-MPC Embedded Wallets functionality</p>
      </header>

      <DynamicContextProvider settings={settings} enableInstrumentation>
        <div className="App-content">
          <DynamicWidget />
          <MPCDemo />
        </div>
      </DynamicContextProvider>
    </div>
  );
};

export default App;
