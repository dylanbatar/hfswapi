const fetch = require('node-fetch');

const getWeightOnPlanet = (mass, gravity) => {
  return mass * gravity;
};

const genericRequest = async (url, method, body, logging = false) => {
  let options = {
    method: method,
  };
  if (body) {
    options.body = body;
  }
  const response = await fetch(url, options);
  const data = await response.json();
  if (logging) {
    console.log(data);
  }
  return data;
};

const getRandomNumber = (maxLength) => {
  return Math.floor(Math.random() * (maxLength - 1 + 1)) + 1;
};

module.exports = {
  getWeightOnPlanet,
  genericRequest,
  getRandomNumber,
};
