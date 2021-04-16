import * as React from "react";

import Button from "../ui/controls/Button";
import {Item} from "../Item/types";
import api from "../Item/api";
import Modal, {ModalFooter} from "../ui/controls/Modal";
import TextField from "../ui/controls/inputs";
import List, {ListItem} from "../Item/components";

import styles from "./App.module.scss";

enum Status {
  Init = "Init",
  Success = "succes",
}

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}
const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Init);
  const [isModalVisible, toggleModal] = React.useState<boolean>(false);

  function remove(id: Item["id"]) {
    api.remove(id).then(() => setItems((items) => items.filter((item) => item.id !== id)));
  }

  function add(event: React.FormEvent<Form>) {
    event.preventDefault();
    const text = event.currentTarget.text.value.trim();

    if (!text) return;
    api.create(text).then((item: Item) => {
      setItems((items) => items.concat(item));
      toggleModal(false);
    });
  }

  React.useEffect(() => {
    api.list().then((items) => {
      setItems(items);
      setStatus(Status.Success);
    });
  }, []);

  if (status === Status.Init) {
    return <span>Loading...</span>;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
        <h3>{items.length} itemt(s)</h3>
      </header>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} onRemove={() => remove(item.id)}>
            {item.text}
          </ListItem>
        ))}
      </List>
      <Button colorScheme="primary" onClick={() => toggleModal(true)}>
        Add item
      </Button>
      {isModalVisible && (
        <Modal onClose={() => toggleModal(false)}>
          <form onSubmit={add}>
            <h2>add Item</h2>
            <TextField autoFocus name="text" type="text" />
            <ModalFooter>
              <Button type="button" onClick={() => toggleModal(false)}>
                Cancel
              </Button>
              <Button colorScheme="primary" type="submit">
                Add
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </main>
  );
};

export default App;
