const onlyEven = (num) => {
  str = num.toString();
  let evenNum = str
    .split("")
    .filter((c) => {
      if (c % 2 == 0) c;
    })
    .join("");
  evenNum = Number(evenNum);

  return evenNum;
};

console.log(onlyEven(1234));
