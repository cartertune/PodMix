import { graphql } from "react-apollo";
import gql from "graphql-tag";

//  Retrieve a signed S3 URL
export const signS3Url = graphql(
  gql`
    mutation signS3Url($fileType: String!) {
      signS3Url(fileType: $fileType) {
        signedRequest
        url
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      signS3Url: (fileType) =>
        mutate({
          variables: { fileType },
        }),
    }),
  }
);
