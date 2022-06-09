import { ApolloServer, gql } from "apollo-server";
import { Schema, model, connect } from "mongoose";

const options = {
  authSource: "admin",
};

connect("mongodb://root:root@database:27017/books", options);

interface IBook {
  title: string;
  author: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

const Book = model<IBook>("Book", bookSchema);

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: async () => await Book.find(),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
