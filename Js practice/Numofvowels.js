const numOfVowels = (str) => {
  let vow = str.split("").filter((M) => "aeiouAEIOU".includes(M));
  return vow.length;
};

console.log(numOfVowels("Miruthul kumar likes travelling"));
