import React from "react";
import { AboutWrapper, Label, KeyValueWrapper } from "./style";

const Billing = ({user}) => {
    return(
        <AboutWrapper>
            <Label
                style={{
                    marginBottom: "1rem",
                    borderBottom: "1px solid #c2c2c2",
                }}
            >
                Billing Information
            </Label>
            <KeyValueWrapper>
                <Label
                style={{
                    marginBottom: "1rem",
                    borderBottom: "1px solid #c2c2c2",
                }}>{user.contact_person}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <Label
                style={{
                    marginBottom: "1rem",
                    borderBottom: "1px solid #c2c2c2",
                }}>{user.account_number}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <Label
                style={{
                    marginBottom: "1rem",
                    borderBottom: "1px solid #c2c2c2",
                }}>{user.billing_name}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
                <Label
                style={{
                    marginBottom: "1rem",
                    borderBottom: "1px solid #c2c2c2",
                }}>{user.GST_number}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
            <Label
            style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #c2c2c2",
            }}>{user.company_identification_number}</Label>
            </KeyValueWrapper>
            <KeyValueWrapper>
            <Label
            style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #c2c2c2",
            }}>{user.service_tax_number}</Label>
            </KeyValueWrapper>    
            <KeyValueWrapper>
            <Label
            style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #c2c2c2",
            }}>{user.billing_name}</Label>
            </KeyValueWrapper>    
                
                
        </AboutWrapper>
    )
}

export default Billing;