const porciones = (sequelize, type) => {
    return sequelize.define('porciones', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_porcion: type.STRING,
        descripcion: type.STRING,
        precio: type.INTEGER,
        foto: type.STRING,
        createPorciones: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatePorciones: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = porciones