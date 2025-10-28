function getRoute(tickets = []) {
    const destinations = new Set();
    const routes = new Map();

    for (const ticket of tickets) {
        routes.set(ticket.from, ticket);

        destinations.add(ticket.to);
    }

    let start = null;
    for (const ticket of tickets) {
        if (!destinations.has(ticket.from)) {
            start = ticket.from;
        }
    }

    const route = [];

    while (routes.has(start)) {
        const nextTicket = routes.get(start);
        route.push(nextTicket);
        start = nextTicket.to;
    }

    return route;
}

console.log(
    getRoute([
        {
            from: "London",
            to: "Moscow",
        },
        {
            from: "NY",
            to: "London",
        },
        {
            from: "Moscow",
            to: "SPb",
        },
    ])
);
