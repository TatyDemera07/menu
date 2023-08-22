const dulces = (sequelize, type) => {
    return sequelize.define('dulces', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_dulce: type.STRING,
        descripcion: type.STRING,
        precio: type.INTEGER,
        foto: type.STRING,
        createDulces: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateDulces: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = dulces