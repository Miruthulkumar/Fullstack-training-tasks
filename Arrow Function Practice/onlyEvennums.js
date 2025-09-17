const onlyEven=(num)=>{
    str=num.toString();
    let evenNum = str.split('').filter(c=>Number(c)%2===0).join('');
    evenNum = Number(evenNum)

    return evenNum
}

console.log((onlyEven(11223344556677889900)))
