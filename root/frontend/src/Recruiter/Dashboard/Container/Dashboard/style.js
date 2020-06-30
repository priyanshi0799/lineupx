import styled, {css} from "styled-components";

export const DashboardWrapper = styled.section`
    display: grid;
    row-gap: 2rem;
    position: relative;
`;

export const HorizontalWrapper = styled.div`
    display: flex;
    width: 70%;
    height: 20rem;
    justify-content: space-between;
    padding: 1rem 0;
    box-sizing: border-box;
`;

export const HorizontalWrapperFilled = styled.div`
    display: flex;
    width: 100%;
    height: 25rem;
    justify-content: space-between;
    padding: 1rem 0;
    box-sizing: border-box;
    background-color: #f2f2f2;
    top: 0rem;
    /* border-radius: 0.3rem; */
    /* box-shadow: 3px 9px 10px rgba(0, 0, 0, 0.15); */
`;

export const AnimatedWrapper = styled.div`
    display: ${props => props.count > 3 ? `block` : `none`};
    position: sticky;
    width: 70%;
    height: 100vh;
    background-color: #fff;
    z-index: 0;
`
