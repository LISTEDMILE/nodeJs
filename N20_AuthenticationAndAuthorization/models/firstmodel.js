
const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
    houseName: {
        type: String,
        required:true
    },
    housePrice: {
        type: Number,
        required:true
    },
    houseLocation: {
        type: String,
        required:true
    },
    houseOwnerEmail: {
        type: String,
        required:true
    },
    houseOwnerMobile: {
        type: Number,
        required:true
    },
    description: String
});



// homeSchema.pre('findOneAndDelete', async function (next) {
//     const homeId = this.getQuery()._id;
//     await Favourites.deleteMany({ homeId: homeId });
//     next();
// })

module.exports = mongoose.model('Home', homeSchema);








