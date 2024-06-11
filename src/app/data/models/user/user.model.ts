import {IUserResponseModel} from "../../response-models/user/IUser.response-model";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";

export class UserModel implements IUserResponseModel {
    public name: string | null;
    public surname: string | null;
    public email: string;
    public dateOfBirthTimestamp: number | null;
    public permanentAddress: string | null;
    public presentAddress: string | null;
    public postalCode: number | null;
    public city: string | null;
    public country: string | null;
    public notification: boolean;
    public photoURL: string | null;

    constructor(user: IUserRequestModel) {
        this.name = user.name;
        this.surname = user.surname;
        this.email = user.email;
        this.dateOfBirthTimestamp = user.dateOfBirthTimestamp;
        this.permanentAddress = user.permanentAddress;
        this.presentAddress = user.presentAddress;
        this.postalCode = user.postalCode;
        this.city = user.city;
        this.country = user.country;
        this.notification = user.notification;
        this.photoURL = user.photoURL;
    }
}
