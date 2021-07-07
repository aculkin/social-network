'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        userName: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        salt: {
          type: Sequelize.STRING,
        },
        bio: {
          type: Sequelize.TEXT,
        },
        googleId: {
          type: Sequelize.STRING,
        },
        resetPasswordToken: {
          type: Sequelize.STRING,
        },
        resetPasswordExpires: {
          type: Sequelize.DATE,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        engine: 'PostgreSQL',
        paranoid: true,
      }
    )
    await queryInterface.createTable(
      'friends',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        approved: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        friendId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        engine: 'PostgreSQL',
        paranoid: true,
      }
    )
    await queryInterface.createTable(
      'posts',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        text: {
          type: Sequelize.TEXT,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        engine: 'PostgreSQL',
        paranoid: true,
      }
    )
    await queryInterface.createTable(
      'comments',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        text: {
          type: Sequelize.TEXT,
        },
        postId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'posts',
            key: 'id',
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        engine: 'PostgreSQL',
        paranoid: true,
      }
    )
    return queryInterface.createTable(
      'reactions',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: Sequelize.ENUM(
            'Like',
            'Love',
            'Dislike',
            'Congratulations',
            'Think'
          ),
          allowNull: false,
        },
        postId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'posts',
            key: 'id',
          },
        },
        commentId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'comments',
            key: 'id',
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        engine: 'PostgreSQL',
        paranoid: true,
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('posts')
    await queryInterface.dropTable('comments')
    await queryInterface.dropTable('reactions')
    return queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_reactions_type";'
    )
  },
}
