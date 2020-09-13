import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Fragments from "./fragments";
import _ from "lodash";

export const GET_PROJECT_QUERY = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      ...FullProject
    }
  }
  ${Fragments.project.full}
`;

export const getProject = graphql(GET_PROJECT_QUERY, {
  options: (props) => {
    return {
      variables: { id: _.get(props, "match.params.id") },
    };
  },
  props: ({ data: { loading, error, refetch, project } }) => ({
    loading,
    error,
    refetchProject: refetch,
    project,
  }),
});

const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($project: ProjectInput!) {
    createProject(project: $project) {
      ...FullProject
    }
  }
  ${Fragments.project.full}
`;

export const createProject = graphql(CREATE_PROJECT_MUTATION, {
  props: ({ mutate }) => ({
    createProject: (project) => {
      return mutate({
        variables: { project },
      });
    },
  }),
});

const ADD_MIX_MUTATION = gql`
  mutation addMix($projectId: ID!, $mix: MixInput!) {
    addMix(projectId: $projectId, mix: $mix) {
      ...FullProject
    }
  }
  ${Fragments.project.full}
`;

export const addMix = graphql(ADD_MIX_MUTATION, {
  props: ({ mutate }) => ({
    addMix: (projectId, mix) => {
      return mutate({
        variables: { projectId, mix },
      });
    },
  }),
});

const ADD_COMMENT_MUTATION = gql`
  mutation addComment($projectId: ID!, $mixId: ID!, $comment: CommentInput!) {
    addComment(projectId: $projectId, mixId: $mixId, comment: $comment) {
      ...FullProject
    }
  }
  ${Fragments.project.full}
`;

export const addComment = graphql(ADD_COMMENT_MUTATION, {
  props: ({ mutate }) => ({
    addComment: ({ projectId, mixId, comment }) => {
      return mutate({
        variables: { projectId, mixId, comment },
      });
    },
  }),
});

const ADD_COLLABORATOR_MUTATION = gql`
  mutation addCollaborator($projectId: ID!, $email: String!) {
    addCollaborator(projectId: $projectId, email: $email) {
      ...FullProject
    }
  }
  ${Fragments.project.full}
`;

export const addCollaborator = graphql(ADD_COLLABORATOR_MUTATION, {
  props: ({ mutate }) => ({
    addCollaborator: (projectId, email) => {
      return mutate({
        variables: { projectId, email },
      });
    },
  }),
});
