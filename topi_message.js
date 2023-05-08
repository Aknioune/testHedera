const {
    Client,
    TopicCreateTransaction,
    TopicMessageQuery,
    TopicMessageSubmitTransaction,

  } = require("@hashgraph/sdk");
  require("dotenv").config();
  
  async function main() {
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
  
//Create the transaction
const transaction = new TopicCreateTransaction();

//Sign with the client operator private key and submit the transaction to a Hedera network
const txResponse = await transaction.execute(client);

//Request the receipt of the transaction
const receipt = await txResponse.getReceipt(client);

//Get the topic ID
const newTopicId = receipt.topicId;

console.log("The new topic ID is " + newTopicId);

//v2.0.0

//Create the transaction
await new TopicMessageSubmitTransaction({
    topicId: receipt.topicId,
    memo:"Memo:"+ info.topicMemo,
    message: "Hello World",
}).execute(client);

//v2.0.0



//Create the query
new TopicMessageQuery()
        .setTopicId("0.0.4584399")
        .setStartTime(0)
        .subscribe(
            client,
            (message) => console.log(Buffer.from(message.contents, "utf8").toString())
        );
//v2.0.0





  }
  
  // Call the async main function
  main();


