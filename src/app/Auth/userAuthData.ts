export class UserAuthData {
  constructor(
      private pin: string,
      public firstname: string,
      public lastname: string,
      private token: string,
      private tokenExpirationDate: Date
    ) {}


    get _token() {
      // if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      //   return null;
      // }
      return this.token;
    }

    get _pin() {
      if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
        return null;
      }
      return this.pin;
    }

    get tokenDuration() {
      if (!this.token) {
        return 0;
      }
      return this.tokenExpirationDate.getTime() - new Date().getTime();
    }
}
