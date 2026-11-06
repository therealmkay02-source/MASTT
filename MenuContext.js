import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  const addItem = (item) => {
    setMenuItems([...menuItems, { ...item, id: Date.now().toString() }]);
  };

  const updateItem = (id, updatedItem) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...updatedItem, id } : item)));
  };

  const deleteItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addItem, updateItem, deleteItem }}>
      {children}
    </MenuContext.Provider>
  );
};