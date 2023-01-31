'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('superheroes_to_superpowers', {
      id: {
       allowNull:false,
       autoIncrement: true,
       type: Sequelize.INTEGER,
       primaryKey:true
     },
     heroId:{
      field:'hero_id',
      type:Sequelize.INTEGER,
      allowNull:false,
      onDelete: 'cascade',
      references: {
        model:'superheroes',
        key:'id',
        as: heroId
      }
    },
     superpowerId:{
       field:'superpower_id',
       type:Sequelize.INTEGER,
       allowNull:false,
       references:{
         model:'superpowers',
         key:'id'
       }
     },
     createdAt: {
       field:'created_at',
       allowNull: false,
       type: Sequelize.DATE
     },
     updatedAt: {
       field: 'updated_at',
       allowNull: false,
       type: Sequelize.DATE
     }

   });
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('superheroes_to_superpowers');
  }
};
