import { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
import { client } from "./client";
import { SEARCH_REPOSITORIES } from "./graphql";

const DEFAULT_VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア",
};

function App() {
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);
  const { first, after, last, before, query } = variables;

  function handleChange(e) {
    setVariables({ ...variables, query: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <ApolloProvider client={client}>
      <form onSubmit={handleSubmit}>
        <input value={query} onChange={handleChange} />
      </form>
      <Query query={SEARCH_REPOSITORIES} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          console.log({ data });
          return <div></div>;
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;
