import { DataTypes } from "sequelize";
import db from '../db/conn.js';

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        require: true,
    },
    password: {
        type: DataTypes.STRING,
        require: true,
    }
})

export default User