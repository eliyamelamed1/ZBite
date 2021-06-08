const { expect } = require("chai");
const roomActions = require("../utils/roomActions");

describe("test main room functonallity", () => {
  it("will create new user", () => {
    const users = roomActions.addUser(1, 123, "tester");
    expect(users).haveOwnProperty("tester");
    expect(users.tester.userId).equal(1);
    expect(users.tester.socketId).equal(123);
    expect(users.tester.inChat).equal(false);
  });

  it("will replace user with duplicate name and different id", () => {
    roomActions.addUser(1, 123, "tester");
    const users = roomActions.addUser(2, 123, "tester");
    expect(users).haveOwnProperty("tester");
    expect(users.tester.userId).not.equal(1);
    expect(users.tester.userId).equal(2);
    expect(users.tester.socketId).equal(123);
    expect(users.tester.inChat).equal(false);
  });

  it("will replace user with duplicate name and different sockets id's", () => {
    roomActions.addUser(1, 123, "tester");
    const users = roomActions.addUser(1, 1234, "tester");
    expect(users).haveOwnProperty("tester");
    expect(users.tester.userId).equal(1);
    expect(users.tester.socketId).not.equal(123);
    expect(users.tester.socketId).equal(1234);
    expect(users.tester.inChat).equal(false);
  });

  it("will work same with multiple users", () => {
    roomActions.addUser(1, 123, "tester");
    const users = roomActions.addUser(2, 1234, "tester2");
    expect(users).haveOwnProperty("tester");
    expect(users.tester.userId).equal(1);
    expect(users.tester.socketId).equal(123);
    expect(users.tester.inChat).equal(false);
    expect(users).haveOwnProperty("tester2");
    expect(users.tester2.userId).equal(2);
    expect(users.tester2.socketId).equal(1234);
    expect(users.tester2.inChat).equal(false);
  });

  it("will delete only one user", () => {
    roomActions.addUser(1, 123, "tester");
    const users = roomActions.addUser(2, 1234, "tester2");
    roomActions.removeUser("tester");

    expect(users).to.not.haveOwnProperty("tester");
    expect(users).haveOwnProperty("tester2");

    roomActions.removeUser("tester2");

    expect(users).to.not.haveOwnProperty("tester2");
  });

  it("will find the correct users", () => {
    roomActions.addUser(1, 123, "tester");
    roomActions.addUser(2, 1234, "tester2");

    const user1 = roomActions.findUser("tester");
    const user2 = roomActions.findUser("tester2");
    const fakeUser = roomActions.findUser("fake");

    expect(user1.userId).equal(1);
    expect(user1.socketId).equal(123);
    expect(user1.inChat).equal(false);

    expect(user2.userId).equal(2);
    expect(user2.socketId).equal(1234);
    expect(user2.inChat).equal(false);

    expect(fakeUser).equal(undefined);
  });

  afterEach(() => {
    roomActions.removeAllUsers();
  });
});

describe("test chat room functonallity", () => {
  beforeEach(() => {
    roomActions.addUser(1, 123, "tester");
    roomActions.addUser(2, 1234, "tester2");
  });

  it("will change 'inChat' property to true", () => {
    roomActions.addUserToChatRoom(1, 123, "tester");
    const users = roomActions.getAllUsers();

    expect(users.tester.inChat).equal(true);
    expect(users.tester2.inChat).equal(false);
  });

  it("will return error if user not exist", () => {
    const error1 = roomActions.addUserToChatRoom(1, 123, "fakeName");
    const error2 = roomActions.addUserToChatRoom("fake userId", 123, "tester");
    const error3 = roomActions.addUserToChatRoom(1, "fake socketId", "tester");

    const users = roomActions.getAllUsers();

    expect(error1.error).equal("Adding user to chat failed");
    expect(error2.error).equal("Adding user to chat failed");
    expect(error3.error).equal("Adding user to chat failed");

    expect(users.tester.inChat).equal(false);
  });

  it("will change 'inChat' property to false", () => {
    roomActions.addUserToChatRoom(1, 123, "tester");
    roomActions.addUserToChatRoom(2, 1234, "tester2");

    roomActions.removeUserFromChatRoom("tester");

    const users = roomActions.getAllUsers();

    expect(users.tester.inChat).equal(false);
    expect(users.tester2.inChat).equal(true);
  });

  it("will return error if user is not in chat", () => {
    roomActions.addUserToChatRoom(1, 123, "tester");

    const nothing = roomActions.removeUserFromChatRoom("tester");
    const error = roomActions.removeUserFromChatRoom("tester");
    const error2 = roomActions.removeUserFromChatRoom("fakeUser");

    expect(nothing).equal(undefined);
    expect(error.error).equal("Removing user to chat failed");
    expect(error2.error).equal("Removing user to chat failed");
  });

  it("will find the users in chat", () => {
    roomActions.addUserToChatRoom(1, 123, "tester");
    const onlineUsers = roomActions.findOnlineUsers();

    expect(onlineUsers).haveOwnProperty("tester");
    expect(onlineUsers.tester.userId).equal(1);
    expect(onlineUsers.tester.socketId).equal(123);
    expect(onlineUsers).to.not.haveOwnProperty("tester2");

    roomActions.addUserToChatRoom(2, 1234, "tester2");
    const onlineUsers2 = roomActions.findOnlineUsers();

    expect(onlineUsers2).haveOwnProperty("tester2");
  });

  afterEach(() => {
    roomActions.removeAllUsers();
  });
});
