import React, { useState } from 'react';
import './tabs.css';

const Tabs = ({
  children, tabHeaderClass, tabsBoxClass, tabHeaderBoxClass, startTab, activeTabClass,
}) => {
  const [activeTab, setActiveTab] = useState(startTab - 1);

  const renderTabs = (tabs) => {
    if (tabs.length) {
      return (tabs.map((tab, i) => {
        if (tab) {
          return (
            <div
              key={tab.props.name}
              role="presentation"
              className={activeTab === i ? `${tabHeaderClass} ${activeTabClass}` : tabHeaderClass}
              onClick={() => setActiveTab(i)}
            >
              {tab.props.name}
            </div>
          );
        }
        return null;
      }));
    }
    return (
      <div className={`${tabHeaderClass} ${activeTabClass}`}>
        {tabs.props.name}
      </div>
    );
  };

  const renderContent = (tabs) => {
    if (tabs.length) {
      return (tabs.map((tab, i) => {
        if (tab) {
          return (
            <React.Fragment key={tab.props.name}>
              {activeTab === i && (
                <React.Fragment>
                  {tab}
                </React.Fragment>
              )}
            </React.Fragment>
          );
        }
        return null;
      }));
    }
    return (
      <React.Fragment>
        {tabs}
      </React.Fragment>
    );
  };

  return (
    <div className={tabsBoxClass}>
      <div className={tabHeaderBoxClass}>
        {renderTabs(children)}
      </div>
      {renderContent(children)}
    </div>
  );
};

export default Tabs;

Tabs.defaultProps = {
  startTab: 1,
  tabsBoxClass: 'tabsBox',
  tabHeaderClass: 'tabHeader',
  tabHeaderBoxClass: 'tabHeaderBox',
  activeTabClass: 'activeTab',
};
