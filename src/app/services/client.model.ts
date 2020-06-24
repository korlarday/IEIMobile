export class RegisterClient {
    constructor(
        public firstname: string,
        public lastname: string,
        public dob: string,
        public email: string,
        public phone: string,
        public state: string,
        public employer: string,
        public employer_address: string,
        public image,
        public nin: string,
    ) {}
}
