let io;

module.exports = {
    init: (server) => {
        io = require('socket.io')(server, {
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET', 'POST'],
            },
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            console.log('failed to connect to socketIo server');
        }
        return io;
    },
};
