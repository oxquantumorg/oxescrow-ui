# Oxescrow Payments Frontend

Project Description:
We are building a decentralized escrow payments system called OxEscrow. OxEscrow allows users to securely conduct transactions by escrowing funds until certain conditions are met, such as the delivery of goods or completion of services. The system is built on the Solana blockchain and utilizes smart contracts to automate the escrow process. With OxEscrow, users can transact with confidence, knowing that their funds are protected until both parties fulfil their obligations.


## Run

```
yarn start
```

or

```
npm run start
```

## How do I sign transactions??

Create your transaction as usual and use `wallet.signTransaction()`:

```typescript
const transaction = new web3.Transaction({ feePayer: wallet.publicKey });
transaction.add(instruction1);
transaction.add(instruction2);

await wallet.signTransaction(transaction);
const transactionHash = await web3.sendAndConfirmRawTransaction(
  connection,
  transaction.serialize()
);
```

## License

MIT
