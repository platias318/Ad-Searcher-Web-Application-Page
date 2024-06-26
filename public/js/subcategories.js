//This is the client side javascript code of the html page "subcategory.html"
    
window.onload = function() {

    const urlParams = new URLSearchParams(window.location.search);

    // Get the 'category' parameter value
    const subcategoryId = urlParams.get('id');

    var templates = {}  
    //get the templates
    let categoryDetailsScript = document.getElementById("subcategory-detail-template");

    templates.categoryDetailsScript = Handlebars.compile(categoryDetailsScript.textContent);

    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    let init = {
        method: "GET",
        headers: myHeaders,
        mode: 'cors'
    }

    const url = new URL(`https://wiki-ads.onrender.com/ads?subcategory=${subcategoryId}`); //get the current subcategory 

    fetch(url, init)//get the subcategories based on the id
        .then(response => response.json())
        .then(obj => {
            console.log('Received object', obj)
            obj.forEach(obj => {
                obj.features = obj.features.split(';');
            });
            let content = templates.categoryDetailsScript(obj);
            let div = document.getElementById("subcategory_details");
            div.innerHTML = content;
        })
        .catch(error => {console.log(error)})

}
