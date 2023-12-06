import React, { useState, useEffect } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedItems, setDisplayedItems] = useState([]);

  // Effect to update displayed items when items, sortBy, or selectedCategory change
  useEffect(() => {
    let filteredItems = items;

    // Filter items based on the selected category
    if (selectedCategory !== "All") {
      filteredItems = items.filter(
        (item) => item.category === selectedCategory
      );
    }

    let sortedItems = filteredItems.slice();

    // Apply sorting based on the selected sort criteria
    if (sortBy === "description") {
      sortedItems.sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === "packed") {
      sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    setDisplayedItems(sortedItems);
  }, [items, sortBy, selectedCategory]);

  // Log displayedItems for debugging purposes
  useEffect(() => {
    console.log("Displayed items:", displayedItems);
  }, [displayedItems]);

  return (
    <div className="list">
      <div className="category-filter">
        <label>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Clothing">Clothing</option>
          <option value="Toiletries">Toiletries</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      <ul>
        {displayedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
