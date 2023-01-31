import { useRef, useEffect } from "react";


const Block = ({key, index}) =>{
    return(
        <div onInput={()=>handleBlockContent(key)} className="editor" contentEditable="true" name ={key} suppressContentEditableWarning={true} key={index} ref={blockRef} style={{color:"red"}}/>
    )
}

export default Block