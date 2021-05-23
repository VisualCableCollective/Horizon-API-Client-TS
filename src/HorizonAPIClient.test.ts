import { HorizonAPIClientConfig, HorizonAPIClient, Environment } from './HorizonAPIClient';

require('dotenv').config();

// Init
const apiClientConfig = new HorizonAPIClientConfig(Environment.LocalDevelopment);
const apiClient = new HorizonAPIClient(apiClientConfig);

// -------- AUTH TESTS --------
test('user should not authenticate', async () => {
  const result = await apiClient.authenticateUserWithToken('definitely_not_working_token');
  expect(result).toBe(false);
});

if (process.env.TEST_BEARER_TOKEN) {
  test('user should authenticate', async () => {
    const result = await apiClient.authenticateUserWithToken(process.env.TEST_BEARER_TOKEN || '');
    expect(result).toBe(true);
  });
}

// -------- TEAM TESTS --------
test('VCC team should be found', async () => {
  const result = await apiClient.getTeam(1);
  expect(result?.id).toBe(1);
});
