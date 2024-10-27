import React, { useState, useEffect } from 'react';

const HeavyComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulate a heavy computation or data fetching
    const heavyComputation = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newItems = Array.from({ length: 5000 }, (_, index) => ({
            id: index,
            value: Math.random().toString(36).substr(2, 9)
          }));
          resolve(newItems);
        }, 2000); // Simulate a 2-second delay
      });
    };

    heavyComputation().then(newItems => setItems(newItems));
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Heavy Component (5000 items)</h2>
      <div className="grid grid-cols-5 gap-2 h-96 overflow-auto">
        {items.map(item => (
          <div key={item.id} className="p-2 bg-gray-100 rounded shadow">
            <p className="font-semibold">Item {item.id}</p>
            <p className="text-sm text-gray-600">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeavyComponent;