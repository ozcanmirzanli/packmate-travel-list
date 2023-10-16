import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import React from "react";
import WeatherComponent from "./WeatherComponent";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // @ts-ignore
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    // @ts-ignore
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    // @ts-ignore
    setItems((items) =>
      items.map((item) =>
        // @ts-ignore
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <WeatherComponent />

      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
