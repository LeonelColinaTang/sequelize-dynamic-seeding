'use strict';
const { Musician, Instrument } = require('../models');

const MusicianInstruments = [
  {
    musician: { firstName: "Adam", lastName: "Appleby" },
    instruments: [{ type: "piano" }, { type: "guitar" }]
  },
  {
    musician: { firstName: "Anton", lastName: "Martinovic" },
    instruments: [{ type: "piano" }, { type: "bass" }]
  },
  {
    musician: { firstName: "Wilson", lastName: "Holt" },
    instruments: [{ type: "cello" }]
  },
  {
    musician: { firstName: "Marine", lastName: "Sweet" },
    instruments: [{ type: "saxophone" }]
  },
  {
    musician: { firstName: "Georgette", lastName: "Kubo" },
    instruments: [
      { type: "drums" },
      { type: "trumpet" },
      { type: "saxophone" },
    ]
  },
  {
    musician: { firstName: "Aurora", lastName: "Hase" },
    instruments: [{ type: "violin" }, { type: "cello" }]
  },
  {
    musician: { firstName: "Trenton", lastName: "Lesley" },
    instruments: [{ type: "piano" }]
  },
  {
    musician: { firstName: "Camila", lastName: "Nenci" },
    instruments: [{ type: "piano" }]
  },
  {
    musician: { firstName: "Rosemarie", lastName: "Affini" },
    instruments: [{ type: "piano" }, { type: "violin" }]
  },
  {
    musician: { firstName: "Victoria", lastName: "Cremonesi" },
    instruments: [
      { type: "violin" }
    ]
  },
];




module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    for(let i = 0; i < MusicianInstruments.length; i++){
      const {musician, instruments} = MusicianInstruments[i];

      const music = await Musician.findOne({where: {musician}})
      const tools = await Instrument.findAll({where:{$or: instruments}})
      
      await music.addInstruments(tools)
      
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let i = 0; i < MusicianInstruments.length; i++) {
      const { musician, instruments } = MusicianInstruments[i];

      const music = await Musician.findOne({ where: { musician } });
      const tools = await Instrument.findAll({ where: { $or: instruments } });

      await music.remvoveInstruments(tools);
    }
  }
};
