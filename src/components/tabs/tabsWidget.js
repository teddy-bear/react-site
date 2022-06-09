import React from "react";
import TabPanel from "./tabPanel";
import TabContent from "./tabContent";

class TabsWidget extends React.Component {
    state = {
        tabs: {
            movie: 'movie tab content', book: 'book tab content', audio: 'audio tab content'
        }, activeTab: false
    }

    /**
     * Tab panel click
     * todo: save data at localStorage
     * @param item
     */
    handleClick(item) {
        let currentTab = this.state.activeTab;

        if (item !== currentTab) {
            currentTab = item;
            this.setState({
                activeTab: item
            })
        } else {
            return;
            // todo: investigate how to transfer click
            //event.preventDefault();
        }
    }

    /**
     * Listen for the tab content click
     * @param item
     */
    handleTabContentClick = (item) => {
        // co do a state update here
        console.log(item);
    }


    render() {
        const tabs = this.state.tabs;
        const currentTab = (this.state.activeTab) ? this.state.activeTab : Object.keys(tabs)[0];

        // const tabContent = <TabContent>{tabs[currentTab]}</TabContent>;

        const tabPanels = Object.keys(tabs).map((item, index) => {
            let activeTab = item === currentTab;
            return <TabPanel activeTab={activeTab} onClick={() => this.handleClick(item)} key={index}>{item}</TabPanel>
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
                <TabContent onTabContentClick={this.handleTabContentClick}>{tabs[currentTab]}</TabContent>
            </div>
        </div>)
    }
}

export default TabsWidget;