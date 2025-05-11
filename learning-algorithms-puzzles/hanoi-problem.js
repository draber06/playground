function hanoiTowers(n, fromPeg, toPeg) {
    if (n === 1) {
        // console.log(`Move disk 1 from ${fromPeg} to ${toPeg}`);
        return;
    }
    const unusedPeg = 6 - fromPeg - toPeg;
    hanoiTowers(n - 1, fromPeg, unusedPeg);
    // console.log(`Move disk ${n} from ${fromPeg} to ${toPeg}`);
    hanoiTowers(n - 1, unusedPeg, toPeg);
}

hanoiTowers(3, 1, 3);
