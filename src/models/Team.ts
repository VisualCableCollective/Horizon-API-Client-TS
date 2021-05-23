export default class Team {
  id: number;
  name: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(apiTeamResponse: any) {
    this.id = apiTeamResponse.id;
    this.name = apiTeamResponse.name;

    this.createdAt = new Date(apiTeamResponse.created_at);
    this.updatedAt = new Date(apiTeamResponse.updated_at);
  }
}
