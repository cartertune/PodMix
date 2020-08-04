import _ from "lodash";
import jwt, { VerifyCallback, VerifyErrors } from "jsonwebtoken";
import fetch from "node-fetch";

interface IAuth0User {
  sub: string;
  nickname: string;
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
}

class Auth0Service {
  // --------- Validate User based on JWT  --------- //
  // Input: rawAuthentication, which is of form:
  //    `Bearer ....JWT....`
  // Output: If valid:    unwrapped JWT
  //         If invalid:  null
  // Note: This does not confirm that this user is in our DB.
  async validateJWT(rawAuthorization: string): Promise<IAuth0User> {
    // Let this variable equal the validated User, or null.
    let verifiedJWT = null;
    // Let this be the authorization token, cleaned up.
    let authorization = "";
    // Get rid of "Bearer" in the front
    if (rawAuthorization) {
      const splitAuth = rawAuthorization.split(" ");
      authorization = splitAuth[1] ? splitAuth[1] : null; //TODO throw error if impossible.
    } else {
      // No auth token means no Parade for you
      console.log("validateUser: NO AUTH TOKEN");
      return null;
    }

    // Get the JWKS
    const jwksFull = await this.fetchJWKS();
    const jwks = _.get(jwksFull, "keys[0]");

    const signingKeys = {
      kid: jwks.kid,
      publicKey: this.certToPEM(jwks.x5c[0])
    };

    // Verify the given JWT is valid
    // If Valid:   returns decoded JWT
    // If invalid: returns undefined
    // This function also checks for JWT expiry. This is set on Auth0.
    jwt.verify(
      authorization,
      signingKeys.publicKey,
      { issuer: "https://dev-li8q9fo2.auth0.com/" },
      (err: VerifyErrors, decoded: string | object): VerifyCallback => {
        if (err) {
          console.log("validateUser: " + err.message);
          return null;
        }

        // If there is no error, we good!
        if (!err && decoded) {
          verifiedJWT = decoded;
        }
      }
    );

    // Return what we end up with
    return verifiedJWT;
  }

  // Retrieves the Auth0 public key that is used to verify the signature of the JWT
  // TODO cache the JWKS.
  private async fetchJWKS(): Promise<object> {
    try {
      const response = await fetch(
        "https://dev-li8q9fo2.auth0.com/.well-known/jwks.json"
      );
      const text = await response.text();
      const json = JSON.parse(text); // Try to parse it as json
      return json;
    } catch (err) {
      console.log("Error parsing JWKS");
      return null;
    }
  }

  private certToPEM(cert: string) {
    cert = cert.match(/.{1,64}/g).join("\n");
    cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    return cert;
  }
}

export default new Auth0Service();
