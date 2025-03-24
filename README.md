# Dynamic TSS-MPC Demo

This project demonstrates the use of Dynamic's TSS-MPC (Threshold Signature Scheme Multi-Party Computation) Embedded Wallets functionality. The application showcases how to integrate Dynamic's MPC wallet capabilities into a React application.

## Features

- User authentication with Dynamic
- TSS-MPC wallet creation
- Private key export/import
- Client keyshares export
- Transaction execution (EVM example)

## Prerequisites

Before using this application, you'll need:

1. A Dynamic account with an environment ID
2. TSS-MPC feature flag enabled for your environment (contact Dynamic team)

## Getting Started

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Configure your Dynamic environment ID:
   - Create a `.env` file in the project root (you can copy from `.env.example`)
   - Set your Dynamic environment ID in the `.env` file:
     ```
     REACT_APP_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id_here
     ```
   - Alternatively, you can directly edit the value in `src/App.tsx`

### Running the App

```bash
npm start
```

The application will run on [http://localhost:3000](http://localhost:3000).

## Important Notes

- The TSS-MPC implementation is currently in beta testing.
- Do not store any assets you cannot afford to lose.
- Breaking changes may occur in future updates.

## Supported Chains

- EVM
- Solana (SVM)

## Known Limitations

The following features are currently not supported but will be included in subsequent releases:

1. Importing an exported Solana Private key to a popular Solana Wallet
2. Account Abstraction & Gas Sponsorship
3. Global Wallets
4. Low-Level Access to Signers for chains other than EVM and SVM
5. Pre-Generated wallets
6. Google Auth backup share

## Learn More

For more information about Dynamic and their wallet-as-a-service offerings, visit [dynamic.xyz](https://dynamic.xyz).

## License

This project is licensed under the MIT License.
