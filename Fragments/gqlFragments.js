import { gql } from '@apollo/client';

const FRAGMENT_USER_EMAIL = gql`
  fragment UserEmail on User {
    id
    email
  }
`;

export { FRAGMENT_USER_EMAIL }