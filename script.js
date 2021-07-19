const textbox = document.querySelector('#textbox');
let samplebtn = document.querySelector('.items');

samplebtn.addEventListener("click", (e) => {

    if (e.target.className.includes('star'))
        handleClickFavoriteBtn(e)
    else if (e.target.className.includes('trash'))
        handleClickDeleteBtn(e)
})

// initialise
function initialiseList() {
    let list = fetchDataFromLS()
    for (let i = 0; i < list.length; i++) {
        buildList(list[i]);
    }
}

function handleClickFavoriteBtn(e) {
    e.preventDefault();
    let item = e.target.className;

    (item.includes('far')) ?
        e.target.className = 'fas fa-star'
        :
        e.target.className = 'far fa-star'
}

function handleClickDeleteBtn(e) {
    e.preventDefault();
    let item = e.target.parentNode.parentNode.parentNode;
    item.remove();

    if (typeof window !== 'undefined' && window) {
        let arr = JSON.parse(localStorage.getItem('friends')) || [];
        arr.splice(arr.indexOf(item.innerHTML), 1);
        console.log(arr)
        localStorage.setItem('friends', JSON.stringify(arr));
    }
}

function removeListeners() {
    for (let i = 0; i < favBtn.length; i++) {
        favBtn[i].removeEventListener("click", (e) => {
            handleClickFavoriteBtn(e, i)
        })
        delBtn[i].removeEventListener("click", (e) => {
            handleClickDeleteBtn(e)
        })
    }
}

textbox.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
        let text = textbox.value;
        addItem(text);
        textbox.value = '';
    }
})

// add item in list
function addItem(item) {

    buildList(item);

    if (typeof window !== 'undefined' && window) {
        const arr = JSON.parse(localStorage.getItem('friends')) || [];
        arr.push(item)
        localStorage.setItem('friends', JSON.stringify(arr));
    }
}

function buildList(item) {
    let list = document.querySelector('#items');
    let li = document.createElement('li');
    let span = document.createElement('span');
    buildAnchors(span)

    li.className = 'item';
    li.innerHTML = item;
    li.appendChild(span);
    list.appendChild(li);
}

function buildAnchors(span) {
    let anchor = document.createElement('a');
    anchor.className = "btn fav-btn";
    anchor.href = "#"
    anchor.innerHTML = '<i class="far fa-star"></i>';

    let anchorTwo = document.createElement('a');
    anchorTwo.className = "btn del-btn";
    anchorTwo.href = "#"
    anchorTwo.innerHTML = '<i class="far fa-trash-alt"></i>';

    span.appendChild(anchor);
    span.appendChild(anchorTwo);
}

function fetchDataFromLS() {
    let arr = JSON.parse(localStorage.getItem('friends')) || [];
    return arr;
}

initialiseList()