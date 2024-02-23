const setData = require("../data/setData");
const themeData = require("../data/themeData");
let sets = [];  
async function initialize() {
  await Promise.all(
    setData.map(async (setElement) => {
      const found = themeData.find((themeElement) =>
        themeElement.id === setElement.theme_id
      );
      if (found) {
        setElement.theme = found.name;
        sets.push(setElement);
      }
    })
  );
}

async function getAllSets() {
  return Promise.resolve([...sets]); // Return a copy of the sets array to prevent external modification
}

async function getSetByNum(setNum) {
  const foundNum = sets.find((set) => set.set_num === setNum);

  if (foundNum) {
    return Promise.resolve({ ...foundNum }); // Return a copy of the found object to prevent external modification
  } else {
    return Promise.reject(new Error('Unable to find requested set'));
  }
}

async function getSetsByTheme(theme) {
  const themeLower = theme.toLowerCase();
  const foundTheme = sets.filter((set) =>
    set.theme.toLowerCase().includes(themeLower)
  );

  if (foundTheme.length > 0) {
    return Promise.resolve([...foundTheme]); // Return a copy of the found array to prevent external modification
  } else {
    return Promise.reject(new Error('Unable to find requested sets'));
  }
}
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
