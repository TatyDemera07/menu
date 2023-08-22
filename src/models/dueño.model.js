const dueños = (sequelize, type) => {
    return sequelize.define('dueños', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_dueño: type.STRING,
        apellido_dueño: type.STRING,
        correo_electronico: type.INTEGER,
        telefono: type.INTEGER,
        foto: type.STRING,
        createDueños: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateDueños: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = dueños