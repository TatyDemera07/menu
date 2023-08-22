const restaurantes = (sequelize, type) => {
    return sequelize.define('restaurantes', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_restaurante: type.STRING,
        descripcion: type.STRING,
        telefono: type.INTEGER,
        foto: type.STRING,

        createRestaurante: {

            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateRestaurante: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = restaurantes