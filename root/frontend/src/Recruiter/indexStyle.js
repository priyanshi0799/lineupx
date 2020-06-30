import styled from 'styled-components';

export const ClientWrapper = styled.main`
    display: grid;
    height: auto;
    min-height: 100vh;
    grid-template-columns: 0.2fr 1fr 1fr 0.1fr;
    grid-template-rows: 5rem 1fr;
    gap: 1px 1px;
    grid-template-areas: "NavBar NavBar NavBar NavBar" ". MainContent MainContent .";
    box-sizing: border-box;
    background-color: #f2f2f2;
`