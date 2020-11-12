import gql from "graphql-tag";

const Fragments = {};

Fragments.project = {
  full: gql`
    fragment FullProject on Project {
      id
      title
      owner {
        id
        name
        email
        avatarUrl
        __typename
      }
      collaboratorEmails
      collaborators {
        id
        name
        avatarUrl
        email
        __typename
      }
      mixes {
        id
        title
        fileUrl
        fileName
        comments {
          id
          time
          text
          creator {
            id
            name
            email
            avatarUrl
          }
          isComplete
        }
        __typename
      }
      __typename
    }
  `,
};

Fragments.user = {
  full: gql`
    fragment FullUser on User {
      id
      name
      avatarUrl
      email
      projects {
        ...FullProject
      }
      __typename
    }
    ${Fragments.project.full}
  `,
};

export default Fragments;
