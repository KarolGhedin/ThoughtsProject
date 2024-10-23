import { DataTypes } from "sequelize";
import db from '../db/conn.js';
import User from "./user.js";

const Thought = db.define('Thought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

Thought.belongsTo(User)
User.hasMany(Thought)

export default Thought