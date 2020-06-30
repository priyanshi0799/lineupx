import React, { Component } from 'react'
import { ChangePasswordWrapper, SubmitWrapper } from './FeedbackStyle';
import SectionHeader from '../../Reusuable/Components/Interactive/SectionHeader/SectionHeader';
import Button from '../../Reusuable/Components/Interactive/Button/Button';
import AdditionalQuestions from '../../Client/NewJob/Container/AdditionalQuestions/AdditionalQuestions';
import { connect } from 'react-redux';
import { addFeedbackForm , getFeedbackForm} from '../../Redux/actions/Recruiter/profile';

class Feedback extends Component {
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
            <ChangePasswordWrapper>
                <SectionHeader
                    title="Feedback Form Template"
                    desc="Please add the Questions"
                />
                <AdditionalQuestions ref={this.myRef} />
                <SubmitWrapper>
                    <Button
                        type="dark"
                        label="Submit" 
                        buttonClick = {this.isValid}   
                    />
                </SubmitWrapper>
            </ChangePasswordWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    error: state.client.panel.error,
    getFeedbackFromSuccess: state.recruiter.panel.getFeedbackFromSuccess
});

const mapDispatchToProps = {
    addFeedbackForm,
    getFeedbackForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);