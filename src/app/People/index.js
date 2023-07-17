const WookieePeople = require("./wookieePeople")
const CommonPeople = require('./commonPeople');

const peopleFactory = async (id, repository, requestHandler, wookieeLang) => {
  let people = null;
  if (wookieeLang) {
    people = new WookieePeople(id, requestHandler);
  } else {
    people = new CommonPeople(id, repository, requestHandler);
  }
  await people.init();
  return people;
};

module.exports = { peopleFactory };
