import styled from "styled-components";

export const ChangePasswordWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 80vh;
    padding: 1rem;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.4rem;
    box-sizing: border-box;
`;

export const InputFieldWrapper = styled.div`
    display: grid;
    grid-auto-flow: row;
    row-gap: 1rem;
    justify-content: flex-start;
    margin: 2rem;
`;

export const SubmitWrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
`;

export const SubmitButtonWrapper = styled.div`
    display: flex;
    width: 40%;
    justify-content: flex-start;
`;