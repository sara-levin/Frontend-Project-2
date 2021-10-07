const apiKey = '23565747-e2874a299c02424f88c571095';
    if (!apiKey) {
    alert('Pixabay Api Key missing');
}

var count = 1; //Keeps tack of page number
var lastPageCount = null; //Disables the forward button 
var islastpage = false //Makes user unable to go further than the last page
const form = document.getElementById("searchform");
form.backwards.disabled = true;
form.forwards.disabled = true;
var query = null;
var selectedcolor = null;

//#region Clearbox function
function clearBox(elementID) {
    var div = document.getElementById(elementID);

    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
//#endregion

//#region imageLoop function
function imageLoop(variable){
    lastPageCount = 0;
    variable.hits.forEach(element => 
        { 
            const newimg = document.createElement("figure");
            const img = document.createElement("img");
            img.src = element.webformatURL.replace("_640.jpg", "_180.jpg");
            newimg.appendChild(img); 

            const tagcaption = document.createElement("figcaption");    
            const tags = document.createTextNode(element.tags)
            tagcaption.appendChild(tags);
            newimg.appendChild(tagcaption);
            document.getElementById('bilder').appendChild(newimg);

            const photocaption = document.createElement("figcaption");
            const photographer = document.createTextNode(element.user);
            const photoby = document.createTextNode("Photo by: ");
            photocaption.appendChild(photoby);
            photocaption.appendChild(photographer);
            newimg.appendChild(photocaption)
            document.getElementById('bilder').appendChild(newimg);
            lastPageCount++;
        });
    if (lastPageCount<10){
        form.forwards.disabled = true;}
}
//#endregion

//#region When clicking "Submit"
form.onsubmit = async event => {
    count = 1;
    event.preventDefault(); 
    query = form.elements.query.value
    selectedcolor = form.elements.colors.value
    const params = new URLSearchParams ({
        q: query,
        image_type: "photo", //We chose to restirict the results to photos, simply because it was more aesthetically pleasing. Can of course be reversed. 
        colors: selectedcolor,
        per_page: 10,
        page: count

    })
        
    const response = await fetch ('https://pixabay.com/api/?key='+apiKey+'&'+params.toString());
    const json = await response.json();

    clearBox('bilder');

    

    if (json.hits == 0){
        alert("This search gave no hits, please try something else")
        form.forwards.disabled = false;
    } 
    else if (json.hits <= 10){
        islastpage = true
        
        const forwards = document.getElementById('forwards')
        forwards.disabled = true;
    }
    else{
    islastpage = false
    form.forwards.disabled = false;
    imageLoop(json);

    }
}
//#endregion

//#region When clicking "Backwards"
form.backwards.onclick = async event =>{
    count--;
    event.preventDefault(); 
    const params = new URLSearchParams ({
        q: query,
        image_type: "photo",
        colors: selectedcolor,
        per_page: 10,
        page: count

    })
        
    const response = await fetch ('https://pixabay.com/api/?key='+apiKey+'&'+params.toString());
    const json = await response.json();

    clearBox('bilder');
    islastpage = false;

    imageLoop(json);

    form.forwards.disabled = false;
    
    if (count == 1){
        backwards.disabled = true;
    }
    
}
//#endregion

//#region When clicking "Forwards"
form.forwards.onclick = async event =>{ 
        count++;
        event.preventDefault(); 
        const params = new URLSearchParams ({
            q: query,
            image_type: "photo",
            colors: selectedcolor,
            per_page: 10,
            page: count
        })
    form.backwards.disabled = false;
    const response = await fetch ('https://pixabay.com/api/?key='+apiKey+'&'+params.toString());
    const json = await response.json();

    clearBox('bilder');
        
    imageLoop(json);
        
}
//#endregion
