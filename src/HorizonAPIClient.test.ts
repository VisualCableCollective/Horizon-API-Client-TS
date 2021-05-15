import APIClient from './HorizonAPIClient';

test('basic', () => {
  const apiClient: APIClient = new APIClient();
  expect(apiClient.testVal).toBe('Test');
});
