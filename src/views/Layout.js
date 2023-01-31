import { useState, useRef, useEffect} from "react"
import { initial } from "../store/initial.data"

const Layout = () =>{
    const [blocks, updateBlocks]= useState(initial)
	const [blockId, updateBlockId] = useState(1) //current focuses block id
    const [blockIndex, setBlockIndex] = useState(1) //current focuses block index
	const [isIndent, setIsIndent] = useState(false)
	const [blockStyle, setBlockStyle] = useState()
	const [blockType, setBlockType] = useState()
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
	console.log(blockIndex)
    useEffect(() => {
        blockRef.current[blockIndex].focus();
		blocks.map((block, index)=>{
			blockRef.current[index].innerHTML = block.content
		})
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
		if(index === 0){
			setBlockIndex(0)
		}else(
			setBlockIndex(index-1)
		)
	
		//inject content back to innerhtml

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
	const handleBlockStyle = (id, e) =>{
        const newBlocks = blocks.map(block=>{
            if(block.id === id){
                return {...block, blockStyle: e.target.value}
            }else{
                return block
            }
        })
		console.log(`New block Style: ${e.target.value}, work on id: ${id}`)
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
						<option value = 'table'>\abstract</option>
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
		setIsIndent(true)
	}
    
    return (
        <main>
            <nav className="params">
			<button>Source mode</button>
                <div className="navbar">
				
                    <div className="navbar-items">Paper Style</div>
                    <div className="navbar-items"onClick={isIndent?{}:handleIndent}>Indent All</div>
					
                </div>
            </nav>
            <div>
				{/* {isEnter} */}
                { 
                    blocks.map((block, index)=>{
                        
                        return(
							<div className="content-block">
								<div className={`selector`}><Selector block = {block}/></div>
								<div 
									tabIndex= '0' 
									onPaste={(e)=>handlePaste(e, index)}
									// onFocus={()=>handleOnFocus(index)} 
									className = {`editor ${block.blockStyle}`} 
									ref={e=>blockRef.current[index]=e} 
									onKeyDown={e=>handleOnKeyDown(index,e)} 
									onInput={()=>handleBlockContent(block.id)} 
									name = {block.id}  
									contentEditable="true" 
									key={block.id} 
									suppressContentEditableWarning={true}/>
							</div>

						)
						
						
                        
                        
                    })
                }
            </div>
        </main>
    )
}

export default Layout