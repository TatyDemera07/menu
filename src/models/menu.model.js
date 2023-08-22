const menus = (sequelize, type) => {
    return sequelize.define('menus', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_menu: type.STRING,
        descripcion: type.STRING,
        precio: type.INTEGER,
        foto: type.SMALLINT,
        createMenus: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateMenus: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = menus