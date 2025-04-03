import React, { useState, useEffect } from "react";

const Message = (props) => {
    const [done, setDone] = useState(false);

    const handleClick = () => {
        setDone(true);
    };

    return (
        <>
            {done == false ? 
                <div className={props.type ? "success" : "fail"}>
                    <h2 style={{ marginInline: "10px", color: "white", marginBlock: "0px", padding: "0px" }}>{props.data}</h2>
                    <button onClick={handleClick} style={{ paddingInline: "15px", backgroundColor: "#55e", height: "fit-content", margin: "0px"}}>
                        <h4 style={{margin: "0px", padding: "0px"}}>OK</h4>
                    </button>
                </div>
                : null
            }
        </>
    );
}

export default Message;
