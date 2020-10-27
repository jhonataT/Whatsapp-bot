
const wordList = ["bct", "pqp", "porra", "puta", "merda", "tnc", "cu", "fdp"];
const phraseList = [
    "olha o palavrão, mizera",
    "tu fala assim com a tua mãe?",
    "estamos em um grupo de família kkkkkkk",
    "vocabulário de baixo nível esse",
    "só fala palavrão, tomar no teu cu vai",
    "ai não irmão!",
    ""
];

const filt = (msg, name) => {

    let i = 0;
    while(i < wordList.length){ 
        let value = msg.indexOf(wordList[i]);
        if(value != -1){
            try{
                return `${name}, ${phraseList[getRandomInt(0, phraseList.length)]}`;
            } catch (err){
                return console.log(err);
            }
        } 

        ++i;
    }
    return null;

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

module.exports = filt;
