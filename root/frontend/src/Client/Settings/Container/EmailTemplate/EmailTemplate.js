import React, { Component } from 'react'
import {SubmitWrapper } from './style';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from '../../../../Reusuable/Components/Interactive/Button/Button';
import Textfield from '../../../../Reusuable/Components/Interactive/inputs/text-field/text-field';
import TextArea from '../../../../Reusuable/Components/Interactive/inputs/TextArea/TextArea';
import { addEmailNewForm } from '../../../../Redux/actions/Client/PanelActions';
class EmailTemplate extends Component {
    state = {
        textfield: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "subject",
                label: "Subject",
                placeholder: "Regarding....",
                value: "",
                readOnly: false,
            }
        ],
        textarea: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "body",
                label: "Body",
                placeholder: "Body of Email...",
                value: "",
                readOnly: false,
            },
        ],
    }

    isFormValid = (event) => {
        event.preventDefault();

        let textfield = this.state.textarea;
        let isValid = true;

        if(textfield.value === ''){
            return false
        }

        if (isValid) {
            const data = new FormData();
            data.append("subject", this.state.textfield.value);
            data.append("body", this.state.textarea.value);  
            this.props.addEmailNewForm(data);      
        }
        
        return isValid;
    }
    render() {
        return (
            <div style={{marginTop: "20px"}}>
                
                <Textfield
                    textfield={this.state.textfield[0]}
                    handleInputValueChange={(event)=>{
                        let textfield = {...this.state.textfield};
                        textfield.value = event.target.value
                        this.setState({
                            textfield
                        })
                    }}
                />
                <TextArea
                    textarea={this.state.textarea[0]}
                    key={this.state.textarea[0].id}
                    handleInputValueChange={(event)=>{
                        let textarea = {...this.state.textarea};
                        textarea.value = event.target.value
                        this.setState({
                            textarea
                        })
                    }}
                />
                <SubmitWrapper>
                    <Button
                        buttonClick={this.isFormValid}
                        type="dark"
                        label="Submit"
                    />
                </SubmitWrapper>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isaddEmailNewAdded: state.client.panel.isaddEmailNewAdded,
})

const mapDispatchToProps = {
    addEmailNewForm
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(EmailTemplate))
