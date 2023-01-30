import { useState, useRef, useEffect, useCallback} from "react"
import Selector from "../components/Selector"
import { initial } from "../store/initial.data"

const Layout = () =>{
    const [blocks, updateBlocks]= useState(initial)
	console.log(blocks)
    const [isClickAnywhere, setIsClickAnywhere] = useState(false)
	const [isEnter, setEnter] = useState(0)
    // const replaceNode = () =>{
    //     const node = document.querySelector('.editor div')
    //     const p = document.createElement("p");
    //     p.innerHTML = node.innerHTML
    //     node.replaceWith(p)
    // }

    const blockRef = useRef(0)
    useEffect(() => {
        blockRef.current.focus();
      }, [blocks.length]);
	
	useEffect(()=>{
		addBlock()
	},[isEnter])

    window.addEventListener('keydown', (e)=>{
        if (e.key ==='Enter'){
            e.preventDefault()
        }
    })
    // window.addEventListener('keyup', (e)=>{
    //     if (e.key ==='Enter'){
    //         e.preventDefault()
    //         // addBlock() //会不停循环 callback
    //         setEnter(isEnter+1)
    //     }
    // })
    // window.addEventListener('click', ()=>{
    //     setIsClickAnywhere(true)
    // })

    const addBlock = useCallback(()=>{
        updateBlocks(()=>[...blocks, {
            id:blocks[blocks.length-1].id+1,
            blockStyle:'p',
            content: ''
        }])
    }, [blocks])

    // const deleteBlock = useCallback((id)=>{
    //     const newBlocks = blocks.filter(block=>block.id != id)
    //     updateBlocks(newBlocks)
    // }, [blocks])

    const handleBlockContent = (id) =>{
		let content = document.querySelector(`.editor[name="${id}"]`).innerHTML
        const newBlocks = blocks.map(block=>{
            if(block.id === id){
                return {...block, content: content}
            }else{
                return block
            }
        })
        updateBlocks(newBlocks)
    }
    


    
    return (
        <main>
            <nav className="params">
                <ul>
                    <li>Paper Style</li>
                    <li>No Indent</li>
                    <li onClick={addBlock}>Add Block</li>
                </ul>
            </nav>
            <Selector/>
			{isEnter}
            <div>
                { 
                    blocks.map((block, index)=>{
                        if(index===blocks.length-1){
                            return <div onInput={()=>handleBlockContent(block.id)} className="editor" contentEditable="true" name ={block.id} suppressContentEditableWarning={true} key={index} value={block.content} onChange={e=>handleBlockContent(block.id, e)} ref={blockRef} style={{color:"red"}}/>
                        }else{
                            return <div onInput={()=>handleBlockContent(block.id)} className="editor" contentEditable="true" key={index} name ={block.id} value={block.content} suppressContentEditableWarning={true} onChange={e=>handleBlockContent(block.id, e)}/>
                        
                        }
                        
                        
                    })
                }
            </div>
        </main>
    )
}

export default Layout