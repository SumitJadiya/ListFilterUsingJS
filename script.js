let favBtn = document.querySelectorAll('.fav-btn');
let delBtn = document.querySelectorAll('.del-btn');
const textbox = document.querySelector('#textbox');

function handleClicks() {
    for (let i = 0; i < favBtn.length; i++) {
        favBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            toggleFavourite(i)
        })

        delBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            console.log("del", i)
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
    let list = document.querySelector('#items');
    let li = document.createElement('li');
    let span = document.createElement('span');
    buildAnchors(span)

    li.className = 'item';
    li.innerHTML = item;
    li.appendChild(span);
    list.appendChild(li);

    favBtn = document.querySelectorAll('.fav-btn');
    delBtn = document.querySelectorAll('.del-btn');

    handleClicks()
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

function toggleFavourite(i) {

    favBtn[i].classList.toggle('active');
}