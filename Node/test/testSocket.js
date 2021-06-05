const io = require('socket.io-client');
// const ioServer = require("../socket").getIo();
const { expect } = require('chai');

const { addUser, findUser } = require('../utils/groupActions');

describe('tests for server.js file', () => {
    let clientSocket, anotherClientSocket;

    before((done) => {
        clientSocket = new io('http://localhost:8080');
        anotherClientSocket = new io('http://localhost:8080');
        clientSocket.on('connect', done);

        // done();
    });

    it('should give a users object', (done) => {
        clientSocket.emit('user-joined', { id: 1, name: 'tester' });
        clientSocket.on('user-joined-successfully', (users) => {
            expect(users).to.haveOwnProperty('tester');
            expect(users.tester.userId).equal(1);
            done();
        });
    });

    it('will emit an event with the correct online user', (done) => {
        clientSocket.emit('userConnectedToChat', { username: 'tester', id: 1 });
        clientSocket.on('currentUsers', ({ onlineUsers }) => {
            expect(onlineUsers).to.haveOwnProperty('tester');
            expect(onlineUsers.tester.userId).equal(1);
        });
        anotherClientSocket.on('userInChatIncrese', ({ onlineUsers }) => {
            expect(onlineUsers).to.haveOwnProperty('tester');
            expect(onlineUsers.tester.userId).equal(1);
            done();
        });
    });
    // { tester: { socketId: '7TrHQSGl2dk46xPFAAAE', userId: 1 } }

    after(() => {
        clientSocket.close();
        anotherClientSocket.close();
    });
});
