import React, { useState } from 'react';
import './tabs.css';

const Tabs = ({
  children,
  tabHeaderClass,
  tabsBoxClass,
  tabHeaderBoxClass,
  startTab,
  activeTabClass
}) => {
  const [activeTab, setActiveTab] = useState(startTab - 1);

  const renderTabs = tabs => {
    if (tabs.length) {
      return tabs.map((tab, i) => {
        if (tab) {
          return React.createElement("div", {
            key: tab.props.name,
            role: "presentation",
            className: activeTab === i ? `${tabHeaderClass} ${activeTabClass}` : tabHeaderClass,
            onClick: () => setActiveTab(i)
          }, tab.props.name);
        }

        return null;
      });
    }

    return React.createElement("div", {
      className: `${tabHeaderClass} ${activeTabClass}`
    }, tabs.props.name);
  };

  const renderContent = tabs => {
    if (tabs.length) {
      return tabs.map((tab, i) => {
        if (tab) {
          return React.createElement(React.Fragment, {
            key: tab.props.name
          }, activeTab === i && React.createElement(React.Fragment, null, tab));
        }

        return null;
      });
    }

    return React.createElement(React.Fragment, null, tabs);
  };

  return React.createElement("div", {
    className: tabsBoxClass
  }, React.createElement("div", {
    className: tabHeaderBoxClass
  }, renderTabs(children)), renderContent(children));
};

export default Tabs;
Tabs.defaultProps = {
  startTab: 1,
  tabsBoxClass: 'tabsBox',
  tabHeaderClass: 'tabHeader',
  tabHeaderBoxClass: 'tabHeaderBox',
  activeTabClass: 'activeTab'
};