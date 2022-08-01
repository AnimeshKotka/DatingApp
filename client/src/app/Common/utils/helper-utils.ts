import { UserModel } from "src/app/models";

export default class HelperUtils {

  public static isTokenValid(user: UserModel) {
    if (user) {
      return Math.floor(new Date().getTime() / 1000) <= (JSON.parse(atob(user.token.split('.')[1])).exp);
    } else {
      return null;
    }
  }

  public static getExpiryDate(user: UserModel): number {
    return JSON.parse(atob(user.token.split('.')[1])).exp;
  }

}
