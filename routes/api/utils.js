const axios = require("axios");

const lookupByEmailURL = "https://slack.com/api/users.lookupByEmail";
const IMOpenURL = "https://slack.com/api/im.open";
const messageURL = "https://slack.com/api/chat.postMessage";

function lookupByEmail(slug) {
  if (!slug) {
    return;
  }
  const email = slug + "@media.ucla.edu";
  const endpoint = `${lookupByEmailURL}?token=${process.env.CLIENT_TOKEN}&email=${email}`;
  return axios.get(endpoint).then(res => {
    if (res.data.ok) {
      return res.data.user.id;
    } else {
      return undefined;
    }
  })
}

function getDMID(userID) {
  const endpoint = `${IMOpenURL}?token=${process.env.BOT_TOKEN}&user=${userID}`;
  return axios.get(endpoint).then(res => {
    if (res.data.ok) {
      return res.data.channel.id;
    }
    return undefined;
  });
}

function sendMessageTo(ID, text) {
  const endpoint = encodeURI(`${messageURL}?token=${process.env.BOT_TOKEN}&channel=${ID}&text=${text}`);
  return axios.get(endpoint).then(res => {
    console.log(res.data);
    if (res.data.ok) {
      return true;
    }
    return false;
  });
}

module.exports = {
  lookupByEmail,
  getDMID,
  sendMessageTo
}