//import Parser from './parser'

const Parser = require('./parser.ts');
const parser = new Parser();

const sentences = [
    "regarder",
    "ouvrir",
    "ouvre",
    "prendre",
    "lire",
    "lire lettre",
    "ouvrir boite",
    "regarde boite",
    "regarder la boite",
    "aller au nord",
    "aller vers le sud",
    "sud aller vers le",
];

sentences.forEach((sentence)=>{
    try {
        const token = parser.parseText(sentence);
        console.log(sentence, token);
    } catch(e){
        console.error("Invalid syntax for sentence: ",sentence);
    }
});
