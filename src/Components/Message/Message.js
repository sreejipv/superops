import React, { forwardRef, useEffect, useRef, useState } from 'react';
import OptionButton from "../OptionButton";
import { ReactComponent as EditIcon }  from '../../assets/svg/edit.svg'
import { ReactComponent as DeleteIcon }  from '../../assets/svg/delete.svg'

const Message = (props) => {
        const content = props.data.content;
        const authorName = props.data.author.name;
        const authorPhoto = props.data.author.photoUrl;
        const swipeRef = useRef(null);
        const [startPos, setStartPos] = useState(0);
        const [swipeBlocked, setSwipeBlocked]  = useState(false)
        const [swipeDistance, setSwipeDistance]  = useState(0);
        const [postedDate, setPostedDate] = useState('')

        const swipeContainer = {swipeRef};
        const currentDate = (new Date()).toDateString().split(' ').slice(1).join(' ');
        const dateCreated = (new Date(props.data.updated)).toDateString().split(' ').slice(1).join(' ');

   

        useEffect(()=>{
            const diffInDays = (new Date(currentDate)).getTime() - (new Date(dateCreated)).getTime();
    
            const day = 1000 * 60 * 60 * 24;
            const days = Math.floor(diffInDays/day)
            const months = Math.floor(days/31)
            const years = Math.floor(months/12)

            if(days === 0) {
                setPostedDate('today')
            }else if(days === 1) {
                setPostedDate('yesterday')
            }else if(years === 1) {
                setPostedDate(`${years} year ago`)
            } else if(years > 1) {
                setPostedDate(`${years} years ago`)
            }else if(months < 12) {
                setPostedDate(`${months} months ago`)
            }
      
        },[])
        
        function handleTouchStart(touchStartEvent) {
            if(swipeDistance === 100){
                setSwipeBlocked(true);
            }else{
                setStartPos(touchStartEvent.touches[0].clientX);
            }
        }


        function handleTouchMove(touchMoveEvent) {
           
            
            if(!swipeBlocked) {
                if((touchMoveEvent.touches[0].clientX - startPos) >0 && (touchMoveEvent.touches[0].clientX - startPos) <=100) {
                    setSwipeDistance(touchMoveEvent.touches[0].clientX - startPos);
                }
            }
        }

        function handleClick() {
            if(swipeDistance === 100){
                setSwipeDistance(0); 
                setSwipeBlocked(false)
            }
        }

        function handleTouchEnd() {
            console.log('end', swipeDistance);
               if(swipeDistance < 60) {
                    setSwipeDistance(0)
                }else if(swipeDistance > 60) {
                    setSwipeDistance(100)

                }
    

        }

        return (
            <div className=" mx-5 px-5 py-5 elevation-6 mb-5 p-relative">
                
                <div className="ox-hidden p-absolute flex" 
                    style={{width: `${swipeDistance}px`, height: '85%', top: '0', bottom: '0', margin: 'auto'}}>
                    <OptionButton type="delete" label="Delete" style={{flexBasis:  '50%'}}>
                        <DeleteIcon/>
                    </OptionButton>
                    <OptionButton type="edit" label="Edit" style={{flexBasis:  '50%'}}>
                        <EditIcon width="14" height="14"/>
                    </OptionButton>
                </div>

                <div ref={swipeRef} className="w-100p flex-column flex-start "  
                    onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
                    style={{width: `calc(100% - ${swipeDistance}px)`,transform: `translate3d(${swipeDistance}px, 0px, 0px)`}} onClick={handleClick}
                    >
                    <div className="pl-2">
                        <div className="flex">
                            <div className="">
                                <img src={props.url+authorPhoto} width="40" className="br-100"/>
                            </div>
                            <div className="ta-left pl-3 flex flex-center flex-column ">
                                <p className="fw-600 m-0">{authorName}</p>
                                <p className="m-0 fs-1 c-grey-80 ta-left">{postedDate}</p>
                            </div>
                        </div>
                        <p className="ls-normal lh-solid ta-left pl-3">
                            {content}
                        </p>
                    </div>    
   
                </div>  
            </div>
        );
    };

export default Message;