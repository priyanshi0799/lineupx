import React, { Component } from "react";
import { FeedbackFormWrapper, SubmitWrapper } from "./style";
import AdditionalQuestions from "../../../NewJob/Container/AdditionalQuestions/AdditionalQuestions";
import SectionHeader from "../../../../Reusuable/Components/Interactive/SectionHeader/SectionHeader";
import Button from '../../../../Reusuable/Components/Interactive/Button/Button';
import { connect } from 'react-redux';
import { addFeedbackForm , getFeedbackForm} from '../../../../Redux/actions/Client/PanelActions';

export class Feedback extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.props.getFeedbackForm();
    }

    isValid = (event) => {

        event.preventDefault();
        const data = {
            additional_questions: this.myRef.current.getFormDetails()
        }
        this.props.addFeedbackForm(data);
        return true;
    }
    render() {
        return (
            <FeedbackFormWrapper>
                <SectionHeader
                    title="Feedback Template"
                    desc="Customize your feedback form for the candidates"
                />
                <AdditionalQuestions ref={this.myRef} />
                <SubmitWrapper>
                    <Button
                        type="dark"
                        label="Submit" 
                        buttonClick = {this.isValid}   
                    />
                </SubmitWrapper>
            </FeedbackFormWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.client.panel.error,
    getFeedbackFromSuccess: state.client.panel.getFeedbackFromSuccess
});

const mapDispatchToProps = {
    addFeedbackForm,
    getFeedbackForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);