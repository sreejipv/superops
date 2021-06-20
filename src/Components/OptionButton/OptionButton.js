import React from 'react';
import classNames from 'classnames';



const OptionButton = (props) => {
    const {
        children,
        label,
        className,
        type,
        style,
        onClick
      } = props

const buttonClass = classNames({
    'bg-red': type === 'delete',
    'bg-blue': type === 'edit',
},
'flex-center',
'flex-column',
'flex',
'c-white',
'br-4',
'mr-1',
className
)
    return (
        <div className={buttonClass} style={style}>
            <div style={{transform:'rotate(270deg)'}}>{label}</div>
            <div className="mt-10">
                {children}
            </div>
        </div>
    );
};

export default OptionButton;