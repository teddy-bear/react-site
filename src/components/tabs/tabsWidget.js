import React from "react";
import TabPanel from "./tabPanel";
import TabContent from "./tabContent";

class TabsWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: false
        }
    }

    /**
     * Tab panel click
     * @param item
     */
    handleClick(item) {
        let currentTab = this.state.activeTab;

        if (item !== currentTab) {
            this.setState({
                activeTab: item
            })
        }
    }

    render() {
        const tabs = this.props.tabs;
        const currentTab = (this.state.activeTab) ? this.state.activeTab : Object.keys(tabs)[0];

        // List tab titles
        const tabPanels = Object.keys(tabs).map((item, index) => {
            let activeTab = item === currentTab;

            return <TabPanel
                activeTab={activeTab}
                onClick={() => this.handleClick(item)}
                key={index}>
                {tabs[item].title}
            </TabPanel>
        });

        // List tabs content
        const tabContent = Object.keys(tabs).map((item, index) => {
            let activeTab = item === currentTab;

            return <TabContent
                activeTab={activeTab}
                key={index}>
                {tabs[item].content}
            </TabContent>
        });

        return (
            <div className="tabs-widget">
                <ul className="nav nav-pills">
                    {tabPanels}
                </ul>
                <div className="tab-content">
                    {tabContent}
                </div>
            </div>
        )
    }
}

export default TabsWidget;
