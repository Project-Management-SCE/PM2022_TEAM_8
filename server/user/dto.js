module.exports = class UserDto {
    email;
    type;
    firstName;
    lastName;
    address;
    phone;
    constructor(email, firstName, lastName, type, address, phone) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.address = address;
        this.phone = phone;
    }
}