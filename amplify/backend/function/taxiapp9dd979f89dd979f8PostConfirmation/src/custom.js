const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log('Error: No user was written to DynamoDB');
    context.done(null, event);
    return;
  }

  // save the user to DynamoDb
  const data = new Date();

  const params = {
    Item: {
      id: {S: event.request.userAttributes.sub},
      __typename: {S: 'User'},
      username: {S: event.userName},
      email: {S: event.request.userAttributes.sub},
      createdAt: {S: data.toISOString()},
      updatedAt: {S: data.toISOString()},
    },

    TableName: process.env.USERTABLE,
  };

  try {
    await ddb.putItem(params).promise();

    console.log('success');
  } catch (err) {
    console.log(err);
  }

  context.done(null, event);
};