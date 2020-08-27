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
  options: (props) => ({
    variables: { id: _.get(props, "match.params.id") },
  }),
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
