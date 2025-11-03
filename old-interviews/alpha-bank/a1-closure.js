//  Что увидим в консоли?

// eslint-disable-next-line no-var
var value = 2;
function showValue() {
    console.log(`showValue ${value}`); //
}

function wrapper() {
    // eslint-disable-next-line no-var, no-shadow
    var value = 3;
    console.log(`wrapper ${value}`); //
    showValue();
}

wrapper();

// wrapper 3
// wrapper 2
