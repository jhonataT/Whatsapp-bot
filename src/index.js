const venom = require("venom-bot");

const banco = require("./banco");
const filt = require("./filters");
const voting = require("./voting");

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (message.isMedia === false) {
      msg = message.body.toLowerCase();
      // register members group:
      const members = await client.getGroupMembersIds(message.from);
      for (let i = 0; i < members.length; i++) {
        registerUser(members[i]._serialized);
      }
      banco[message.author].name = message.sender.pushname;

      // first, filter function:

      let phrase = filt(msg, message.sender.pushname);
      if (phrase != null) client.sendText(message.from, phrase);

      // Others functions:

      if (msg.indexOf("!on") != -1) {
        console.log("ON");
        banco[message.author].status = "[ ON ]";
      } else if (msg.indexOf("!off") != -1) {
        console.log("OFF");
        banco[message.author].status = "[ OFF ]";
      } else if (msg.indexOf("!statusm") != -1) {
        console.log("statusM");
        client
          .sendText(
            message.from,
            `[${message.sender.pushname}] está: ${banco[message.author].status}`
          )
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      } else if (msg.indexOf("!statusa") != -1) {
        console.log("All Status");
        for (let i = 0; i < members.length; i++) {
          if (banco[members[i]._serialized].name != undefined) {
            let position = members[i]._serialized;
            client.sendText(
              message.from,
              `[${banco[position].name}] está: ${banco[position].status}\n\n`
            );
          }
        }
      } else if (msg.indexOf("!yall") != -1) {
        console.log("!yall");
        banco[message.sender.id].all = true;
      } else if (msg.indexOf("!nall") != -1) {
        console.log("!nall");
        banco[message.sender.id].all = false;
      } else if (msg.indexOf("!all") != -1) {
        console.log("!all");
        for (let i = 0; i < members.length; i++) {
          console.log("ENTRY ALL");
          if (
            banco[members[i]._serialized].name != undefined &&
            banco[members[i]._serialized].all != false
          ) {
            client.sendMentioned(message.from, `@${members[i].user}`, [
              members[i].user,
            ]);
          }
        }
      }
    } else console.log("MEDIA");
  });
}

function registerUser(user, index) {
  if (banco[user]) {
    return;
  } else {
    banco[user] = {
      status: "[ OFF ]",
      name: undefined,
      all: true,
    };
    ++index;
    console.log("registered");
    return;
  }
}
