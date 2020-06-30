import styled, { css } from "styled-components";

export const PersonalInformationWrapper = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: column;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-sizing: border-box;
`;

export const InputWrapper = styled.div`
    display: grid;
    width: 100%;
    height: auto;
    grid-template-columns: repeat(2, minmax(22rem, 1fr));
    gap: 1rem;
    align-items: center;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    box-sizing: border-box;
`;

export const SubmitWrapper = styled.div`
    display: flex;
    width: 50%;
    justify-content: flex-end;
`;