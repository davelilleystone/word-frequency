//TODO - RegEx needs to handle numbers better, 6.5% becomes 65 for example. Maybe even filter out numbers as they are not words?

//TODO - refcator to remove global variables

const table = document.querySelector('table');
const btn = document.querySelector('button');
const errMessage = document.querySelector('.error-message');

// test for punctuation marks
const puncTest = (word) => {
  return word.replace(/[.,\/#!"$%\^&\*;:{}=\-_`~()]/g, '');
};

// remove blanks, new line characters and standalone punctuation
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
  text = str.replace(/(\r\n|\n|\r)/gm, ' ');
  const splitStr = text.split(' ');
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

const createTable = (str) => {
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

const displayTable = () => {
  const textInput = document.querySelector('.text-input').value;
  if (textInput.length === 0) {
    if (errMessage.classList.contains('hidden')) {
      errMessage.classList.remove('hidden');
    }
    table.style.display = 'none';

    return;
  } else {
    if (!errMessage.classList.contains('hidden')) {
      errMessage.classList.add('hidden');
    }

    table.innerHTML = '';
    createTable(textInput);
    createTableHeader();
    table.style.display = 'table';
  }
};

btn.addEventListener('click', displayTable);

// createTableHeader();
// createTable();
