/**
> form:
 - name
 - email
 - message
> submit button
> validation:
 - none of the fields should be empty upon submission
> if validation NOT OK:
 - if any field is empty, display an error message and the form should not be submitted
> if validation OK:
 - display the entered information below the form
 - clear the input fields
 */

import styled from "styled-components";
import { useState } from "react";

// interfaces:
interface UserInfo{
    name:string,
    email:string,
    message:string
}


function App(){
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [messageInput, setMessageInput] = useState<string>("");

    const [emailError, setEmailError] = useState<boolean>(false);
    const [errorOnSubmission, setErrorOnSubmission] = useState<string | null>(null);

    const [userInformation, setUserInformation] = useState<UserInfo | null>(null);


    console.log(errorOnSubmission);

    // handlers:
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // stops the page reload
        if(nameInput && emailInput && messageInput){
            setErrorOnSubmission(null);
            setUserInformation({name:nameInput, email:emailInput, message:messageInput})
            setNameInput("");
            setEmailInput("");
            setMessageInput("");
        }else{
            setErrorOnSubmission("All fields are required!");
        }
    }

    return(
        <>
            <h1>Contact Form</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={(event) => setNameInput(event.target.value)} 
                    onFocus={() => setErrorOnSubmission(false)}
                    value={nameInput}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(event) => setEmailInput(event.target.value)}
                    onBlur={() => {
                        if(!emailInput.includes("@")) setEmailError(true);
                    }} 
                    value={emailInput}
                />
                <textarea placeholder="Message" onChange={(event) => setMessageInput(event.target.value)} value={messageInput}/>

                <input type="submit" value="Submit"/>
            </form>

            {errorOnSubmission && (
                <p>{errorOnSubmission}</p>
            )}

            {!errorOnSubmission && userInformation && (
                <>
                    <h3>User Information:</h3>
                    <p>User name: {userInformation.name}</p>
                    <p>User email: {userInformation.email}</p>
                    <p>User message: {userInformation.message}</p>

                </>
            )}
        </>
    );
}

export default App;