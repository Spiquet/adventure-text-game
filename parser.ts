class Parser {


  infinitive_verbs : Array<any>;

  articles : Array<string>;

  prepositions  : Array<string>;

  nouns : Array<string>;

constructor(){
  this.infinitive_verbs = [
      "prendre",
      "ouvrir",
      "regarder",
      "lire",
      "aller",
      "poser"
  ]

  this.articles = [
      "le",
      "la",
      "au"
  ];

  this.prepositions = [
      "vers",
      "sur",
      "dans"
  ]

  this.nouns = [
      "boite",
      "lettre",
      "nord",
      "sud"
  ];
  }
INFINITIVE_VERB(word : string){
  const result = this.infinitive_verbs.find((verb)=>{return verb === word.toLowerCase();});
  return result ? {type: "verb", value: result} : null;
}


NOUN(word: string){
  const result = this.nouns.find((noun)=>{return noun === word.toLowerCase();});
  return result ? {type: "noun", value: result} : null;
}

ARTICLE(word: string){
  const result = this.articles.find((article)=>{return article === word.toLowerCase();});
  return result ? {type: "article", value: result} : null;
}

PREPOSITION(word: string){
  const result = this.prepositions.find((preposition)=>{return preposition === word.toLowerCase();});
  return result ? {type: "preposition", value: result} : null;
}


//Take a sentence a return the same sentence tokenized or throw an error

parseText (sentence : string)
{

var token : Array<any>= [];
const sentence_array = sentence.split(' ');

  //Let's build the syntaxic tree, from the longest possibility to the shortest (mandatory)
  const syntaxic_tree = [
    [this.INFINITIVE_VERB.bind(this),this.PREPOSITION.bind(this), this.ARTICLE.bind(this), this.NOUN.bind(this)],
    [this.INFINITIVE_VERB.bind(this),this.ARTICLE.bind(this), this.NOUN.bind(this)],
    [this.INFINITIVE_VERB.bind(this), this.NOUN.bind(this)],
    [this.INFINITIVE_VERB.bind(this)]
];

 //Let's try every possible sentence form until one succeed
 const success = syntaxic_tree.some(function(syntaxic_branch){

  //Let's copy all the words to avoid reference issues
  const local_sentence_array = [...sentence_array];
  const local_tokens : Array<any> = [];

  //For every branch item, let's check if the next word (of first) fits a token type
  let valid_syntax = syntaxic_branch.every(function(syntaxic_token){

      let token = local_sentence_array[0] ? syntaxic_token(local_sentence_array[0].toLowerCase()) : null;
      if(token){
          //If the word fits a token, then we push the token and remove the word from the sentence
          local_tokens.push(token);
          local_sentence_array.splice(0,1);
          return true;
      }
      return false;
  });

   //The sentence if fully parsed only when all the token has been found for a branch and there are no word remaining in the sentence
   if(valid_syntax && local_sentence_array.length === 0){
    token = local_tokens;
    return true;
}
return false;
});
if(!success){
//If no branch of the syntaxic tree was compatible, the parsing couldn't be done
throw new Error("ParsingError");
}
return token;
}

}
export default Parser;

