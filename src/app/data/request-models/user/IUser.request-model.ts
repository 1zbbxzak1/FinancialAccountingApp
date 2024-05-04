export interface IUserRequestModel {
    readonly name: string | null;
    readonly surname: string | null;
    readonly email: string;
    readonly dateOfBirthTimestamp: number | null;
    readonly permanentAddress: string | null;
    readonly presentAddress: string | null;
    readonly postalCode: number | null;
    readonly city: string | null;
    readonly country: string | null;
    readonly notification: boolean;
    readonly photoURL: string | null;
}
