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

    /**
     * Listen for the tab content click
     * @param item
     */
    handleTabContentClick = (item) => {
        //console.log(item);
    }


    render() {
        const tabs = this.props.tabs;
        //tabs[Object.keys(tabs)[0]].title
        const currentTab = (this.state.activeTab) ? this.state.activeTab : Object.keys(tabs)[0];

        // const tabContent = <TabContent>{tabs[currentTab]}</TabContent>;

        const tabPanels = Object.keys(tabs).map((item, index) => {
            let activeTab = item === currentTab;
            return <TabPanel activeTab={activeTab} onClick={() => this.handleClick(item)} key={index}>{tabs[item].title}</TabPanel>
        });

        // List all tabs
        /*const tabContent = Object.values(tabs).map((item, index) => {
            return <TabContent key={index}>{item}</TabContent>
        });*/

        /*for (const key in tabs) {
            console.log(`${key}: ${tabs[key]}`);
        }*/

        return (<div className="tabs-widget">
            <ul className="nav nav-pills">
                {tabPanels}
            </ul>
            <div className="tab-content">
                <TabContent
                    onTabContentClick={this.handleTabContentClick}>
                    {tabs[currentTab].content}
                </TabContent>
            </div>
        </div>)
    }
}

export default TabsWidget;
