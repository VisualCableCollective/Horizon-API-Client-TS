import APIClient from './HorizonAPIClient';
import APIClientConfig, { Environment } from './HorizonAPIClientConfig';

// Constants
const TEST_BEARER_TOKEN = '49|dJBMD2lzTnd4CZuHipGESL5wUnFRFMNKXEmnoNhE';

const apiClientConfig = new APIClientConfig(Environment.LocalDevelopment);

const apiClient = new APIClient(apiClientConfig);

test('user should authenticate', async () => {
  const result = apiClient.authenticateUserWithToken(TEST_BEARER_TOKEN);
  expect(result).toBe('true');
});

test('user should not authenticate', async () => {
  const result = apiClient.authenticateUserWithToken(`${TEST_BEARER_TOKEN}333434fasd3434`);
  expect(result).toBe('false');
});
