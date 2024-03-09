import * as mongoose from "mongoose";

const validateRole = (value: string) => {
  return value === 'admin' || value === 'user';
};

export const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  role: {
    type: String,
    default: 'user',
    validate: { validator: validateRole, message: 'Role must be either "admin" or "user"' }
  }
})