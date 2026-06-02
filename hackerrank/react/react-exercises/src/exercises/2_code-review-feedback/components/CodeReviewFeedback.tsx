import { useEffect, useState } from "react";
import styled from 'styled-components';

/*
> displays 5 aspects:
 * readability
 * performance
 * security
 * documentation
 * testing
*/

// type Aspect = 'readablity'|'performance'|'security'|'documentation'|'testing';

//---------------------------------------------------------------------------------------
// styled components:

const Card = styled.article`
    background-color: var(--color-bg-card);
    padding: 24px;

    color: var(--color-text);

    border: 1px solid var(--color-border);
    border-radius: 12px;
    box-shadow: var(--card-shadow);

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 16px;
    column-gap: 16px;

    grid-template-areas: 
        'title title'
        'buttonUpvote buttonDownvote'
        'texts texts'
    ;

    h2{
        grid-area: title;
        /* grid-column: 1/span 2; */
    }

    button{
        /* grid-area: buttons; */
        /* justify-self: stretch; */
        /* align-self: start; */
    }

    p{
        /* grid-area: texts; */
        /* padding: 4px; */
    }

`;

const Text = styled.div`
    padding: 4px;
    grid-area: texts;
    /* grid-column: 1/ span 2; */

    /* display: flex; */
    /* flex-direction: row; */
    /* justify-content: space-between; */

    display: grid;
    grid-template-columns: subgrid;
    /* justify-self: center; */
`;

const VoteText = styled.p<{$type:string}>`
    justify-self: left;

    font-size: 0.75em;
    /* font-size: 12px; */

    --pop-color: ${({$type}) => $type==='upvote' ? 'var(--color-upvote)':'var(--color-downvote)'};
    animation: pop 0.4s ease;

    @keyframes pop {
        0% { 
            color: inherit; 
        }

        30% { 
            color: var(--pop-color);
            transform: scale(1.15); 
        }
        
        100% { 
            color: inherit; 
            transform: scale(1); 
        }
    }
`;

const Button = styled.button<{$type:string}>`
    padding: 8px;
    grid-area: ${({$type}) => {
        if($type==='upvote') return 'buttonUpvote';
        if($type==='downvote') return 'buttonDownvote';
    }};
    
    border: 0.5px solid black;
    background-color: ${({$type})=>{
        if($type==='upvote') return 'var(--color-upvote)';
        if($type==='downvote') return 'var(--color-downvote)';
    }};

    transition: background-color 0.35s, opacity 0.35s, transform 0.15s;
    /* transition-delay: 0.15s; */

    &:hover{
        background-color: ${({$type})=>{
            if($type==='upvote') return 'var(--color-upvote)';
            if($type==='downvote') return 'var(--color-downvote)';
        }};
        opacity: 0.8;
        /* transform: rotate(360deg) translate(50px, 100px) scaleX(0.5) scaleY(2); */
        /* transform: skewY(-20deg); */
        /* transform: skew(20deg, 10deg); */
    }

    &:active{
        transform: ${({$type})=>{
            if($type==='upvote') return 'translateY(-2px)';
            if($type==='downvote') return 'translateY(2px)';
        }}
    }
`;

//---------------------------------------------------------------------------------------
// interfaces:

interface AspectCard{
    name:string,
    upvote:number,
    downvote:number
}

//---------------------------------------------------------------------------------------
const FeedbackSystem = () => {
    // const [darkMode, setDarkMode] = useState<boolean>(false);
    const [aspects, setAspects] = useState<AspectCard[]>(
        ['readability', 'performance', 'security', 'documentation', 'testing'].map((a) => 
            ({name:a, upvote:0, downvote:0})
        ) 
    );

    // console.log(aspects);
    //----------------------------------------------------------------------------------
    // handlers: -----------------------------------------------------------------------

    const handleUpvote = (aspectName:string) => {
        // map retorna uma NOVA lista?
        // passar função pra dentro de sets (setTest()) -> o setTest() aceita uma função updater conmo argumento! -> ela recebe o state atual (prev) e retorna o novo state.

        // strict mode runs this TWICE!:
        // item.update+=1 would change/mutate the ORIGINAL object -> it would not assign a value to "upvote"?
        setAspects(prev => {
            // let i:number=0;
            return prev.map((item)=>{
                // console.log(i);
                // i+=1;

                if(item.name===aspectName){
                    // console.log(item.name);
                    return { ...item, upvote: item.upvote+1};
                }else{
                    return item;
                }
            })
        }
        );
    };

    const handleDownvote = (aspectName:string) => {
        setAspects((prev) => {
            return prev.map((item) => {
                if(item.name===aspectName){
                    return { ...item, downvote: item.downvote-1 };
                }else return item;
            });
        });
    };

    //----------------------------------------------------------------------------------
    return(
        <>
        {aspects.map((a, index)=> (
            <Card key={index}>
                <h2>{a.name.charAt(0).toUpperCase() + a.name.slice(1)}</h2>

                <Button $type={'upvote'} onClick={() => handleUpvote(a.name)}>&#8593; Upvote</Button>
                <Button $type={'downvote'} onClick={() => handleDownvote(a.name)}>&#8595; Downvote</Button>

                <Text>
                    <VoteText $type="upvote" key={`upvote-${a.upvote}`}>Upvotes: {a.upvote}</VoteText>
                    <VoteText $type="downvote" key={`downvote-${a.downvote}`}>Downvotes: {a.downvote}</VoteText>
                </Text>

            </Card>
        ))}
        </>
    )
}

export default FeedbackSystem;