// on, off, emit - EventEmitter

class EventEmitter {
    events = new Map();

    constructor() {}

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);

        return this
    }

    off(event, listener) {
        const listeners = this.events.get(event)
        if(!listeners) return this

        const remainingListeners = listeners.filter(l => l !== listener);
        if (remainingListeners.length === 0) {
            this.events.delete(event);
        } else {
            this.events.set(event, remainingListeners);
        }

        return this
    }

    emit(event, ...args) {
        const listeners = this.events.has(event)
        if (!listeners) return false;

        this.events.get(event).forEach(listener => listener(...args));

        return true;
    }
}
