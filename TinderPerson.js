import mongoose from "mongoose";

const TinderPerson = mongoose.Schema({
    personName: String,
    personImage: String,
});

export default mongoose.model("TinderPerson", TinderPerson);