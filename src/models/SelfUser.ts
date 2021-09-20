import { Team } from '..';

/**
 * Represents the logged-in user.
 */
export class SelfUser {
  readonly id: number;

  readonly name: string;

  readonly email: string;

  readonly email_verified_at?: Date;

  readonly created_at: Date;

  readonly updated_at?: Date;

  readonly teams: Team[] = [];

  constructor(apiUserResponse: any) {
    this.id = apiUserResponse.id;
    this.name = apiUserResponse.name;
    this.email = apiUserResponse.email;
    if (apiUserResponse.email_verified_at) {
      this.email_verified_at = new Date(apiUserResponse.email_verified_at);
    }
    this.created_at = new Date(apiUserResponse.created_at);
    this.updated_at = new Date(apiUserResponse.updated_at);

    if (apiUserResponse.teams) {
      apiUserResponse.teams.forEach((jsonTeamData: any) => {
        this.teams.push(new Team(jsonTeamData));
      });
    }
  }
}
