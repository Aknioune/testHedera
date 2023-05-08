const {
    Client,
    TokenCreateTransaction,
    treasuryAccountId,
  } = require("@hashgraph/sdk");
  require("dotenv").config();
  

   async function createToken() {
    // Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

  
    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present"
      );
    }
  
    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();
  
    client.setOperator(myAccountId, myPrivateKey);
  


//Create a token
const transaction = new TokenCreateTransaction()
    .setName("MyToken")
    .setSymbol("F")
    .setTreasury(treasuryAccountId)
    .setInitialSupply(5000)
    .setAdminKey(adminKey.publicKey);

//Build the unsigned transaction, sign with the admin private key of the token, sign with the token treasury private key, submit the transaction to a Hedera network
const transactionId = await transaction.build(client).sign(adminKey).sign(treasuryKey).execute(client);

//Request the receipt of the transaction
const getReceipt = await transactionId.getReceipt(client);

//Get the token ID from the receipt
const tokenId = getReceipt.getTokenId();

console.log("The new token ID is " +tokenId);

//Version: 1.4.2



    // Create new keys
    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;
  
    // Create a new account with 1,000 tinybar starting balance
    const newAccountTransactionResponse = await new AccountCreateTransaction()
      .setKey(newAccountPublicKey)
      .setInitialBalance(Hbar.fromTinybars(1000))
      .execute(client);
  
    // Get the new account ID
    const getReceipt = await newAccountTransactionResponse.getReceipt(client);
    const newAccountId = '0-904239';
  
    console.log("The new account ID is: " + newAccountId);
  
    // Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);
  
    console.log(
      "The new account balance is: " +
        accountBalance.hbars.toTinybars() +
        " tinybars."
    );
  
    // Create the transfer transaction
    const sendHbar = await new TransferTransaction()
      .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000))
      .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000))
      .execute(client);
  
    // Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(client);
    console.log(
      "The transfer transaction from my account to the new account was: " +
        transactionReceipt.status.toString()
    );
  
    // Request the cost of the query
    const queryCost = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .getCost(client);
  
    console.log("The cost of query is: " + queryCost);
  
    // Check the new account's balance
    const getNewBalance = await new AccountBalanceQuery()
      .setAccountId(newAccountId)
      .execute(client);
  
    console.log(
      "The account balance after the transfer is: " +
        getNewBalance.hbars.toTinybars() +
        " tinybars."
    );





}
  
// Call the async main function
createToken();