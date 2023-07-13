const str = `Calculating ...........  ! as as %%% and the frequency of words in a block of text is a technique which has various uses in algorithms such as searching, sorting, and semantic analysis. The objective of the Word Frequency app is count the frequency!!! of words in a block of text and create a tabular display of each unique word in the text along with its frequency, in descending order by frequency.`;

const splitStr = str.split(' ');

const puncTest = (word) => {
  return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
};

// remove blanks and standalone punctuation
const filterArr = (strArr) => {
  return strArr
    .filter((word) => {
      if (word.length > 0) {
        return puncTest(word);
      }
      return 0;
    })
    .map((word) => puncTest(word).toLowerCase());
};

// create word frequency object and return array of word / frequency pairs
const getWordFreq = (filteredStrArr) => {
  const wordFreq = filteredStrArr.reduce((obj, word) => {
    if (obj[word]) {
      obj[word]++;
    } else {
      obj[word] = 1;
    }
    return obj;
  }, {});
  return Object.entries(wordFreq);
};

// sort array and reverse (descending order)
const sortArr = (freqArr) => {
  return freqArr
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .reverse();
};

const filtered = filterArr(splitStr);

const freqArr = getWordFreq(filtered);

const sortedArr = sortArr(freqArr);

console.log(sortedArr);
