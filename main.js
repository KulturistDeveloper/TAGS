class Tags {
    constructor(name) {
        this.tagsArray = [];
        this.countTags = 1;
        this.data = name;
        this.#createTagList();
    }
    #createTagList() {
        //div container
        this.container = document.createElement("div");
        this.container.className = "container";
        //input
        this.inputTag = document.createElement("input");
        this.inputTag.value = "header";
        this.container.append(this.inputTag);
        //button
        this.buttonAddTag = document.createElement("button");
        this.buttonAddTag.textContent = "Add";
        this.buttonAddTag.addEventListener('click', () => {
            this.addTag(this.inputTag.value)
        });
        this.container.append(this.buttonAddTag);
        //div listTags
        this.listTags = document.createElement("div");
        this.container.append(this.listTags);
        //h2
        this.listTagsHeader = document.createElement("h2");
        this.listTagsHeader.textContent = "List tags";
        this.listTagsHeader.className = "list-tags-header";
        this.listTags.append(this.listTagsHeader);
        //checkbox
        this.checkBoxBlockedLabel = document.createElement("label");
        this.checkBoxBlockedLabel.textContent = "Блокировка";
        this.listTags.append(this.checkBoxBlockedLabel);
        this.checkBoxBlocked = document.createElement("input");
        this.checkBoxBlocked.type = "checkbox";
        this.checkBoxBlocked.addEventListener("change", () => {
            this.blockedUI()
        });
        this.checkBoxBlockedLabel.append(this.checkBoxBlocked);
        //listTagsItem (контейнер для тегов)
        this.listTagsItem = document.createElement("div");
        this.listTags.append(this.listTagsItem);

        document.body.append(this.container);
    }
    blockedUI() {
        return this.checkBoxBlocked.checked;
    }
    replaceTagList(tagsArray) {
        this.replaced = 1; // для обхода blockedUI
        this.countTags = 1;
        this.tagsArray = [];
        this.setTagListLocalStorage(tagsArray);
        this.deleteAllChildOfElement(this.listTagsItem);
        this.getTagListFromLocalStorage(this.data).forEach(element => {
            this.addTag(element.name);
        });
    }
    deleteAllChildOfElement(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    addTag(value, loadTagListFromLocalStorage = false) {
        if (!loadTagListFromLocalStorage && this.replaced !== 1) {
            if(this.blockedUI()) return;
        }
        else this.replaced = 0;
        const tag = document.createElement("div");
        tag.className = "list-tags-item";
        tag.dataset.id = this.countTags;

        this.listTagsItemName = document.createElement("div");
        this.listTagsItemName.textContent = value;

        this.listTagsItemButtonDelete = document.createElement("div");
        this.listTagsItemButtonDelete.textContent = "X";
        this.listTagsItemButtonDelete.addEventListener("click", () => {
            this.deleteTag(tag)
        });

        tag.append(this.listTagsItemName);
        tag.append(this.listTagsItemButtonDelete);
        this.listTagsItem.append(tag);

        this.tagsArray.push({id: this.countTags, name: value});
        if (!loadTagListFromLocalStorage) this.setTagListLocalStorage(this.tagsArray);
        this.countTags++;
        console.log(this.getTags());
    }
    deleteTag(tag) {
        if(this.blockedUI()) return;
        this.tagsArray = this.tagsArray.filter(value => String(value.id) !== tag.dataset.id);
        this.setTagListLocalStorage(this.tagsArray);
        tag.remove();
        console.log(this.getTags());
    }
    getTagListFromLocalStorage(value) {
        return JSON.parse(localStorage.getItem(value));
    }
    setTagListLocalStorage(tagsArray) {
        localStorage.setItem(this.data, JSON.stringify(tagsArray));
    }
    loadTagListFromLocalStorage() {
        this.getTagListFromLocalStorage(this.data).forEach(element => {
            this.addTag(element.name, true);
        });
    }
    getTags() {
        return this.tagsArray;
    }

}

let t1 = new Tags("test");
t1.loadTagListFromLocalStorage();
let t2 = new Tags("piton");
t2.loadTagListFromLocalStorage();
// t2.replaceTagList(t1.getTags());
