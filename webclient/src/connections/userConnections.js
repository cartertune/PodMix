import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Fragments from "./fragments";

const LOGIN_MUTATION = gql`
  mutation login {
    login {
      id
    }
  }
`;

export const login = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    loginToServer: () => mutate(),
  }),
});

const CURRENT_USER_QUERY = gql`
  query currentUser {
    currentUser {
      ...FullUser
    }
  }
  ${Fragments.user.full}
`;

export const getCurrentUser = graphql(CURRENT_USER_QUERY, {
  props: ({ data: { loading, error, currentUser } }) => ({
    loading,
    error,
    currentUser,
  }),
});

// const GET_USER_QUERY = gql`
//   query user($id: ID!) {
//     user(id: $id) {
//       ...FullUser
//     }
//   }
//   ${Fragments.user.full}
// `;

// export const getUser = graphql(GET_USER_QUERY, {
//   options: (props) => ({
//     variables: { id: _.get(props, "match.params.id") },
//   }),
//   props: ({ data: { loading, error, refetch, user } }) => ({
//     loading,
//     error,
//     refetch,
//     user,
//   }),
// });
