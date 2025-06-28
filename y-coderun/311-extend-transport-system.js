function extendTransportSystem(EarthRoute, MoonRoute) {
    const storage = [];

    function wrapTransfer(RouteClass) {
        const originalTransfer = RouteClass.prototype.transfer;

        RouteClass.prototype.transfer = function (parcel) {
            const result = originalTransfer.call(this, parcel);
            storage.push({
                ...parcel,
                origin: parcel.destination,
                destination: "Mothership",
            });
            return result;
        };
    }
    wrapTransfer(EarthRoute);
    wrapTransfer(MoonRoute);

    return storage;
}

function extendTransportSystemProxy(EarthRoute, MoonRoute) {
    const storage = [];

    function wrapTransfer(RouteClass) {
        const originalTransfer = RouteClass.prototype.transfer;

        RouteClass.prototype.transfer = new Proxy(originalTransfer, {
            apply(target, thisArg, args) {
                const [parcel] = args;

                const result = Reflect.apply(target, thisArg, args);
                storage.push({
                    ...parcel,
                    origin: parcel.destination,
                    destination: "Mothership",
                });

                return result;
            },
        });
    }

    wrapTransfer(EarthRoute);
    wrapTransfer(MoonRoute);

    return storage;
}

class EarthRoute {
    static vault = [];

    transfer(parcel) {
        parcel.destination = "Earth";
        EarthRoute.vault.push(parcel);
    }
}

class MoonRoute {
    static warehouse = [];

    transfer(parcel) {
        parcel.destination = "Moon";
        MoonRoute.warehouse.push(parcel);
    }
}

const mothershipStorage = extendTransportSystemProxy(EarthRoute, MoonRoute);

const earthRoute1 = new EarthRoute();
const moonRoute2 = new MoonRoute();

earthRoute1.transfer({ content: 123 });
moonRoute2.transfer({ text: "abc" });

console.log(mothershipStorage);
/* [
 *   { content: 123, origin: 'Earth', destination: 'Mothership' },
 *   { text: 'abc', origin: 'Moon', destination: 'Mothership' }
 * ]
 */

console.log(EarthRoute.vault);
/* [
 *   { content: 123, destination: 'Earth' }
 * ]
 */

console.log(MoonRoute.warehouse);
/* [
 *   { text: 'abc', destination: 'Moon' }
 * ]
 */
