export interface IUserRequestModel {
    readonly name: string;
    readonly surname: string;
    readonly dateOfBirthTimestamp: number;
    readonly permanentAddress: string;
    readonly presentAddress: string;
    readonly postalCode: number;
    readonly city: string;
    readonly country: string;
    readonly notification: boolean;
}
