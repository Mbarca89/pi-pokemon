const axios = require('axios');
const {API_TYPE_URL} = process.env
const { Type } = require('../db')

const getTypes = async (req, res) => {
  try {
    const { data } = await axios(API_TYPE_URL)
    const types = data.results
    await Promise.all(types.map(async (type) => {
      const { data } = await axios(type.url);
      await Type.findOrCreate({
        where: { id: data.id },
        defaults: { id: data.id, name: data.name },
      });
    }));
    return res.status(200).send('Tipos guardados en la BD')
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

module.exports = { getTypes }