import { db } from "../assets/firebaseConfig";

export const loadStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
    db.collection("users")
      .doc("maks")
      .set({
        state
      });
  } catch (err) {}
};
