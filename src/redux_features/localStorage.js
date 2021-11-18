const lscache = require("lscache");

export const loadState = (key) => {
    try {
      const serializedState = () => JSON.parse(lscache.get(key));
      if (serializedState() === null) {
        if (key === "loginStatus"){
          return false
        }
        if (key === "SelectedItem"){
          return "Login"
        }
        return "";
      }
    //   return JSON.stringify(serializedState);
      return serializedState()
    } catch (err) {
      return undefined;
    }
  }; 

export const saveState = (key, state) => {
    lscache.set(key, JSON.stringify(state), 90);
  };
