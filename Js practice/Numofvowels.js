const numOfVowels = (str) => {
  let vow = str.split("").filter((c) => "aeiouAEIOU".includes(c));
  return vow.length;
};

console.log(numOfVowels("Miruthul kumar likes travelling"));
