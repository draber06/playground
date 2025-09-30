/* eslint-disable no-var */
var a = {
    firstName: "Bill",
    lastName: "Ivanov",
    // eslint-disable-next-line func-names, object-shorthand
    sayName: function () {
        console.log(this.firstName);
    },
    sayLastName: () => {
        console.log(this.lastName);
    },
};

a.sayName(); // ?

var b = a.sayName;

b(); // ?

a.sayName.bind({ firstName: "Boris" })(); // ?

a.sayName(); // ?
a.sayLastName(); // ?

a.sayName.bind({ firstName: "Boris" }).bind({ firstName: "Tom" })(); // ?
a.sayLastName.bind({ lastName: "Petrov" })(); // ?
