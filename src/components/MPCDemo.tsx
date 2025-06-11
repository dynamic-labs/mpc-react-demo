import React, { useState } from "react";
import { useDynamicContext, useDynamicWaas } from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet } from "@dynamic-labs/ethereum";
import { isDynamicWaasConnector } from '@dynamic-labs/wallet-connector-core';
import { ChainEnum } from "@dynamic-labs/sdk-api-core";

const MPCDemo: React.FC = () => {
  const { user, handleLogOut, primaryWallet } = useDynamicContext();
  const { createWalletAccount, importPrivateKey } = useDynamicWaas();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [privateKeyInput, setPrivateKeyInput] = useState<string>("");
  const [exportedKeyShares, setExportedKeyShares] = useState<string>("");
  const [exportedPrivateKey, setExportedPrivateKey] = useState<string>("");
  const [signedMessage, setSignedMessage] = useState<string>("");
  const handleCreateWallet = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      await createWalletAccount();
    } catch (error: any) {
      console.error("Error creating wallet:", error);
      setErrorMessage(`Error creating wallet: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignMessage = async () => {
    if (!primaryWallet?.address || !isEthereumWallet(primaryWallet)) {
      setErrorMessage("Please create a wallet first");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      const provider = await primaryWallet.getWalletClient();

      const message = "Hello, world!";
      const signature = await provider?.signMessage({
        message: message,
      });
      setSignedMessage(signature ?? "");
    } catch (error: any) {
      console.error("Error signing message:", error);
      setErrorMessage(`Error signing message: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportPrivateKey = async () => {
    if (!privateKeyInput || !primaryWallet?.address) {
      setErrorMessage(
        "Please enter a private key and ensure wallet is created"
      );
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      await importPrivateKey({
        chainName: ChainEnum.Evm,
        privateKey: privateKeyInput,
      });
      setErrorMessage("Private key imported successfully");
    } catch (error: any) {
      console.error("Error importing private key:", error);
      setErrorMessage(`Error importing private key: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportKeyShares = async () => {
    if (!primaryWallet?.address) {
      setErrorMessage("Please create a wallet first");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      if(isDynamicWaasConnector(primaryWallet?.connector)) {
        const connector = primaryWallet?.connector;
        const keyShares = await connector.exportClientKeyshares({
          accountAddress: primaryWallet?.address,
        });
        setExportedKeyShares(JSON.stringify(keyShares, null, 2));
      } else {
        setErrorMessage("Please create a wallet first");
      }
    } catch (error: any) {
      console.error("Error exporting key shares:", error);
      setErrorMessage(`Error exporting key shares: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPrivateKey = async () => {
    if (!primaryWallet?.address) {
      setErrorMessage("Please create a wallet first");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      if(isDynamicWaasConnector(primaryWallet?.connector)) {
        const connector = primaryWallet?.connector ;
        return await connector.exportPrivateKey({
          accountAddress: primaryWallet?.address,
        });
      } else {
        setErrorMessage("Please create a wallet first");
      }
    } catch (error: any) {
      console.error("Error exporting private key:", error);
      setErrorMessage(`Error exporting private key: ${error.message}`);
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

        {primaryWallet?.address && (
          <div>
            <p>Wallet Address:</p>
            <div className="address">{primaryWallet?.address}</div>
          </div>
        )}
      </div>

      {primaryWallet?.address && (
        <>
          <div className="card">
            <h2>Import Private Key</h2>
            <input
              type="text"
              value={privateKeyInput}
              onChange={(e) => setPrivateKeyInput(e.target.value)}
              placeholder="Enter private key"
              className="input"
            />
            <button onClick={handleImportPrivateKey} disabled={isLoading}>
              Import Private Key
            </button>
          </div>

          <div className="card">
            <h2>Export Key Shares</h2>
            <button onClick={handleExportKeyShares} disabled={isLoading}>
              Export Key Shares
            </button>
            {exportedKeyShares && (
              <div className="output">
                <pre>{exportedKeyShares}</pre>
              </div>
            )}
          </div>

          <div className="card">
            <h2>Export Private Key</h2>
            <button onClick={handleExportPrivateKey} disabled={isLoading}>
              Export Private Key
            </button>
            {exportedPrivateKey && (
              <div className="output">
                <pre>{exportedPrivateKey}</pre>
              </div>
            )}
          </div>
        </>
      )}

      <div className="card">
        <h2>Sign Message</h2>
        <button onClick={handleSignMessage} disabled={isLoading}>
          Sign Message
        </button>
        {signedMessage && (
          <div className="output">
            <pre>{signedMessage}</pre>
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
