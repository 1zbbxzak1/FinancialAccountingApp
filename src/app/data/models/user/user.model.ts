import {IUserResponseModel} from "../../response-models/user/IUser.response-model";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";

export class UserModel implements IUserResponseModel {
    public name: string;
    public surname: string;
    public dateOfBirthTimestamp: number;
    public permanentAddress: string;
    public presentAddress: string;
    public postalCode: number;
    public city: string;
    public country: string;
    public notification: boolean;

    constructor(user: IUserRequestModel) {
        this.name = user.name;
        this.surname = user.surname;
        this.dateOfBirthTimestamp = user.dateOfBirthTimestamp;
        this.permanentAddress = user.permanentAddress;
        this.presentAddress = user.presentAddress;
        this.postalCode = user.postalCode;
        this.city = user.city;
        this.country = user.country;
        this.notification = user.notification;
    }
}
