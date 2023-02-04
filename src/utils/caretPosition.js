
export const getCurrentCaretPosition = () =>{
    const selection = document.getSelection()
    //if selected area type is text, return the number(length) of char before the caret/cursor
    //focusOffset is read only, i.e. a getter
    console.log(selection.focusOffset)
    return selection.focusOffset
}

export const moveCaret = (charLocation) =>{
    const selection = document.getSelection()
    if(selection.rangeCount>0){ // Before the user has clicked a freshly loaded page, the rangeCount is 0. After the user clicks on the page, rangeCount is 1, even if no selection is visible.
        const textNode = selection.focusNode
        const newOffset = selection.focusOffset + charLocation
        selection.collapse(textNode, Math.min(textNode.length, newOffset))
    }
}

export const moveCaretToEnd = () =>{
    const selection = document.getSelection()
    if(selection.rangeCount>0){ // Before the user has clicked a freshly loaded page, the rangeCount is 0. After the user clicks on the page, rangeCount is 1, even if no selection is visible.
        const textNode = selection.focusNode
        selection.collapse(textNode, textNode.length)
    }
}

