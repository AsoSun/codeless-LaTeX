

const Block = ({key, value, handleChange}) =>{
    return(
        <div contentEditable="true" key={key} value={value} onChange={handleChange}></div>
    )
}

export default Block