import React, { useState } from 'react';
import './tabs.css';

const Tabs = ({
  children,
  tabHeaderClass,
  tabsBoxClass,
  tabHeaderBoxClass,
  activeColor,
  startTab
}) => {
  const [activeTab, setActiveTab] = useState(startTab - 1);
  const activeStyle = {
    background: activeColor
  };

  const renderTabs = tabs => {
    if (tabs.length) {
      return tabs.map((tab, i) => React.createElement("div", {
        key: tab.props.name,
        role: "presentation",
        className: tabHeaderClass,
        onClick: () => setActiveTab(i),
        style: activeTab === i ? activeStyle : null
      }, tab.props.name));
    }

    return React.createElement("div", {
      className: tabHeaderClass
    }, tabs.props.name);
  };

  const renderContent = tabs => {
    if (tabs.length) {
      return tabs.map((tab, i) => React.createElement(React.Fragment, {
        key: tab.props.name
      }, activeTab === i && React.createElement(React.Fragment, null, tab)));
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
  activeColor: '#9369BF'
};