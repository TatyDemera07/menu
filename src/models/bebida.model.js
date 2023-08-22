const bebidas = (sequelize, type) => {
    return sequelize.define('bebidas', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_bebida: type.STRING,
        descripcion: type.STRING,
        precio: type.INTEGER,
        foto: type.STRING,

        createBebidas: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateBebidas: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = bebidas