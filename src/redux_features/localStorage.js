const lscache = require("lscache");

export const loadState = (key) => {
    try {
      const serializedState = lscache.get(key);
      if (serializedState === null) {
        return undefined;
      }
    //   return JSON.stringify(serializedState);
      return serializedState
    } catch (err) {
      return undefined;
    }
  }; 

export const saveState = (key, state) => {
    lscache.set(key, JSON.stringify(state), 90);
  };
