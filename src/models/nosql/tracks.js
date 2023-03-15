const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        album: {
            type: String,
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: {
                type: String,
            },
            nickname: {
                type: String,
            },
            nationality: {
                type: String,
            },
        },
        duration: {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });

TracksScheme.statics.findAllData = function () {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: "storages", //modelo al cual voy a relacionar
                localField: "mediaId", //propiedad del padre
                foreignField: "_id",
                as: "audio", // alias 
            },
        },
        {
            $unwind: "$audio",
        },
    ]);

    return joinData;
};

TracksScheme.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
        },
        {
            $unwind: "$audio",
        },
    ]);

    return joinData;
};

module.exports = mongoose.model("tracks", TracksScheme);
