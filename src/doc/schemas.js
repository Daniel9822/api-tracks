const track = {
    type: "object",
    required: ["name", "mediaId"],
    properties: {
        name: {
            type: "string",
        },
        album: {
            type: "string",
        },
        cover: {
            type: "string",
        },
        artist: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                nickname: {
                    type: "string",
                },
                nationality: {
                    type: "string",
                },
            },
        },
        duration: {
            type: "object",
            properties: {
                start: {
                    type: "integer",
                },
                end: {
                    type: "integer",
                },
            },
        },
        mediaId: {
            type: "string",
        },
    },
};

const storage = {
    type: "object",
    required: ["url", "filename"],
    properties: {
        url: {
            type: "string",
        },
        filename: {
            type: "string",
        },
    },
};

const authRegister = {
    type: "object",
    required: ["name", "age", "email", "password"],
    properties: {
        name: {
            type: "string",
        },
        age: {
            type: "integer",
        },
        email: {
            type: "string",
            unique: "true",
            format: "email",
        },
        password: {
            type: "string",
        },
    },
};

const authLogin = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
        },
        password: {
            type: "string",
        },
    },
};

module.exports = { track, storage, authRegister, authLogin };
