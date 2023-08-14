import merge from "lodash/merge";
import { readFileSync } from "fs";
import { GraphQLSchema } from "graphql";
import { IResolvers } from "@graphql-tools/utils";
import { makeExecutableSchema } from "@graphql-tools/schema";

import UserResolvers from "./users/resolvers";

const UserSchema = readFileSync("./src/api/users/User.graphql", {
  encoding: "utf-8",
});

const typeDefs = [UserSchema];

const resolvers: IResolvers = merge(UserResolvers);

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
