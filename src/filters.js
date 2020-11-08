
const wordList = ["bct","pqp", "porra", "puta", "merda", "tnc", "cu", "fdp", "fdc", "carai", "krl", "caralho"];
const phraseList = [
    "olha o palavrão, mizera",
    "tu fala assim com a tua mãe?",
    "estamos em um grupo de família kkkkkkk",
    "vocabulário de baixo nível esse",
    "só fala palavrão, tomar no teu cu vai",
    "ai não irmão!",
    "boca suja!",
    "tudo na vida depende do quanto você quer comer alguém.\n",
    "nobre é o guerreiro que suja sua espada de sangue.\n",
    "quanto mais tempo você ficar solteiro, mais pirocada sua futura mulher vai levar.\n",
    "em briga de saci qualquer chute é uma voadora.\n",
    "Esquecemos dos gafanhotos e do Ronaldinho.",
    "transar é arte, gozar faz parte, engravidar é moda. Mas assumir é foda.",
    "Mais vale dois pintos na mão do que um na bunda.",
    "depois da tempestade, vem a gripe.",
    "se a vida fosse fácil, bebê não nascia chorando.",
    "vou nem dizer nada.",
    "vai assistir uma live."
];

const filt = (msg, name) => {

    let i = 0;
    while(i < wordList.length){ 
        let value = msg.indexOf(wordList[i]);
        let leng = wordList[i].length;
        if(value != -1){
            if(msg[value - 1] === ' ' || msg[leng] === ' '){
                return `${name}, ${phraseList[getRandomInt(0, phraseList.length)]}`;
            } else if(msg.length === wordList[i].length) return `${name}, ${phraseList[getRandomInt(0, phraseList.length)]}`;
             
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
