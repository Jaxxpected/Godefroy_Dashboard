// customer.service.js
import { gql } from "@apollo/client";
import apolloClient from "../../../apollo-client";

export async function getAll() {
  return apolloClient
    .query({
      query: gql`
        query {
          customers {
            id
            name
          }
        }
      `,
    })
    .then((result) => result.data.customers);
}

export async function getById(id) {
  return apolloClient
    .query({
      query: gql`
        query Customer($id: ID) {
          customer(id: $id) {
            id
            title
            lead
            body
          }
        }
      `,
      variables: {
        id
      }
    })
    .then((result) => {
      return result.data.customer;
    });
}