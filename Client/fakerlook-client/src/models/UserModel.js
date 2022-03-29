class User {
    constructor(firstName, lastName, email, address, birthDate, job, password, picture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.birthDate = birthDate;
        this.job = job;
        this.password = password;
        this.picture = picture;
    }

    validate() {
        if (this.firstName.length === 0)
            return [false, 'First Name Cannot Be Empty!'];

        if (this.lastName.length === 0)
            return [false, 'Last Name Cannot Be Empty!'];

        if (this.email.length === 0)
            return [false, 'Email Cannot Be Empty!'];

        if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.email)))
            return [false, 'Invalid Email Address!'];

        if (this.address.length === 0)
            return [false, 'Address Cannot Be Empty!'];

        if (this.birthDate.length === 0)
            return [false, 'Birth Date Cannot Be Empty!'];

        if (this.job.length === 0)
            return [false, 'Job Cannot Be Empty!'];

        if (this.password.length === 0)
            return [false, 'Password Cannot Be Empty!'];

        if (!this.picture)
            return [false, "Must Upload A Picture!"];

        return [true, ''];
    }
}

export default User;