// Versão submetida no HackerRank -> em JS, sem styling.
//--------------------------------------------------------------------------

import React, { useState } from "react";

const FeedbackSystem = () => {

  const [aspects, setAspects] = useState(
    ['readability', 'performance', 'security', 'documentation', 'testing'].map((a) => 
      ({name:a, upvote:0, downvote:0})
    )
  );

  // handlers: -------------------------------------------------------------
  const handleUpvote = (aspectName) => {
    setAspects(prev => {
        return prev.map((item)=>{
            if(item.name===aspectName){
                return { ...item, upvote: item.upvote+1};
            }else{
                return item;
            }
        })
    });
  };
  
  const handleDownvote = (aspectName) => {
      setAspects((prev) => {
          return prev.map((item) => {
              if(item.name===aspectName){
                  return { ...item, downvote: item.downvote+1 };
              }else return item;
          });
      });
  };
  //--------------------------------------------------------------------------
  return (
    <>
    {aspects.map((a, index)=> (
      <article key={index}>
          <h2>{a.name.charAt(0).toUpperCase() + a.name.slice(1)}</h2>

          <button 
            data-testid={`upvote-btn-${index}`} 
            onClick={() => handleUpvote(a.name)}>
            Upvote
          </button>
          <button 
            data-testid={`downvote-btn-${index}`} 
            onClick={() => handleDownvote(a.name)}>
            Downvote
          </button>

          <div>
              <p data-testid={`upvote-count-${index}`}>Upvotes: {a.upvote}</p>
              <p data-testid={`downvote-count-${index}`}>Downvotes: {a.downvote}</p>
          </div>

      </article>
    ))}
    </>
  );
};

export default FeedbackSystem;
