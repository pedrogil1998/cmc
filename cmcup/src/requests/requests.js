
import {
  child,
  get,
  getDatabase,
  ref,
  push,
  set,
  remove,
  update,
} from "firebase/database";
import { db } from "../../firebase";

export const getChampionship = async (setItems) => {
  const dbRef = ref(db);
  get(child(dbRef, `results`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        for (const key in data) {
          data[key].index = key;
        }

        setItems(data);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const postNewCard = async (newItem, setItems) => {
  const dbRef = ref(db, "events");
  const postRef = push(dbRef);

  set(postRef, newItem)
    .then(function (response) {
      console.log(response);
      getCardList(setItems);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteCard = async (id, setItems) => {
  const dbRef = ref(db, "events/" + id);
  remove(dbRef)
    .then(function (response) {
      console.log(response);
      getCardList(setItems);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const updateCard = async (id, newItem, setItems) => {
  const dbRef = ref(db);

  // // Get a key for a new Post.

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/events/" + id] = newItem;

  return update(dbRef, updates);
};

export const updateChampionship = async (newItem) => {
  const dbRef = ref(db);
  const updates = {};
  updates["/results/"] = newItem;

  return update(dbRef, updates);
};
