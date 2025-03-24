import React, { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useDynamicWaas } from "@dynamic-labs/sdk-react-core";

const MPCDemo: React.FC = () => {
  const { user, handleLogOut } = useDynamicContext();
  const {
    createWalletAccount,
    shouldAutoCreateDynamicWaasWallet,
    dynamicWaasIsEnabled,
    getWalletConnector,
    importPrivateKey,
  } = useDynamicWaas();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const handleCreateWallet = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const walletAccounts = await createWalletAccount();
      console.log("walletAccounts", walletAccounts);
      if (walletAccounts && walletAccounts.length > 0) {
        const firstAccount = walletAccounts[0] as { accountAddress: string };
        setWalletAddress(firstAccount.accountAddress);
      }
    } catch (error: any) {
      console.error("Error creating wallet:", error);
      setErrorMessage(`Error creating wallet: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="card">
        <h2>Please log in to use the MPC wallet features</h2>
        <p>
          You need to authenticate with Dynamic to access MPC wallet
          functionality
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h2>TSS-MPC Wallet Demo</h2>
        <p>Logged in as: {user.email || user.username || "Unknown user"}</p>
        <button onClick={handleLogOut}>Log Out</button>
      </div>

      <div className="card">
        <h2>Create MPC Wallet</h2>
        <button onClick={handleCreateWallet} disabled={isLoading}>
          Create New Wallet
        </button>

        {walletAddress && (
          <div>
            <p>Wallet Address:</p>
            <div className="address">{walletAddress}</div>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="card" style={{ backgroundColor: "#ffeeee" }}>
          <h2>Error</h2>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MPCDemo;
