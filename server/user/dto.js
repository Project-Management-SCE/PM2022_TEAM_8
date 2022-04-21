module.exports = class UserDto {
    id;
    email;
    isBlocked;
    type;
    firstName;
    lastName;
    address;
    phone;
    constructor(id, email, isBlocked, firstName, lastName, type, address, phone) {
        this.id = id;
        this.email = email;
        this.isBlocked = isBlocked;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.address = address;
        this.phone = phone;
    }
}