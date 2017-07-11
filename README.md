# graphql-anywhere-mongodb Example App

This app combines the following two libraries into one express server that can accept GraphQL requests to MongoDB:

- [graphql-anywhere-mongodb](https://github.com/dflor003/graphql-anywhere-mongodb)
- [graphql-anywhere-mongodb-express](https://github.com/dflor003/graphql-anywhere-mongodb-express)

## Setup

### Prerequisites

- Local installation of MongoDB
- (OR) Docker

Clone the app using the following command:

```sh
git clone https://github.com/dflor003/graphql-anywhere-mongodb-example
```

### Option 1: Run against local MongoDB

Set the `APP_MONGO` environment variable in `/.env` at the root of the project to the connection string to your mongo instance.

Then start the app by running:

```sh
npm run start:dev
```

### Option 2: Run with Docker

Ensure you have a recent version of docker and have access to the `docker-compose` command and then run the following command:

```sh
npm run start:docker
```

### Navigate to the app

Once the app is running, navigate to the app at `http://localhost:3000`.

## Sample Data

You can test it out using [this sample dataset](https://docs.mongodb.com/getting-started/shell/import-data/) or any local dataset you have.

If you go for a local collection, do be sure to update the `whitelist` variable in `server.ts` with the name(s) of the collection(s) you are querying or get rid of the whitelist value altogether.
