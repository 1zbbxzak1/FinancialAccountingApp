import {UserModel} from "../../models/user/user.model";

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

export function UserModelToIUserRequestModel(user: UserModel): IUserRequestModel {
    return {
        name: user.name,
        surname: user.surname,
        email: user.email,
        dateOfBirthTimestamp: user.dateOfBirthTimestamp,
        permanentAddress: user.permanentAddress,
        presentAddress: user.presentAddress,
        postalCode: user.postalCode,
        city: user.city,
        country: user.country,
        notification: user.notification,
        photoURL: user.photoURL,
    };
}

export function ParamsToIUserRequestModel(email: string, notification: boolean, name: string | null = null, surname: string | null = null,
      dateOfBirthTimestamp: number | null = null, permanentAddress: string | null = null, presentAddress: string | null = null,
      postalCode: number | null = null, city: string | null = null, country: string | null = null,
      photoURL: string | null = null): IUserRequestModel {

    return {
        name: name,
        surname: surname,
        email: email,
        dateOfBirthTimestamp: dateOfBirthTimestamp,
        permanentAddress: permanentAddress,
        presentAddress: presentAddress,
        postalCode: postalCode,
        city: city,
        country: country,
        notification: notification,
        photoURL: photoURL,
    };
}
