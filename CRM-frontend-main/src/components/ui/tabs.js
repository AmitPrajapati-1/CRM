import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }) {
  return <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      style={{
        padding: '8px 16px',
        cursor: 'pointer',
        border: 'none',
        borderBottom: isActive ? '3px solid blue' : '3px solid transparent',
        backgroundColor: 'transparent',
        fontWeight: isActive ? 'bold' : 'normal',
        outline: 'none',
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;

  return <div style={{ padding: '16px 0' }}>{children}</div>;
}
