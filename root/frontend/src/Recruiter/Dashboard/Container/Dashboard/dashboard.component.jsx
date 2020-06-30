import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import {
    getLiveJobs,
    getAcceptedJobs,
    getRejectedJobs,
} from "../../../../Redux/actions/Recruiter/panel.actions";

import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import {
    HorizontalWrapper,
    HorizontalWrapperFilled,
    DashboardWrapper,
    AnimatedWrapper
} from "./style";
import SummaryCard from "../../Components/SummaryCard/SummaryCard";
import DoughnutChart from "../../Components/DoughnutChart/DoughnutChart";
import FunnelChart from "../../Components/FunnelChart/FunnelChart";
import CustomCompetency from '../../../../Reusuable/Container/CustomCompetency/CustomCompetency';
import { contourDensity } from "d3";

class Dashboard extends Component {
    state = {
        filters: [
            {
                name: "View your Stats",
                type: "checkbox",
                filterValues: [],
                filterField: [
                    {
                        id: 1,
                        active: true,
                        label: "Live Jobs",
                    },
                    {
                        id: 2,
                        active: true,
                        label: "Accepted Jobs",
                    },
                    {
                        id: 3,
                        label: "Rejected Jobs",
                        active: true,
                    },
                    {
                        id: 4,
                        label: "Candidates On Board",
                        active: true,
                    },
                    {
                        id: 5,
                        label: "Recruitment Funnel",
                        active: true,
                    },
                    {
                        id: 6,
                        label: "Jobs on Board",
                        active: true,
                    },
                ],
            },
        ],
    }
    componentDidMount() {
        this.props.getLiveJobs();
        this.props.getAcceptedJobs();
        this.props.getRejectedJobs();
    }

    handleCheckboxClick = (type, index, id) => {
        const state = JSON.parse(JSON.stringify(this.state));
        let checkboxes = state[type][index].filterField;
        checkboxes[id - 1].active = !checkboxes[id - 1].active;
        state[type][index].filterValues = [];
        let array = state[type][index].filterValues;
        checkboxes.forEach((checkbox) => {
            if (checkbox.active) {
                array.push(checkbox.label);
            }
        });
        this.setState(state);
    };

    render() {
        let data = null;
        let count = 0;
        this.state.filters[0].filterField.map((data,i) => {
            if(data.active === false){
                count++;
            }
        })
        if(count === 6){
            data = <h1>Nothing to display!!</h1>
            count = 0;
        }


        return (
            <>
            <SectionHeader
                    title="Dashboard"
                    desc="Review your activities. Based on your performance"
                />
            <DashboardWrapper>
                {/* <AnimatedWrapper count={count} /> */}
                <HorizontalWrapper>
                    {this.state.filters[0].filterField[0].active ? <SummaryCard
                        count={
                            this.props.liveJobs?.length >= 0
                                ? this.props.liveJobs?.length
                                : "..."
                        }
                        title="live jobs"
                    /> : null}

                    {this.state.filters[0].filterField[1].active ? <SummaryCard
                        count={
                            this.props.acceptedJobs?.length >= 0
                                ? this.props.acceptedJobs.length
                                : "..."
                        }
                        title="accepted jobs"
                    /> : null}
                    
                    {this.state.filters[0].filterField[2].active ?<SummaryCard
                        count={
                            this.props.rejectedJobs?.length >= 0
                                ? this.props.rejectedJobs.length
                                : "..."
                        }
                        title="rejected jobs"
                    /> : null}
                    
                    {data}
                    
                    <CustomCompetency
                        filters={this.state.filters}
                        title={"CUSTOM FILTER"}
                        float="right"
                        position = "absolute"
                        height = "17rem"
                        right = "0"
                        handleCheckboxClick={this.handleCheckboxClick}
                    />
                </HorizontalWrapper>
                
                <HorizontalWrapperFilled>
                    {this.state.filters[0].filterField[3].active ? <DoughnutChart
                        data={{
                            labels: ["Accepted", "Rejected", "Pending"],
                            datasets: [
                                {
                                    data: [300, 50, 100],
                                    backgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                    ],
                                    hoverBackgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                    ],
                                },
                            ],
                        }}
                        count={6-count}
                        title="candidates on board"
                    />: null}
                    
                    {this.state.filters[0].filterField[4].active ? <FunnelChart
                        title="Recruitment Funnel"
                        data={[
                            {
                                type: "funnel",
                                theme: "light2",
                                valueRepresents: "area",
                                toolTipContent:
                                    "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                                indexLabelPlacement: "inside",
                                indexLabel: "{label} ({percentage}%)",
                                dataPoints: [
                                    { y: 100, label: "Screen" },
                                    { y: 47, label: "Offer" },
                                    { y: 65, label: "Interview" },
                                    { y: 40, label: "Hire" },
                                ],
                            },
                        ]}
                        count={6-count}
                    /> : null}

                    {this.state.filters[0].filterField[5].active ? <DoughnutChart
                        data={{
                            labels: ["Live", "Accepted", "Rejected"],
                            datasets: [
                                {
                                    data: [300, 50, 100],
                                    backgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                    ],
                                    hoverBackgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                    ],
                                },
                            ],
                        }}
                        count={6-count}
                        title="jobs on board"
                    /> : null}
                    
                    
                </HorizontalWrapperFilled>
            </DashboardWrapper>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    liveJobs: state.recruiter.panel.liveJobs,
    acceptedJobs: state.recruiter.panel.acceptedJobs,
    rejectedJobs: state.recruiter.panel.rejectedJobs,
});

const mapDispatchToProps = {
    getLiveJobs,
    getAcceptedJobs,
    getRejectedJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
