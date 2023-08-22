const platillos = (sequelize, type) => {
    return sequelize.define('platillos', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_platillo: type.STRING,
        descripcion: type.STRING,
        precio: type.INTEGER,
        foto: type.STRING,
        createPlatillos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatePlatillos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = platillos