const longestWord = (sentence) => {
  let words = sentence.split(" ");

  let longestWord = words[0];

  for (let word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }
  return longestWord;
};

console.log(longestWord("mirjuab dbwafdhbfa fauefubefb"));
