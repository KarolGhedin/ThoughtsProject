import { Sequelize } from 'sequelize';

const sequelize= new Sequelize('thoughts', 'root', 'Pitico00', {
    host: 'localhost',
    dialect: 'mysql',
});

try {
    sequelize.authenticate()
    console.log('conectado ao banco')
} catch (error) {
    console.log(`Não conectou: ${error}`)
}

export default sequelize