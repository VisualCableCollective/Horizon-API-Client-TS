export class TokenResponse {
  token_type: string;

  expires_in: number;

  access_token: string;

  refresh_token: string;

  constructor(jsonData: any) {
    this.token_type = jsonData.token_type;
    this.expires_in = jsonData.expires_in;
    this.access_token = jsonData.access_token;
    this.refresh_token = jsonData.refresh_token;
  }
}
