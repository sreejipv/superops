import React, { useEffect, useState, useRef } from 'react';
import Message from "./Message";



const MessageContainer = () => {

    const [messages, setMessages] = useState([]);
    const [pageToken, setPageToken] = useState('');
    
    const url = 'http://message-list.appspot.com/';
    
    const ulRef = useRef(null);

    const getPosts = async(token)=> {
        console.log('im calling getposts');
        const res = await fetch(`${url}messages?pageToken=${token}`)
        if(!res.ok) {
            const message = `An error has occured: ${res.status}`;
            throw new Error(message);
        }
        const data = await res.json();
        setPageToken(data.pageToken);
        setMessages((prev) => {
            return [...new Set([...prev, ...data.messages])];
          });

        
    }
    
        useEffect(()=> {
            getPosts();
        },[])

        const scrollContainer = {ulRef};
        const target = scrollContainer.ulRef.current;

        function handleScroll(e) {            
            if (target.scrollTop + target.clientHeight  >= (target.scrollHeight)) {
                getPosts(pageToken);
              }
              
        }


    return (
        <div>
           
            <div ref={ulRef} 
                onScroll={(e)=>handleScroll(e)} 
                className="pt-15 ox-hidden oy-scroll"
                style={{height: '90vh'}}>
                {messages && messages.map((data, index) => 
                <>
                    {messages.length -1 === index ? <Message key={index}  data={data} url={url}/> : <Message key={index}  data={data} url={url}/>}
                </>
                )}
               
            </div>
            

        </div>

    );
};

export default MessageContainer;