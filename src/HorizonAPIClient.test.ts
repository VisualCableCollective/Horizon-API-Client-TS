import { HorizonAPIClientConfig, HorizonAPIClient, Environment } from './HorizonAPIClient';
import Team from './models/Team';

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
let team: Team | null = null;
test('VCC team should be found', async () => {
  team = await apiClient.getTeam(1);
  expect(team?.id).toBe(1);
});

if (team !== null) {
  test('VCC team should have products', async () => {
    const result = await team?.getProducts();
    expect(result).toBeDefined();
    expect(result?.length).toBeGreaterThan(0);
    if (result) {
      console.log(result[0].name);
      expect(result[0].id).toBeDefined();
    }
  });
}
