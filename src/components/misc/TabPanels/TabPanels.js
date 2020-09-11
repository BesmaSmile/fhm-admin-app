import React, { useState } from 'react';
import { Paper, Tabs, Tab, AppBar, Typography, Box } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

const TabPanel = (props) => {
  const { children, selectedTab, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedTab !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {selectedTab === index && (
        <div>{children}</div>
      )}
    </div>
  );
}
const TabPanels = props => {
  const [_selectedTab, _setSelectedTab] = useState(0)

  const handleChange = (e, value) => {
    console.log(value)
    _setSelectedTab(value)
  }

  const handleChangeIndex=(index)=>{
    console.log(index)
    _setSelectedTab(index)
  }
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <div className={`TabPanels ${props.className || ''}`}>
      <Paper>
        <Tabs
          value={_selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >

          {props.tabs.map((tab, i) => <Tab key={i} label={tab.label} {...a11yProps(i)} />)}

        </Tabs>
      </Paper>
      <SwipeableViews
        axis={'x'}
        index={_selectedTab}
        onChangeIndex={handleChangeIndex}
      >
        {props.tabs.map((tab, i) => <TabPanel key={i} selectedTab={_selectedTab} index={i}>{tab.content}</TabPanel>)}
      </SwipeableViews>
    </div>
  )
}

export default TabPanels