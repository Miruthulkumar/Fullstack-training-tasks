const longestWord = (sentence) => {
  let words = sentence.split(" ");
  let longestWord = words[0];
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > longestWord.length) {
      longestWord = words[i];
    }
  }
  return longestWord;
};

console.log(longestWord("Miruthul likes to visit his hometown!"));
