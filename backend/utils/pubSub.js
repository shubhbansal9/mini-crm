const { EventEmitter } = require('events');

const pubSub = new EventEmitter();

// Subscribe to a topic
pubSub.subscribe = (topic, listener) => {
    pubSub.on(topic, listener);
};

// Publish to a topic
pubSub.publish = (topic, message) => {
    pubSub.emit(topic, message);
};

module.exports = pubSub;
