const getNthElement = (index, array) => {
  return array [index % array.length]

}

const arrayToCSVString = array => {
  return array.join();
  
};

const csvStringToArray = string => {
  return string.split(',')  
  
};

const addToArray = (element, array) => {
  array.push(element);
};

const addToArray2 = (element, array) => {
  return array.concat(element); 
};


const removeNthElement = (index, array) => {
  array.splice(index, 1)
  return array;
};


const numbersToStrings = numbers => {
  return numbers.map(number =>number.toString())
};


const uppercaseWordsInArray = strings => {
  return strings.map(string => string.toUpperCase())
}

const reverseWordsInArray = strings => {
  return strings.map(string => string.split('').reverse().join(''))
  
};


const onlyEven = numbers => {
  return numbers.filter(number => number % 2 === 0)
};


const removeNthElement2 = (index, array) => {
  const arrayCopy = array.slice();
  arrayCopy.splice(index,1);
  return arrayCopy;
};


const elementsStartingWithAVowel = strings => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return strings.filter(string => vowels.includes(string[0].toLowerCase()));
  
};

const removeSpaces = string => {
  return string.split(' ').join('');
 
};


const sumNumbers = numbers => {
  return numbers.reduce((accumulator, number) => accumulator + number)

};


const sortByLastLetter = strings => {
  function compareFunction(a, b) {
    return a.charCodeAt(a.length-1) - b.charCodeAt(b.length-1)
  }
  return strings.sort(compareFunction)
};


module.exports = {
  getNthElement,
  arrayToCSVString,
  csvStringToArray,
  addToArray,
  addToArray2,
  removeNthElement,
  numbersToStrings,
  uppercaseWordsInArray,
  reverseWordsInArray,
  onlyEven,
  removeNthElement2,
  elementsStartingWithAVowel,
  removeSpaces,
  sumNumbers,
  sortByLastLetter
};
