

const Selector = () =>{
    return (
        <div className="selector-form">
            <form className="form">
                <select value = {blockType} className='selector-panel'>
                    <option value = 'title'>Title</option>
                    <option value = 'section'>section</option>
                    <option value = 'subsection'>subsection</option>
                    <option value = 'p'>paragrah</option>
                    <option value = 'table'>table</option>
                    <option value = 'equation'>equation</option>
                </select>
            </form>
        </div>
    )
}
export default Selector