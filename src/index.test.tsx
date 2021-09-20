// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
// import Team from './models/Team';
import {
  HorizonAPIClient, HorizonAPIClientConfig, Environment, LoginStatus,
} from './index';

dotenv.config();

// Config
jest.setTimeout(20000);

// Init
const apiClientConfig = new HorizonAPIClientConfig(2, 'ZmWrSAT1TURrY8skR5OjRngbYomoHyzTYG7wQYa5', Environment.LocalDevelopment);
const apiClient = new HorizonAPIClient(apiClientConfig);

// -------- AUTH TESTS --------
describe('User Authentication', () => {
  test('user should not authenticate with credentials', async (done) => {
    const result = await apiClient.authenticateUserWithCredentials('definitely_not_working', 'definitely_not_working');
    expect(result.status).toBe(LoginStatus.CredentialsInvalid);
    done();
  });

  if (process.env.TEST_USER_EMAIL && process.env.TEST_USER_PASSWORD) {
    test('user should authenticate with credentials', async (done) => {
      const result = await apiClient.authenticateUserWithCredentials(process.env.TEST_USER_EMAIL || '', process.env.TEST_USER_PASSWORD || '');
      expect(result.status).toBe(LoginStatus.Success);
      expect(result.tokenData?.access_token).toBeTruthy();
      apiClient.Config.BearerToken = result.tokenData?.access_token || '';
      done();
    });

    test('user data should be obtained', async (done) => {
      const result = await apiClient.getAuthenticatedUser(true);
      expect(result.success).toBeTruthy();
      done();
    });
  } else {
    console.warn('Skipped test for authentication with credentials: TEST_USER_EMAIL and/or TEST_USER_PASSWORD aren\'t set in the .env');
  }
});

describe('Store', () => {
  describe('Teams', () => {
    test('VCC team should be found', async (done) => {
      const response = await apiClient.getTeam(1, true);
      expect(response.success).toBeTruthy();
      done();
    });

    test('VCC team should be found with products', async (done) => {
      const response = await apiClient.getTeam(1, true);
      expect(response.success).toBeTruthy();
      expect(response.data?.products.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });
});

/* if (process.env.TEST_BEARER_TOKEN) {
  test('user should authenticate', async (done) => {
    const result = await apiClient.authenticateUserWithToken(process.env.TEST_BEARER_TOKEN || '');
    expect(result).toBe(true);
    done();
  });
} else {
  console.warn('Skipped test for correct user authentication!');
}

// -------- TEAM TESTS --------
// let team: Team;
test('VCC team should be found', async (done) => {
  const responseteam = await apiClient.getTeam(1);
  expect(responseteam).toBeDefined();
  expect(responseteam?.id).toBe(1);
  if (responseteam !== null) {
    // team = responseteam;
  }
  done();
});

/* test('VCC team should have products', async (done) => {
  const result = await team?.getProducts();
  expect(result).toBeDefined();
  expect(result?.length).toBeGreaterThan(0);
  if (result) {
    console.log(result[0].name);
    expect(result[0].id).toBeDefined();
  }
  done();
}); */
