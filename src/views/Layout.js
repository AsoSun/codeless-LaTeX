import { useState, useRef, useEffect} from "react"
import { initial } from "../store/initial.data"
import {getCurrentCaretPosition, moveCaret, moveCaretToEnd} from "../utils/caretPosition"

const Layout = () =>{
    const [blocks, updateBlocks]= useState(initial)
	const [blockId, updateBlockId] = useState(initial.length-1) //current focuses block id
    const [blockIndex, updateBlockIndex] = useState(initial.length-1) //current focuses block index
	const [isIndent, setIsIndent] = useState(false)
	const [isDeleBlock, setIsDeleBlock] = useState(false)
	const [LastBlockContentLength, setLastBlockContentLength] = useState()
	const [isOnBlur, setIsOnBlur] = useState(false)
	const blockRef = useRef([])


	
    useEffect(() => {
		blocks.forEach((block, index)=>{
			blockRef.current[index].textContent = block.content
		})
		blockRef.current[blockIndex].focus();
		if(isDeleBlock){
			console.log(LastBlockContentLength)
			moveCaret(LastBlockContentLength)
		}
		setIsDeleBlock(false)
      }, [blockIndex]);

	useEffect(()=>{
		blockRef.current[blockIndex].focus();
		moveCaretToEnd()
		setIsOnBlur(false)
	  },[isOnBlur])


	function handleOnKeyDown(index, e){
		
		if(e.key === 'Enter'){
			e.preventDefault()
			insertBlock(index)		
		}
		else if(e.key === 'Backspace' || e.key === 'Delete'){
			const lengthOfCharBeforeCursor = getCurrentCaretPosition()
			if(lengthOfCharBeforeCursor===0 && blocks.length!== 1){
				e.preventDefault()
				deleteBlock(index)
				setIsDeleBlock(true)
					
			}
		}
	}

	const insertBlock = (index)=>{ //index of the blocks array
		const currentCursorPosition = getCurrentCaretPosition()
		const contentAfterCursor = blocks[index].content.slice(currentCursorPosition)
		const blocksCopy = blocks.map(block=>block)
		blocksCopy[index].content = blocks[index].content.slice(0,currentCursorPosition)
		const insertBlock = {id: blockId+1, blockStyle: 'p', content: contentAfterCursor}
		blocksCopy.splice(index+1, 0, insertBlock) // insert a new block below the current block
		updateBlocks(blocksCopy)
		updateBlockId(blockId+1)
		updateBlockIndex(index+1)
	}

	const deleteBlock = (index) => {
		const blocksCopy = blocks.map(block=>block)
		setLastBlockContentLength(blocksCopy[index-1].content.length)
		blocksCopy[index-1].content = blocksCopy[index-1].content+blocksCopy[index].content
		blocksCopy.splice(index, 1) //remove current block

		
		updateBlocks(blocksCopy)
		if(index === 0){
			updateBlockIndex(0)
		}else(
			updateBlockIndex(index-1)
		)
		
	}


    const handleBlockContent = (id, e) =>{
		// let content = document.querySelector(`.editor[name="${id}"]`).innerHTML
		console.log(`On Input textContent: ${e.target.textContent}`)
        const newBlocks = blocks.map(block=>{
            if(block.id === id){
                return {...block, content: e.target.textContent}
            }else{
                return block
            }
        })
        updateBlocks(newBlocks)
    }
	
	const handleBlockStyle = (id, e) =>{
        const newBlocks = blocks.map(block=>{
            if(block.id === id){
                return {...block, blockStyle: e.target.value}
            }else{
                return block
            }
        })
		// console.log(`New block Style: ${e.target.value}, work on id: ${id}`)
		updateBlocks(newBlocks)
	}
    const Selector = ({block}) =>{
		return (
			<div className="selector-form">
				<form>
					<select value = {block.blockStyle} onChange={e=>handleBlockStyle(block.id, e)}>
						<option value = 'h1'>\title</option>
						<option value = 'h2'>\section</option>
						<option value = 'h3'>\subsection</option>
						<option value = 'p'>paragrah</option>
						<option value = 'abstract'>\abstract</option>
						<option value = 'equation'>equation</option>
					</select> 
				</form>
			</div>
		)
	}

	const handlePaste = (e, index) =>{
		e.preventDefault()
		const plainData = e.clipboardData.getData('text/plain');
		blockRef.current[index].innerHTML = blocks[index].content+plainData
		updateBlocks(blocks.map((block, idx)=>{
			if(index === idx){
				return {...block, content: block.content+plainData}
			}else{
				return block
			}
		}))
	}
	
	const handleIndent = () => {
		updateBlocks(blocks.map((block, index)=>{
			if(block.blockStyle === 'p'){
				blockRef.current[index].innerHTML = '&nbsp;&nbsp;'+block.content
				return {...block, content: '&nbsp;&nbsp;'+block.content}
				
			}else{
				return block
			}
		}))
		// setIsIndent(true)
	}

    
    return (
        <main>
            <nav className="params">
			{/* <button>current block index: {blockIndex}</button> */}
                <div className="navbar">
				
                    <div className="navbar-items">Paper Style</div>
                    <div className="navbar-items"onClick={isIndent?{}:handleIndent}>Indent All</div>
					
                </div>
            </nav>
				<div>
				
	
				<div
					id='editor'
					// onBlur={()=>setIsOnBlur(true)}
				
				>
                { 
                    blocks.map((block, index)=>{
                        
                        return(
							<div className="content-block">
								<div >
									
										
									<div contentEditable={false} className={`selector`}><Selector block = {block}/></div>
											
									
								</div>
								
								<div 
									// tabIndex= {1} 
									onPaste={(e)=>handlePaste(e, index)}
									// onFocus={()=>handleOnFocus(index)} 
									className = {`content ${block.blockStyle}`} 
									
									ref={e=>blockRef.current[index]=e} 
									onKeyDown={e=>handleOnKeyDown(index,e)} 
									onInput={(e)=>handleBlockContent(block.id, e)} 
									name = {block.id}   
									key={block.id}
									contentEditable={true} 
									onFocus={()=>updateBlockIndex(index)}
									suppressContentEditableWarning={true}/>
							    </div> 

						)   
                    })
                }
				</div>
				</div>
           
        </main>
    )
}

export default Layout