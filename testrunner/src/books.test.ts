import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://backend:4000/",
    fetch,
  }),
  cache: new InMemoryCache(),
});

describe("book resolver", () => {
  it("books are empty", async () => {
    const res = await client.query({
      query: gql`
        query Books {
          books {
            title
          }
        }
      `,
    });
    expect(res.data?.books).toEqual([]);
  });

  it("books contain lean startup after mutation", async () => {
    const ADD_BOOK = gql`
      mutation addBook($title: String, $author: String) {
        addBook(title: $title, author: $author) {
          title
          author
        }
      }
    `;

    client.mutate({
      mutation: ADD_BOOK,
      variables: { title: "test", author: "test" },
    });

    const res = await client.query({
      query: gql`
        query Books {
          books {
            title
          }
        }
      `,
    });

    expect(res.data?.books).toEqual([]);
  });
});
