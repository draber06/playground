// on, off, emit - EventEmitter

class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(listener);
    }

    off(event, listener) {
        if (!this.#events.has(event)) return;

        this.#events.set(
            event,
            this.#events.get(event).filter(h => h !== listener)
        );
    }

    emit(event, data) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(listener => listener(data));
        }
    }

    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper);
        };

        this.on(event, wrapper);
    }
}
