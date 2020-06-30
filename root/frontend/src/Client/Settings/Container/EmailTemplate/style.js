import styled from "styled-components";

export const FeedbackFormWrapper = styled.div`
    display: grid;
    width: 100%;
    height: fit-content;
    gap: 1rem;
    padding: 3rem;
`;

export const SubmitWrapper = styled.div`
    display: grid;
    width: 100%;
    justify-content: start;
    gap: 1rem;
    grid-auto-flow: column;
`;

export const TagWrapper = styled.div`
    display: grid;
    width: fit-content;
    height: fit-content;
    grid-auto-flow: column;
    column-gap: 2rem;
`;
