const isPalindrome = (str) => {
  str = str.toLowerCase();
  let revStr = str.split("").reverse().join("");
  return str == revStr;
};

console.log(isPalindrome("Malayalam"));