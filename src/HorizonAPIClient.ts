import Config from './HorizonAPIClientConfig';

export default class HorizonAPIClient {
  testVal: String;

  config: Config = new Config();

  constructor() {
    console.log('hi');
    this.testVal = 'Test';
  }
}
