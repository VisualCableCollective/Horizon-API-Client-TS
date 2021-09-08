import { Environment } from './enums/Environment';
import { HorizonAPIClientConfig, HorizonAPIClient, Team } from './index';

require('dotenv').config();

// Init
const apiClientConfig = new HorizonAPIClientConfig(Environment.LocalDevelopment);
HorizonAPIClient.Config = apiClientConfig;

// -------- AUTH TESTS --------
test('user should not authenticate', async (done) => {
  const result = await HorizonAPIClient.authenticateUserWithToken('definitely_not_working_token');
  expect(result).toBe(false);
  done();
});

if (process.env.TEST_BEARER_TOKEN) {
  test('user should authenticate', async (done) => {
    const result = await HorizonAPIClient.authenticateUserWithToken(process.env.TEST_BEARER_TOKEN || '');
    expect(result).toBe(true);
    done();
  });
}

// -------- TEAM TESTS --------
let team: Team;
test('VCC team should be found', async (done) => {
  const responseteam = await HorizonAPIClient.getTeam(1);
  expect(responseteam).toBeDefined();
  expect(responseteam?.id).toBe(1);
  if (responseteam !== null) {
    team = responseteam;
  }
  done();
});

test('VCC team should have products', async (done) => {
  const result = await team?.getProducts();
  expect(result).toBeDefined();
  expect(result?.length).toBeGreaterThan(0);
  if (result) {
    console.log(result[0].name);
    expect(result[0].id).toBeDefined();
  }
  done();
});
