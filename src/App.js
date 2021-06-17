import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider  } from '@apollo/client';
import BookList from './components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';
import './App.css';

const client = new ApolloClient({
  uri: "https://surryasfootballerlist.herokuapp.com/graphql",
  cache: new InMemoryCache()
})

export default class App extends Component {

  // componentDidMount() {
  //   client
  // .query({
  //   query: gql`
  //     query {
  //       player(id: "5f4f9c8fd5c2460ff82826e5"){
  //         name
  //         club {
  //           name
  //         }
  //       }
  //     }
  //   `
  // })
  // .then(result => console.log(result));
  // }

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Surrya's Footballer List</h1>
          <BookList />
          <AddPlayer />
        </div>
      </ApolloProvider>
    );
  }
}
