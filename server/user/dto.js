module.exports = class UserDto {
    email;
    type;
    firstName;
    lastName;
    constructor(email, type, firstName, lastName) {
        this.email = email;
        this.type = type;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}