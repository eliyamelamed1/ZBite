const io = require('socket.io-client');
const { expect } = require('chai');

const { findUser } = require('../utils/roomActions');

describe('testing useres connection and diconection to server', () => {
    let clientSocket, anotherClientSocket;

    before((done) => {
        clientSocket = new io('http://localhost:8080');
        anotherClientSocket = new io('http://localhost:8080');
        clientSocket.on('connect', () => {
            anotherClientSocket.on('connect', done);
        });
    });

    it('should give a users object', (done) => {
        clientSocket.emit('user-joined', { id: 1, name: 'tester' });
        clientSocket.on('user-joined-successfully', (users) => {
            expect(users).to.haveOwnProperty('tester');
            expect(users.tester.userId).equal(1);
            done();
        });
    });

    it('will disconnect a user when emiting it', () => {
        anotherClientSocket.emit('user-joined', { id: 2, name: 'tester2' });

        anotherClientSocket.on('user-joined-successfully', (_) => {
            const result2 = findUser('tester2');
            expect(result2.userId).equal(2);

            anotherClientSocket.emit('user-disconnected');

            anotherClientSocket.on('userDisconnected', () => {
                const result1 = findUser('tester');
                expect(result1).equal(undefined);
            });
        });
    });

    afterEach(() => {
        clientSocket.emit('disconnectAllUsers');
        anotherClientSocket.emit('disconnectAllUsers');
        clientSocket.close();
        anotherClientSocket.close();
    });
});

describe('testing useres connection and diconection to chat', () => {
    let clientSocket, anotherClientSocket;

    //userConnectedToChat
    beforeEach((done) => {
        clientSocket = new io('http://localhost:8080');
        anotherClientSocket = new io('http://localhost:8080');
        clientSocket.emit('user-joined', { id: 1, name: 'tester' });
        done();
    });

    it('will emit an event with the correct online user', (done) => {
        clientSocket.emit('userConnectedToChat', { username: 'tester', id: 1 });
        clientSocket.on('userInChatIncrese', ({ onlineUsers }) => {
            //shouldnt enter this event
            expect(1).equal(2);
        });
        clientSocket.on('currentUsers', ({ onlineUsers }) => {
            expect(onlineUsers).to.haveOwnProperty('tester');
            expect(onlineUsers.tester.userId).equal(1);
            expect(onlineUsers.tester.inChat).equal(true);
            done();
        });
    });

    it('will send onlineUsers to all boardcast sockets', (done) => {
        clientSocket.emit('userConnectedToChat', { username: 'tester', id: 1 });
        anotherClientSocket.on('userInChatIncrese', ({ onlineUsers }) => {
            expect(onlineUsers).to.haveOwnProperty('tester');
            expect(onlineUsers.tester.userId).equal(1);
            expect(onlineUsers.tester.inChat).equal(true);
            done();
        });
    });

    it('will decrese the online users if "userDisconectedFromChat" event was emited', (done) => {
        clientSocket.emit('userConnectedToChat', { username: 'tester', id: 1 });
        anotherClientSocket.on('userInChatIncrese', ({ onlineUsers }) => {
            expect(onlineUsers).to.haveOwnProperty('tester');
        });
        clientSocket.emit('userDisconectedFromChat', { username: 'tester' });
        anotherClientSocket.on('userInChatDicrese', ({ onlineUsers }) => {
            expect(onlineUsers).to.not.haveOwnProperty('tester');
            done();
        });
    });

    afterEach(() => {
        clientSocket.emit('userDisconectedFromChat', { username: 'tester' });
        clientSocket.emit('user-disconnected');
        clientSocket.emit('disconnectAllUsers');
        anotherClientSocket.emit('disconnectAllUsers');
        clientSocket.close();
        anotherClientSocket.close();
    });
});

describe('sockets messages  tests', () => {
    let clientSocket, anotherClientSocket;

    beforeEach((done) => {
        clientSocket = new io('http://localhost:8080');
        clientSocket.emit('user-joined', { id: 1, name: 'tester1' });

        anotherClientSocket = new io('http://localhost:8080');
        anotherClientSocket.emit('user-joined', { id: 2, name: 'tester2' });
        anotherClientSocket.on('user-joined-successfully', (_) => {
            done();
        });
    });

    it('will send message from sender to receiver', (done) => {
        clientSocket.emit('new-message', {
            sender: 'tester1',
            receiver: 'tester2',
            text: 'test',
        });

        clientSocket.on('message-received', ({ sender, text }) => {
            //should never enter this event
            expect(1).equal(2);
        });
        anotherClientSocket.on('message-received', ({ sender, text }) => {
            expect(sender).equal('tester1');
            expect(text).equal('test');
            done();
        });
    });

    afterEach(() => {
        clientSocket.close();
        anotherClientSocket.close();
    });
});
