import { useState, useRef, useEffect, useCallback} from "react"
import Selector from "../components/Selector"
import { initial } from "../store/initial.data"

const Layout = () =>{
    const [blocks, updateBlocks]= useState(initial)
	const [blockId, updateBlockId] = useState(0)
    const [blockIndex, setBlockIndex] = useState(0)
	const [isEnter, setEnter] = useState(0)
    // const replaceNode = () =>{
    //     const node = document.querySelector('.editor div')
    //     const p = document.createElement("p");
    //     p.innerHTML = node.innerHTML
    //     node.replaceWith(p)
    // }

    const blockRef = useRef([])
	console.log(blocks)
	console.log(blockRef)

    useEffect(() => {
        blockRef.current[blockIndex].focus();

      }, [blockIndex]);
	


	const handleOnKeyDown = (index, e) =>{
		if(e.key === 'Enter'){
			e.preventDefault()
			// setEnter(isEnter+1)
			insertBlock(index)
		}else if(e.key === 'Backspace' || e.key === 'Delete'){
			if(blocks[index].content===''&& blocks.length!== 1){
				deleteBlock(index)
			}
		}
	}

	const insertBlock = (index)=>{ //index of the blocks array
		const blocksCopy = blocks.map(block=>block)
		const insertBlock = {id: blockId+1, blockStyle: 'p', content: ''}
		blocksCopy.splice(index+1, 0, insertBlock) // insert a new block below the current block
		updateBlocks(blocksCopy)
		updateBlockId(blockId+1)
		setBlockIndex(index+1)
	}

	const deleteBlock = (index) => {
		const blocksCopy = blocks.map(block=>block)
		blocksCopy.splice(index, 1) //remove current block
		updateBlocks(blocksCopy)
		setBlockIndex(index-1)
		// blockRef.current.splice(index, 1) //delete current ref not working
		// console.log(`ref current after delete`, blockRef)
	}

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
                </ul>
            </nav>
            <Selector/>
			{isEnter}
            <div>
                { 
                    blocks.map((block, index)=>{
                        
                        return(
							
								<div tabindex= '0' ref={e=>blockRef.current[index]=e} onKeyDown={e=>handleOnKeyDown(index,e)} onInput={()=>handleBlockContent(block.id)} name = {block.id} className="editor" contentEditable="true" key={block.id} suppressContentEditableWarning={true}/>
							

						)
						
						
                        
                        
                    })
                }
            </div>
        </main>
    )
}

export default Layout