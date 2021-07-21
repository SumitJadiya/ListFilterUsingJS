const data = fetchDataFromLS()

const textbox = document.querySelector('#textbox');
let items = document.querySelector('.items');
let sortBy = document.querySelector('.sortbyList');

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
            if (e.target.parentNode.parentNode.parentNode.innerText === item.name)
                item.is_fav = !item.is_fav

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
        var filteredAry = arr.filter(function (item) { return mainItem.innerText !== item.name })
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

    for (let i = 0; i < arr.length; i++)
        if ((arr[i].name).toLowerCase().includes(input.toLowerCase())) result.push(arr[i]);

    clearList()
    initialiseList(result)
    return result;
}

const processChange = debounce(() => saveInput());

// sorting
function sortItem(sortAttr) {

    let data = fetchDataFromLS();
    sortListByAttr(data, sortAttr)
    clearList()
    initialiseList(data)
}

function sortListByAttr(data, sortAttr) {
    for (let j = 0; j < data.length - 1; j++) {

        let maxHelper = getMaxDataObject(data, j, sortAttr)

        let max_location = maxHelper['max_index']
        data[max_location] = data[j]
        data[j] = maxHelper['max_object']
    }
    return data
}

function getMaxDataObject(data, start, sortAttr) {
    let maximum = data[start];
    let max_location = start

    for (let i = start; i < data.length; i++) {
        if (sortAttr === 'name' && (data[i][sortAttr]).toLowerCase() > maximum[sortAttr].toLowerCase() || data[i][sortAttr] > maximum[sortAttr]) {
            maximum = data[i]
            max_location = i
        }
    }
    return { max_object: maximum, max_index: max_location }
}
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

sortBy.addEventListener("change", (e) => {
    sortItem(e.target.value)
})

// go to point
initialiseList(fetchDataFromLS())