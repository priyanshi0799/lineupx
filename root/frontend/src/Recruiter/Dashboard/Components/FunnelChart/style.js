
import styled, {css, keyframes} from "styled-components";

export const CardWrapper = styled.div`
    display: flex;
    width: 20rem;
    /* height: 100%; */
    flex-direction: column;
    padding: 0 1rem;
    box-sizing: border-box;
    ${props => props.count === 1 && css`
        /* animation-name: ${coolBoxKeyframes};
        animation-duration: 2s;
        animation-timing-function: ease;
        animation-delay: 0s;
        animation-iteration-count: 5; */
        /* animation-direction: normal;
        animation-fill-mode: forwards;
        animation-play-state: running;  
        background-color: green;       */
        animation: ${coolBoxKeyframes}
        animation-duration: 3s;
        animation-fill-mode: forwards;
    `}
`;

const coolBoxKeyframes = keyframes`
    0%{
        height: 0px;
        width: 0px;
    }
    50%{
        height: 50%;
        width: 20%;
    }
    100%{
        height: 100%;
        width: 40%;
        position: absolute;
        top: 3rem;
    }
    
`

export const ContentWrapper = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0.5rem 0;
    box-sizing: border-box;
    overflow: hidden;
`;
