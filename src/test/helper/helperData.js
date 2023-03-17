const authRegister = {
    name: "test",
    age: 20,
    email: "test@test.com",
    password: "",
};
const authRegisterSuccess = {
    name: "test",
    age: 20,
    email: "test@test.com",
    password: "123456",
};

const loginUser = {
    email: "test@test.com",
    password: "123456",
};

const userNotExistLogin = {
    email: "notexist@test.com",
    password: "123456",
};

const testStorageRegister = {
    url: "http://localhost:3001/file-test.mp3",
    filename: "file-test.mp3",
};


const testDataTrack = {
    name: "Ejemplo",
    album: "Ejemplo",
    cover: "http://image.com",
    artist: {
      name: "Ejemplo",
      nickname: "Ejemplo",
      nationality: "DO",
    },
    duration: {
      start: 1,
      end: 3,
    },
    mediaId: "",
  };

module.exports = {
    authRegister,
    authRegisterSuccess,
    loginUser,
    userNotExistLogin,
    testStorageRegister,
    testDataTrack
};
