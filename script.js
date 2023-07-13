// const str = `Calculating ...........  ! as as %%% and the frequency of words in a block of text is a technique which has various uses in algorithms such as searching, sorting, and semantic analysis. The objective of the Word Frequency app is count the frequency!!! of words in a block of text and create a tabular display of each unique word in the text along with its frequency, in descending order by frequency.`;

const str = `Millions of public sector workers, including teachers, police and junior doctors, are to be offered pay rises between 5%-7%, the government says.

Police and prison officers will receive a 7% pay rise, while teachers and junior doctors will get a 6.5% and 6% rise respectively.

Prime Minister Rishi Sunak said he had accepted recommendations made by the pay review bodies "in full".

He said the rises would not be funded by borrowing more or increasing taxes.

He added that the offer was "final" and further industrial action would not change that decision, saying: "There will be no more talks on pay. We will not negotiate again on this year's settlements and no amount of strikes will change our decision." Following the announcement, the education unions said they would now put the offer to their members with a recommendation to accept the pay award, and said the deal would allow the strikes to be called off.

Mr Sunak said the pay awards in the education department would be fully funded, but did not set out details how it would be achieved. Over the past year, rising prices have prompted public sector workers to ask for pay rises matching or exceeding the rate of inflation which currently stands at 8.7%. Disputes over salary have led to a series of strikes hitting schools and hospitals.`;

// const str = 't';
const table = document.querySelector('table');

// test for punctuation marks
const puncTest = (word) => {
  return word.replace(/[.,\/#!"$%\^&\*;:{}=\-_`~()]/g, '');
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

const getData = (str) => {
  str2 = str.replace(/(\r\n|\n|\r)/gm, ' ');
  const splitStr = str2.split(' ');
  const filtered = filterArr(splitStr);
  console.log(filtered);
  const freqArr = getWordFreq(filtered);
  return sortArr(freqArr);
};

const createTableHeader = () => {
  const headerText = ['Word', 'Frequency'];
  const thead = table.createTHead();
  const row = thead.insertRow();
  for (const item of headerText) {
    const th = document.createElement('th');
    const text = document.createTextNode(item);
    th.appendChild(text);
    row.appendChild(th);
  }
};

const createTable = () => {
  const data = getData(str);
  for (const el of data) {
    const row = table.insertRow();
    for (const item of el) {
      const cell = row.insertCell();
      const text = document.createTextNode(item);
      cell.appendChild(text);
    }
  }
};

createTableHeader();
createTable();
