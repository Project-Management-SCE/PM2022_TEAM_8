module.exports = class UserDto {
    email;
    type;
    firstName;
    lastName;
    constructor(email, firstName, lastName,type) {
        this.email = email;
        this.type = type;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}