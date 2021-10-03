const apiKey = '23565747-e2874a299c02424f88c571095';
    if (!apiKey) {
    alert('Pixabay Api Key missing');
}

var count = 1; //Keeps tack of page number
var islastpage = false //Makes user unable to go further than the last page
const form = document.getElementById("searchform");

//#region Clearbox function
function clearBox(elementID) {
    var div = document.getElementById(elementID);

    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
//#endregion

//#region When clicking "Submit"
form.onsubmit = async event => {
    count = 1;
    event.preventDefault(); 
    const query = form.elements.query.value
    const selectedcolor = form.elements.colors.value
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
    } 
    else if (json <= 10){
        islastpage = true
    }
    else{
    islastpage = false
    json.hits.forEach(element => 
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
        });
    }
}
//#endregion

//#region When clicking "Backwards"
form.backwards.onclick = async event =>{
    if (count == 1){
        alert("You are on the first page");
    }
    else {
        count--;
        event.preventDefault(); 
    const query = form.elements.query.value
    const selectedcolor = form.elements.colors.value
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

    json.hits.forEach(element => 
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
        });
    }
    
}
//#endregion

//#region When clicking "Forwards"
form.forwards.onclick = async event =>{
    if (islastpage == true){
        alert("You are on the last page");
    }
    else {
        count++;
        event.preventDefault(); 
    const query = form.elements.query.value
    const selectedcolor = form.elements.colors.value
    const params = new URLSearchParams ({
        q: query,
        image_type: "photo",
        colors: selectedcolor,
        per_page: 10,
        page: count

    })
        
    const response = await fetch ('https://pixabay.com/api/?key='+apiKey+'&'+params.toString());
    const json = await response.json();

    if(json.hits <= 10){
        islastpage = true
        alert("This is the last page")
        count--
    }
    else{
        islastpage=false

        clearBox('bilder');
        
        json.hits.forEach(element => 
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
            });
        }
    }
}
//#endregion
