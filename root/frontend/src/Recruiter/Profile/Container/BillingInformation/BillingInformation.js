import React, { Component } from 'react'
import Dropdown from "../../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down";
import Textfield from "../../../../Reusuable/Components/Interactive/inputs/text-field/text-field";
import Button from "../../../../Reusuable/Components/Interactive/Button/Button";
import arrowDownIcon from "../../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import {InputWrapper, PersonalInformationWrapper, SubmitWrapper} from './style';
import { updateBillingInfo , getUserInfo } from "../../../../Redux/actions/Recruiter/profile";
import { connect } from "react-redux";

class BillingInformation extends Component {
    state = {
        textfield: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "billing_name",
                label: "Billing Name",
                placeholder: "John Doe",
                value: "",
                readOnly: false,
            },
            {
                id: 1,
                inputType: "text",
                state: "normal",
                name: "address",
                label: "Address",
                placeholder: "Mumbai, India",
                value: "",
                readOnly: false,
            },
            {
                id: 2,
                inputType: "text",
                state: "normal",
                name: "account_number",
                label: "Account Number",
                placeholder: "12345678912345",
                value: "",
                readOnly: false,
            },{
                id: 3,
                inputType: "text",
                state: "normal",
                name: "service_tax_number",
                label: "Service Tax Number",
                placeholder: "12345678912345",
                value: "",
                readOnly: false,
            },{
                id: 4,
                inputType: "text",
                state: "normal",
                name: "cin",
                label: "Company Identification Number",
                placeholder: "12345678912345",
                value: "",
                readOnly: false,
            },{
                id: 5,
                inputType: "text",
                state: "normal",
                name: "gst",
                label: "GST Number",
                placeholder: "12345",
                value: "",
                readOnly: false,
            },
            {
                id: 6,
                inputType: "text",
                state: "normal",
                name: "contact_person",
                label: "Contact Person",
                placeholder: "David Warner",
                value: "",
                readOnly: false,
            },
        ],
        profile: {
            file: null,
            url: null,
        }
    }

    constructor(props) {
        super(props);
        if (this.props.isBillingInfoUpdated) {
            this.props.submitClick();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isBillingInfoUpdated) {
            this.props.submitClick();
        }
    }

    handleInputValueChange = (event) => {
        let textfield = this.state.textfield;
        textfield.map((field) => {
            if (field.name === event.target.name) {
                field.value = event.target.value;
            }
            return field;
        });

        this.setState({
            textfield,
        });
    };

    handleInputValueChange = (event) => {
        let textfield = this.state.textfield;
        textfield.map((field) => {
            if (field.name === event.target.name) {
                field.value = event.target.value;
            }
            return field;
        });

        this.setState({
            textfield,
        });
    };

    handleFieldValidation = (fieldName) => {
        let textfield = this.state.textfield;
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // eslint-disable-next-line no-useless-escape
        textfield.map((field) => {
            if (field.name === fieldName) {
                if (field.name.includes("email")) {
                    field.state = field.value.match(emailReg)
                        ? "normal"
                        : "error";
                    field.hint =
                        field.state === "error"
                            ? "Please provide an valid work email address."
                            : field.hint;
                } else if (!field.name.includes("confirm-password")) {
                    field.state = field.value.length !== 0 ? "normal" : "error";
                    field.hint =
                        field.state === "error"
                            ? `Please enter ${field.name}.`
                            : undefined;
                }
            }

            return field;
        });

        this.setState({
            textfield,
        });
    };

    isFormValid = (event) => {
        event.preventDefault();

        let textfield = this.state.textfield;
        let isValid = true;

        textfield.map((field) => {
            this.handleFieldValidation(field.name);
            if (field.state === "error") {
                isValid = false;
            }
            console.log(field)
            return field;
            
        });

        if (isValid) {
            const data = {
                billing_name: this.state.textfield[0].value,
                address: this.state.textfield[1].value,
                account_number: this.state.textfield[2].value,
                service_tax_number: this.state.textfield[3].value,
                cin: this.state.textfield[4].value,
                gst: this.state.textfield[5].value,
                contact_person: this.state.textfield[6].value
            }

            this.props.updateBillingInfo(data);
        }
        return isValid;
    };

    render() {
        return (
            <PersonalInformationWrapper>
                <InputWrapper>
                    {this.state.textfield.map((field) => (
                            <Textfield
                                textfield={field}
                                key={field.id}
                                handleInputValueChange={this.handleInputValueChange}
                            />
                    ))}
                </InputWrapper>
                <SubmitWrapper>
                    <Button
                        type="light"
                        label="Back"
                        buttonClick={this.props.previousSection}
                    />

                    <Button
                        buttonClick={this.isFormValid}
                        type="dark"
                        label="Submit"
                    />
                </SubmitWrapper>
            </PersonalInformationWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    isBillingInfoUpdated: state.recruiter.profile.isBillingInfoUpdated,
});

const mapDispatchToProps = {
    updateBillingInfo,
    getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingInformation);