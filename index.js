let savedData = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage){
    savedData = leadsFromLocalStorage;
    render(savedData);
}

tabBtn.addEventListener("click", function(){
    

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs);
        savedData.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(savedData));
        render(savedData);
    })





})



function render(leads) {
    let listItems = "";
    for ( i = 0; i < leads.length; i++) {


    
    listItems +=
      `<li> 
            <a target='_blank' href='${leads[i]}' > 
                ${leads[i]} 
            </a>
        </li>`;
    
    }
    ulEl.innerHTML = listItems;

}





deleteBtn.addEventListener("dblclick", function (){
    localStorage.clear();
    savedData = [];
    render(savedData);

})


inputBtn.addEventListener("click", function () {
    savedData.push(inputEl.value);
    inputEl.value = "";

    
    localStorage.setItem("myLeads", JSON.stringify(savedData));


    render(savedData);

    console.log(localStorage.getItem("myLeads"));

    
})






