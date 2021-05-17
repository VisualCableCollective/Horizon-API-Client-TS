import APIClient from './HorizonAPIClient';
import APIClientConfig, { Environment } from './HorizonAPIClientConfig';

require('dotenv').config();

// Init
const apiClientConfig = new APIClientConfig(Environment.LocalDevelopment);
const apiClient = new APIClient(apiClientConfig);

if (process.env.TEST_BEARER_TOKEN) {
  test('user should authenticate', async () => {
    const result = await apiClient.authenticateUserWithToken(process.env.TEST_BEARER_TOKEN || '');
    expect(result).toBe(true);
  });
}

test('user should not authenticate', async () => {
  const result = await apiClient.authenticateUserWithToken('definitely_not_working_token');
  expect(result).toBe(false);
});
