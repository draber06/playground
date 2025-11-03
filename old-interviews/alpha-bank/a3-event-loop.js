console.log("start"); //

setTimeout(() => console.log("timeout"), 0); //

new Promise((resolve, reject) => {
    console.log("promise constructor"); //

    reject();
})
    .then(() => console.log("promise"))
    .catch(() => console.log("promise1"))
    .catch(() => console.log("promise2"))
    .then(() => console.log("promise3"))
    .then(() => console.log("promise4"));

console.log("final");

// start,
// microtasks - []
// macrotasks - []

// start,
// microtasks - []
// macrotasks - [timeout]

// start -> promise constructor
// microtasks - []
// macrotasks - [timeout]

// start -> promise constructor
// microtasks - [promise1]
// macrotasks - [timeout]

// start -> promise constructor -> final
// microtasks - [promise1]
// macrotasks - [timeout]

// start -> promise constructor -> final -> promise1
// microtasks - [promise3]
// macrotasks - [timeout]

// start -> promise constructor -> final -> promise1 -> promise3
// microtasks - [promise4]
// macrotasks - [timeout]

// start -> promise constructor -> final -> promise1 -> promise3 -> promise4
// microtasks - []
// macrotasks - [timeout]

// start -> promise constructor -> final -> promise1 -> promise3 -> promise4 -> timeout
// microtasks - []
// macrotasks - []
