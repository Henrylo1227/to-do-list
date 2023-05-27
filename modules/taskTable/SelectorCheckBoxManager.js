//return a list selectors in the table
function getSelectorList(){
    const selectorCollection = document.querySelectorAll('input.form-check-input');
    return selectorCollection;
}

function getCheckedSeletorList(){
    const checkedSelectorList = {};
    const selectorList = getSelectorList();
    for (let i = 0; i < selectorList.length; i++){
        if (selectorList[i].checked == true){
            checkedSelectorList.push(selectorList[i]);
        }
    }
    return checkedSelectorList;
}

function checkAllSelectors(){
    const selectorList = getSelectorList();
    for (let i = 0; i < selectorList.length; i++){
        selectorList[i].checked = true;
    }
}

function uncheckAllSelectors(){
    const selectorList = getSelectorList();
    for (let i = 0; i < selectorList.length; i++){
        selectorList[i].checked = false;
    }
}

export{checkAllSelectors, uncheckAllSelectors};