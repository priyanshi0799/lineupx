import React, { Component } from 'react'
import Tab from '../../../../Reusuable/Components/Interactive/Tab/Tab';
import EmailTemplate from './EmailTemplate';
import EmailAlready from './EmailAlready';
import { TagWrapper , FeedbackFormWrapper} from './style';
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
class Main extends Component {
    state = {
        tabs: [
            {
                id: 1,
                active: true,
                label: "Email Template for New candidate",
            },
            {
                id: 2,
                active: false,
                label: "Email Template for existing candidate",
            }
        ]
    }

    handlerTabClick = (id) => {
        let tabs = this.state.tabs.concat();
        tabs.forEach((tab) => {
            tab.active = false;
            if (tab.id === id) tab.active = true;
        });

        this.setState({
            tabs,
        });
    };

    getRightTabContent = () => {
        let tabs = this.state.tabs.concat();
        let currentContent;
        tabs.forEach((tab) => {
            if (tab.active === true) {
                if (tab.id === 1)
                    currentContent = <EmailTemplate />;
                if (tab.id === 2)
                    currentContent = <EmailAlready />;
            }
        });
        return currentContent;
    };

    render() {
        return (
            <FeedbackFormWrapper>
                <SectionHeader
                    title="Email Template"
                    desc="Customize your Email Template for the candidates"
                />
            
                <TagWrapper>
                    {this.state.tabs.map((tab) => (
                        <Tab
                            normal
                            tabClick={() =>
                                this.handlerTabClick(tab.id)
                            }
                            active={tab.active}
                            label={tab.label}
                        />
                    ))}
                </TagWrapper>
                {this.getRightTabContent()}
            </FeedbackFormWrapper>
        )
    }
}

export default Main;