module.exports = {
  filterObjByKey: (obj, key) => {
    let filtered;
    for(let objKey in obj) {
      if (objKey == key) filtered = (obj[key])
    }
    return filtered;
  }
};
