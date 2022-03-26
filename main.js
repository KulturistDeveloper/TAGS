const enter_tag = document.querySelector('.enter_tag');
const add_tag = document.querySelector('.add_tag');
const setBlock = document.getElementById('scales');

add_tag.addEventListener('click', createTag);
window.addEventListener('DOMContentLoaded', loadMain);
setBlock.addEventListener('click', checkBox);

let array = [];
let isBlock = false;

function checkBox()
{
    if(setBlock.value === "checked") sBlock.unblock();
    else sBlock.block();
}
let sBlock = {
    block() {
        isBlock = true;
        setBlock.value = "checked";
    },
    unblock() {
        isBlock = false;
        setBlock.value = "unchecked";
    },
    isBlocking() {
        return isBlock;
    }
};

let ls = {
    data: "data",
    getAll() {
        return JSON.parse(localStorage.getItem(this.data));
    },
    setAll(array) {
        localStorage.setItem(this.data, JSON.stringify(array));
    },
    addTag(tag) {
        array.push(tag);
        localStorage.setItem(this.data, JSON.stringify(array));
    },
    removeTag(tag) {
        let d = ls.getAll();
        array = d.filter(word => word !== tag);
        ls.setAll(array);
    }
};

function removeTag(node) {
    if(sBlock.isBlocking()) return;
    ls.removeTag(node.parentNode.className);
    node.parentNode.removeChild(node);
}

function loadMain()
{
    let data = ls.getAll();
    array = data || [];
    for(let i = 0; i < array.length; i++)
    {
        addDomElement(data[i]);
    }
}

function addDomElement(data)
{
    let tag = document.createElement("div");
    tag.className = data;
    document.querySelector('.list_tag').appendChild(tag);
    let newStick = document.createElement("div");
    newStick.className = "tag";
    newStick.innerHTML = data;
    tag.appendChild(newStick);
    let newStick_item = document.createElement("button");
    newStick_item.className = "tag_remove";
    newStick_item.innerHTML = "Удалить";
    newStick.appendChild(newStick_item);
    newStick.addEventListener("click", function () {
        removeTag(this)
    }, false);
}

function createTag() {
    if(sBlock.isBlocking()) return;
    addDomElement(enter_tag.value);
    ls.addTag(enter_tag.value);
}