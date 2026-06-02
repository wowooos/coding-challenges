/** code review feedback */

// tracks and manages feedbacks 
// feedbacks on various aspects of code quality

import { useState, useEffect } from "react";
import FeedbackSystem from './components/CodeReviewFeedback.tsx';
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    /** feedback cards */
    --bg-color: #F7F8F9;

    --color-upvote: #4EE000;
    --color-downvote: #E02500;
    --color-text: #242424;

    --color-border: grey;
    --card-shadow: 10px 10px black;

    /** toggle button */
    --toggle-button-border: 1px solid black;
  }
  
  [data-theme="dark"] {
    /** feedback cards */
    --bg-color: black;
    
    --color-bg-card: #F7F8F9;
    --color-border: black;
    --card-shadow: 10px 10px whitesmoke;
    
    /** toggle button */
    --toggle-button-color-text: whitesmoke;
    --toggle-button-bg-color: black;
    --toggle-button-border: 1px solid whitesmoke;
  }

  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  body {
    /* background-color: #F7F8F9; */
    font-family: Arial, Helvetica, sans-serif;
    background-color: var(--bg-color);
  }

  div{
    display: grid;
    grid-template-rows: 2;
  }
  
`;

const FeedbackContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px 24px;

  padding: 32px;

  /* justify-content: center; */
  /* align-content: center; */
  // place-content: center;
`;

const ToggleButton = styled.button`
  padding: 4px;
  font-family: monospace;

  width: 10%;
  justify-self: center;

  color: var(--toggle-button-color-text);
  background-color: var(--toggle-button-bg-color);

  border: var(--toggle-button-border);

  cursor: pointer;
`;
function App(){
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  console.log(darkMode);

  return(
    <div>
      <GlobalStyles/>
      <FeedbackContainer>
        <FeedbackSystem/>
      </FeedbackContainer>

      <ToggleButton onClick={() => setDarkMode(!darkMode)}>TOGGLE THEME</ToggleButton>
    </div>
  )
}

export default App;