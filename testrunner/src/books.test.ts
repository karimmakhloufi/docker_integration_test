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
            author
          }
        }
      `,
    });
    expect(res.data?.books).toEqual([]);
  });

  it("books contain lean startup after mutation", async () => {
    const mutationresult = await client.mutate({
      mutation: gql`
        mutation books {
          addBook(title: "The Lean Startup", author: "Eric Ries") {
            title
          }
        }
      `,
    });

    console.log(mutationresult);

    await new Promise((r) => setTimeout(r, 10000));

    const res = await client.query({
      query: gql`
        query Books {
          books {
            title
            author
          }
        }
      `,
    });
    expect(res).toContain([
      { data: { books: { __typename: "Book", title: "The Lean Startup" } } },
    ]);
  });
});
