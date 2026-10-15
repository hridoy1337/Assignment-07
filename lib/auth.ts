import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not set");
}

const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

const client = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubId = process.env.GITHUB_CLIENT_ID;
const githubSecret = process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  database: mongodbAdapter(client.db("bazardor")),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
  },
  socialProviders: {
    ...(googleId && googleSecret
      ? { google: { clientId: googleId, clientSecret: googleSecret } }
      : {}),
    ...(githubId && githubSecret
      ? { github: { clientId: githubId, clientSecret: githubSecret } }
      : {}),
  },
});
