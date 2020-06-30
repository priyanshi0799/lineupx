import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {ChangePasswordWrapper, InputFieldWrapper, SubmitWrapper} from './style';
import Dropdown from '../../../Reusuable/Components/Interactive/inputs/drop-down/drop-down';
import TextArea from '../../../Reusuable/Components/Interactive/inputs/TextArea/TextArea';
import Textfield from '../../../Reusuable/Components/Interactive/inputs/text-field/text-field';
import Button from "../../../Reusuable/Components/Interactive/Button/Button";
import arrowDownIcon from "../../../Assets/Icons/ArrowDown-Icon/arrow-down.png";
import SectionHeader from "../../Components/Interactive/SectionHeader/SectionHeader";
import {supportAndIssueInfo, getUserInfo, getUserIssues} from "../../../Redux/actions/Recruiter/profile";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";
class Support extends Component {

    constructor(props){
        super(props);
        this.props.getUserIssues();
    }

    state = {
        dropDown: [
            {
                toggle: false,
                field: {
                    id: 1,
                    inputType: "text",
                    state: "normal",
                    name: "issues",
                    label: "Issues",
                    placeholder: "Select Issue",
                    value: "",
                    readOnly: true,
                    imgBtn: arrowDownIcon,
                },
                dropdown: [
                    { id: 1, name: "Issue 1", state: "not selected" },
                    { id: 2, name: "Issue 2", state: "not selected" },
                    { id: 3, name: "Issue 3", state: "not selected" },
                    { id: 4, name: "Issue 4", state: "not selected" },
                    { id: 5, name: "Issue 5", state: "not selected" },
                ],
                value: "",
            }
        ],
        textarea: [
            {
                id: 0,
                inputType: "text",
                state: "normal",
                name: "description",
                label: "Description",
                placeholder: "Please enter the description",
                value: "",
                readOnly: false,
            },
        ],
        image: {
            id: 1,
            inputType: "file",
            state: "normal",
            name: "image",
            label: "Image for Validation",
            placeholder: "",
            file: null,
            readOnly: false,
        },
        raiseIssue: false,
        data: []
    }

    handleDropdowntoggle = (index) => {
        let dropDown = this.state.dropDown;
        let dropdownMenu = dropDown[index];
        dropdownMenu.toggle = !dropdownMenu.toggle;

        this.setState({
            dropDown,
        });
    }

    handleDropdownClick = (index, clickDropdown) => {
        let dropDown = this.state.dropDown;
        let dropdownMenu = dropDown[index];
        dropdownMenu.dropdown.forEach((dropdown) => {
            if (
                dropdown.name === clickDropdown &&
                dropdown.state !== "selected"
            ) {
                if (dropdownMenu.isTag === true) {
                    dropdown.state = "selected";
                    if (
                        !dropdownMenu.value.find(
                            (value) => value === clickDropdown
                        )
                    )
                        dropdownMenu.value.push(clickDropdown);
                    dropdownMenu.field.value = "";
                } else {
                    dropdown.state = "selected";
                    dropdownMenu.value = clickDropdown;
                    dropdownMenu.field.value = clickDropdown;
                }
            } else {
                dropdown.state = "not selected";
            }
        });

        if (dropdownMenu.defaultDropdown)
            dropdownMenu.dropdown = dropdownMenu.defaultDropdown.concat();
        this.setState({
            dropDown,
        });

        const scope = this;
        setTimeout(() => {
            scope.handleDropdowntoggle(index);
        }, 150);
    }


    handleImageChange = (e) => {
        const file = e.target.files[0];
        let image = { ...this.state.image };
        image.file = file;
        if (file) {
            this.setState({ image });
        }
    }

    isFormValid = (event) => {
        event.preventDefault();

        let textfield = this.state.textarea;
        let isValid = true;

        if(textfield.value === ''){
            return false
        }

        let dropDownActive = true;
        this.state.dropDown.forEach((dropDown) => {
            if (dropDown.value.length === 0) {
                dropDownActive = false;
                dropDown.field.state = "error";
                dropDown.field.hint = `Please provide ${dropDown.field.name}`;
            } else {
                dropDown.field.state = "normal";
                dropDown.field.hint = ``;
            }
        });

        if (!this.state.image.file) {
            isValid = false;
            let image = this.state.image;
            image.state = "error";
            image.hint = "Please provide a image";
            this.setState({ image });
        }

        if (isValid) {
            const data = new FormData();
            data.append("issues", this.state.dropDown[0].value);
            data.append("description", this.state.textarea.value);
            
            data.append(
                "image",
                this.state.image.file,
                this.state.image.file.name
            ); 
            this.props.supportAndIssueInfo(data);      
        }
        return isValid;
    }

    modalCloseHandler = () => {
        this.setState({raiseIssue:false})
    }

    

    render(){

        
        let heading = [
            "Ticket Number",
            "Date of Issue Raised",
            "Issue Raised",
            "Status of Request"
        ]


        return(
            <ChangePasswordWrapper>
                <SectionHeader
                    title="Support and Issues"
                    desc="Please fill in to raise your queries"
                />

                <div>
                    <Table data = {this.props.getSupportAndIssue?.details} heading={heading}/>
                    <Button buttonClick={()=>{this.setState({raiseIssue: true})}} type="dark" label="Raise Issue"/>
                </div>

                
                <Modal show={this.state.raiseIssue} modalClosed={this.modalCloseHandler}>
                    <InputFieldWrapper>
                    <Dropdown
                        dropdownMenu={this.state.dropDown[0]}
                        handleDropdowntoggle={() =>
                            this.handleDropdowntoggle(0)
                        }
                        handleDropdownClick={(name) =>
                            this.handleDropdownClick(0, name)
                        }
                    />
                    <Textfield
                        textfield={this.state.image}
                        handleInputValueChange={(event) => {
                        let image = { ...this.state.image };
                        image.file = event.target.files[0];
                        this.setState({ image });
                        }}
                    />
                        <TextArea
                            textarea={this.state.textarea}
                            key={this.state.textarea.id}
                            handleInputValueChange={(event)=>{
                                let textarea = {...this.state.textarea};
                                textarea.value = event.target.value
                                this.setState({
                                    textarea
                                })
                            }}
                        />
                    </InputFieldWrapper>
                    <SubmitWrapper>
                    <Button
                            buttonClick={this.isFormValid}
                            type="dark"
                            label="Submit"
                        />
                    </SubmitWrapper>
                </Modal>
            </ChangePasswordWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    isSupportAndIssueUpdated: state.recruiter.profile.isSupportAndIssueUpdated,
    getSupportAndIssue: state.recruiter.profile.getSupportAndIssue
})

const mapDispatchToProps = {
    supportAndIssueInfo, 
    getUserInfo,
    getUserIssues
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Support))