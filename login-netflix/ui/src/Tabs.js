import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'No commitments', content: 'Cancel anytime.' },
    { title: 'Watch anywhere', content: 'Stream on your phone, tablet, laptop, and TV.' },
    { title: 'Pick your price', content: 'Flexible plans for every budget.' },
  ];

  return (
    <div className="tabs">
      <div className="tab-headers">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;