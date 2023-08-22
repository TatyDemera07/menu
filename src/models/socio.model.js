const socios = (sequelize, type) => {
    return sequelize.define('socios', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_socio: type.STRING,
        apellidoSocio: type.STRING,
        correoElectronico: type.INTEGER,
        telefono: type.INTEGER,
        foto: type.STRING,

        createSocios: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateSocios: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = socios