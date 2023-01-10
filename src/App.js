import { useState } from "react";

import Layout from "./components/Layout/Layout";
import ItemList from "./components/Items/ItemList";
import NewItem from "./components/NewItem/NewItem";

function App() {
  const [list, setList] = useState([]);

  const addItemHandler = (enteredText) => {
    setList((prevItems) => {
      const updatedList = [...prevItems];
      updatedList.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedList;
    });
  };

  console.log(list);

  return (
    <Layout>
      <NewItem onAddItem={addItemHandler} />
      <ItemList items={list} />
    </Layout>
  );
}

export default App;
