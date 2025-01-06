import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false // not require on get user
        },
        salt: {
            type: String,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        }
    }
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUSerBySessionToken = (sessionToken: string) => UserModel.findOne({ 
    "authentication.sessionToken": sessionToken
 });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUSer = (value: Record<string, any>) => new UserModel(value).save().then((u) => u.toObject());
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id: string, value: Record<string, any>) => UserModel.findByIdAndUpdate(id, value);
