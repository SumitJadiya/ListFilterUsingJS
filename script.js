const data = {
    "data": [
        { "name": "Sumit", "is_fav": 'true' },
        { "name": "Jadiya", "is_fav": 'N' },
        { "name": "STJ", "is_fav": 'N' },
        { "name": "Sachin", "is_fav": 'Y' },
        { "name": "Babuji", "is_fav": 'Y' },
        { "name": "Praful", "is_fav": 'N' },
        { "name": "Hansa", "is_fav": 'Y' },
    ]
}

const textbox = document.querySelector('#textbox');
let items = document.querySelector('.items');

// initialise
function initialiseList(list) {
    for (let i = 0; i < list.length; i++)
        buildList(list[i]);
}

function fetchDataFromLS() {
    return JSON.parse(localStorage.getItem('friends')) || [];
}

// handle favorites
function handleClickFavoriteBtn(e) {
    e.preventDefault();
    let mainItem = e.target.className;

    (mainItem.includes('far')) ?
        e.target.className = 'fas fa-star'
        :
        e.target.className = 'far fa-star'

    if (typeof window !== 'undefined' && window) {
        let arr = JSON.parse(localStorage.getItem('friends')) || [];
        var filteredAry = arr.map((item) => {
            if (e.target.parentNode.parentNode.parentNode.innerText === item.name) {
                item.is_fav = !item.is_fav
            }
            return item
        });

        localStorage.setItem('friends', JSON.stringify(filteredAry));
    }
}

// handle delete
function handleClickDeleteBtn(e) {
    e.preventDefault();
    let mainItem = e.target.parentNode.parentNode.parentNode;
    mainItem.remove();

    if (typeof window !== 'undefined' && window) {
        let arr = JSON.parse(localStorage.getItem('friends')) || [];
        var filteredAry = arr.filter(function (item) { return mainItem.innerText !== item })
        localStorage.setItem('friends', JSON.stringify(filteredAry));
    }
}

// add item in list
function addItem(item) {

    buildList(item);
    if (typeof window !== 'undefined' && window) {
        const arr = JSON.parse(localStorage.getItem('friends')) || [];
        arr.push(item)
        localStorage.setItem('friends', JSON.stringify(arr));
    }
}

// build list
function buildList(item) {
    let list = document.querySelector('#items');
    let li = document.createElement('li');
    let span = document.createElement('span');
    buildAnchors(span, item)

    li.className = 'item';
    li.innerHTML = item.name;
    li.appendChild(span);
    list.appendChild(li);
}

// build anchors
function buildAnchors(span, item) {
    let anchor = document.createElement('a');
    anchor.className = "btn fav-btn";
    anchor.href = "#"
    anchor.innerHTML = (item.is_fav) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';

    let anchorTwo = document.createElement('a');
    anchorTwo.className = "btn del-btn";
    anchorTwo.href = "#"
    anchorTwo.innerHTML = '<i class="far fa-trash-alt"></i>';

    span.appendChild(anchor);
    span.appendChild(anchorTwo);
}

// clear list items
function clearList() {
    items.innerHTML = '';
}

// debouncing
function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// search in list and print result
function saveInput() {
    let input = textbox.value;
    let arr = fetchDataFromLS();
    let result = [];

    console.log(arr[0].name)

    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].name)
        if ((arr[i].name).toLowerCase().includes(input.toLowerCase())) result.push(arr[i].name);
    }

    clearList()
    initialiseList(result)
    return result;
}

const processChange = debounce(() => saveInput());

// listeners
items.addEventListener("click", (e) => {
    if (e.target.className.includes('star'))
        handleClickFavoriteBtn(e)
    else if (e.target.className.includes('trash'))
        handleClickDeleteBtn(e)
})

textbox.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
        let textObj = { "name": textbox.value, "is_fav": false };
        addItem(textObj);
        textbox.value = '';
    }
})

textbox.addEventListener("keyup", processChange)

// go to point
initialiseList(fetchDataFromLS())