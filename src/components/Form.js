import React from "react";
import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Clothing");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!description) return; // If the description is empty, do nothing

    // Create a new item object with entered details

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
      category,
    };

    onAddItems(newItem); // Call the onAddItems function passed as a prop with the new item

    // Clear the form fields after adding the item
    setDescription("");
    setQuantity(1);
    setCategory(category);
  }

  // Render the form elements

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🚞 trip?</h3>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Clothing">Clothing</option>
        <option value="Toiletries">Toiletries</option>
        <option value="ElectronicsB">Electronics</option>
        <option value="Books">Books</option>
      </select>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
