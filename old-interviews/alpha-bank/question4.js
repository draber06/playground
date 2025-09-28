// Implement Array.prototype.some()
// [2, 5, 8, 1, 4].some((element) => element > 10) -> false
// [12, 5, 8, 1, 4].some((element) => element > 10) -> true

Array.prototype.some(function (predicate, thisArg) {
    for (let i = 0; i < this.length; i++) {
        if (predicate.call(thisArg, this[i], i, this)) {
            return true;
        }
    }

    return false;
});
