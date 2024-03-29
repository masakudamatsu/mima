const axios = require('axios').default;

export async function getAccessToken() {
  let response;
  try {
    // Adapted from https://auth0.com/docs/secure/tokens/access-tokens/get-management-api-access-tokens-for-production#get-access-tokens
    response = await axios.request({
      method: 'POST',
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
      }),
    });
    console.log(`Access token obtained`);
    return response.data.access_token;
  } catch (error) {
    console.error(`Failed to obtain access token: ${error}`);
  }
}

export async function getAppMetadata({accessToken, userId}) {
  let response;
  try {
    response = await axios.request({
      method: 'GET',
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(
      `Auth0 user app_metadata ${response.data['app_metadata']} retrieved`,
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to get the app metadata: ${error}`);
  }
}

export async function updateAppMetadata({accessToken, appMetadata, userId}) {
  let response;
  try {
    response = await axios.request({
      method: 'PATCH',
      url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      data: {
        app_metadata: appMetadata, // converting field name convention from JavaScript to Auth0
      },
    });
    console.log(
      `Auth0 user app_metadata updated with ${JSON.stringify(
        response.data['app_metadata'],
      )}`,
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to update the app metadata: ${error}`);
  }
}
