'use strict';
const { Band, Instrument, Musician } = require('../models')
const bandMusicians = [
  {
    name: "The Falling Box",
    musicians: [
      { firstName: "Adam", lastName: "Appleby" },
      { firstName: "Anton", lastName: "Martinovic" },
      { firstName: "Wilson", lastName: "Holt" }
    ],
  },
  {
    name: "America The Piano",
    musicians: [
      {firstName: "Marine", lastName: "Sweet"},
      {firstName: "Georgette", lastName: "Kubo"}
    ]
  },
  {
    name: "Loved Autumn",
    musicians: [
      {firstName: "Aurora", lastName: "Hase"}
    ]
  },
  {
    name: "Playin Sound",
    musicians: [
      {firstName: "Trenton", lastName: "Lesley"},
      { firstName: "Camila", lastName: "Nenci"}
    ]
  },
  {
    name: "The King River",
    musicians: [
      {firstName: "Rosemarie", lastName: "Affini"},
      {firstName: "Victoria", lastName: "Cremonesi"}
    ]
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    
    for(let i = 0; i < bandMusicians.length; i++){
      const {name, musicians} = bandMusicians[i];
      const band = await Band.findOne({where: {name}});

      for(let j = 0; j < musicians.length; j++){
        const musician = musicians[j]
         await band.createMusician(musicians[j])
      }
    } 
  },

  down: async (queryInterface, Sequelize) => {
    
    for(let i = 0; i < bandMusicians.length; i++){
      const { name, musicians } = bandMusicians[i];
      const band = await Band.findOne({where: {name}});

      for(let j = 0; j > musicians.length; j++){
        const member = musicians[j];

        await Musician.destroy({where: {...member, bandId: band.id}})
      }
    }

  }
};
