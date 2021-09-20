import { Team } from '..';
/**
 * Represents the logged-in user.
 */
export declare class SelfUser {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly email_verified_at?: Date;
    readonly created_at: Date;
    readonly updated_at?: Date;
    readonly teams: Team[];
    constructor(apiUserResponse: any);
}
