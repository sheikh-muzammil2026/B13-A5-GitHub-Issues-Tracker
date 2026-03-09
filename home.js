// Button click
// ↓
// API fetch
// ↓
// data loop
// ↓
// DOM create
// ↓
// container append
 

const allTabContent = document.getElementById("all-tab-content");
const openTabContent = document.getElementById("open-tab-content");
const closedTabContent = document.getElementById("closed-tab-content");

const loadingSpinner = document.getElementById("loading-spinner");
const cardModal = document.getElementById("cardModal");

const allTabCounts = document.getElementById("allTabCount");
const openTabCounts = document.getElementById("openTabCount");
const closedTabCounts = document.getElementById("closedTabCount");

const modalTitle = document.getElementById("title");
const modalAuthor = document.getElementById("author");
const modalPriority = document.getElementById("priority");
const modalAssignee = document.getElementById("assignee");
const modalDescription = document.getElementById("description");
const modalLabel1 = document.getElementById("label1"); 
const modalLabel2 = document.getElementById("label2");
const modalCreatedAt = document.getElementById("createdAt");
const modalBadge = document.getElementById("badge");

const searchText = document.getElementById("searchInput").value;
const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", function () {
  loadSearchData(searchText);
})

async function loadSearchData(text){
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
  const issues = await res.json();
  const data = issues.data;
  displaySearchIssues();
}

async function loadAllIssues() {
  showLoading();
    // fetch All Issues from.api
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  
  displayAllIssues(data);
  hideLoading();
};

function displayAllIssues(param) {


  param.data.forEach(data =>{
  
  const div = document.createElement("div");
  div.addEventListener("click", function () {
      openModal(data.id); 
    });
    
  const borderClass = data.status === "open" ? "border-green" : "border-purple";
  const statusImg = data.status === "open" ? "./assets/image/Open-Status.png" : "./assets/image/Closed-Status.png";
  const priorityClass = data.priority === "low"?  "bg-base-300 text-gray-500" : data.priority === "medium"? "bg-[#FFF8DB] text-orange-500" : "bg-[#FEECEC] text-red-500";
  const label2Class = data.labels[1] ? "flex" : "hidden";
    
//  div.onclick = openModal(data.id);
  div.className = `issue-card ${borderClass}`;
  div.id = data.id;
 
  div.innerHTML = `
  <div class="flex justify-between">
      <img src="${statusImg}" alt="" id="status-img">
      <p  class="${priorityClass} rounded-full px-3">${data.priority}</p>
    </div>
    <h2   class="font-semibold text-4">${data.title}</h2>
    <p class="line-clamp-2">${data.description}</p>
    <div  class="flex gap-2">
      <p  class="bg-[#FEECEC] text-red-500 rounded-md ">${data.labels[0]}</p>
      <p  class="bg-[#FFF8DB] text-orange-500 rounded-md ${label2Class} ">${data.labels[1]}</p>
    </div>
    <div class="flex flex-col gap-4">
      <p ><span>#1 by </span>${data.author}</p>
      <p >${data.createdAt}</p>
  </div>
  `
  
    
    
  allTabContent.appendChild(div);

    if(data.status === "open"){
      const openClone = div.cloneNode(true);
      openClone.addEventListener("click", function () {
      openModal(data.id); 
    });
  openTabContent.appendChild(openClone);
      
      
}else {
    const closedClone = div.cloneNode(true);
    closedClone.addEventListener("click", function () {
      openModal(data.id); 
    });
    closedTabContent.appendChild(closedClone);
}

     
  
});

  
updateCounts(allTabContent, allTabCounts);
updateCounts(openTabContent, openTabCounts);
updateCounts(closedTabContent, closedTabCounts);


};

// div.addEventListener("click", function () {
//        cardModal.showModal();
//      });



async function openModal(cardId) {
  
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`);
  const issues = await response.json();
  const data = issues.data;


const priorityClass = data.priority === "low"?  "bg-base-300 text-gray-500" : data.priority === "medium"? "bg-[#FFF8DB] text-orange-500" : "bg-[#FEECEC] text-red-500";
const label2Class = data.labels[1] ? "flex" : "hidden";

modalTitle.innerText = data.title;
modalAuthor.innerText = data.author;
modalPriority.innerText = data.priority;
// modalPriority.classList.add(...priorityClass.split(" "));
modalAssignee.innerText = data.assignee;
modalDescription.innerText = data.description;
modalLabel1.innerText = data.labels[0];
modalLabel2.innerText = data.labels[1];
// modalLabel2.classList.add(...priorityClass.split(" "));
modalCreatedAt.innerText = data.createdAt;
modalBadge.innerText = data.status;

  
  
cardModal.showModal();
}

loadAllIssues();
oadSearchData();

// 1️⃣ User clicks a card
// 2️⃣ Card ID is sent to a function
// 3️⃣ Function constructs API URL with ID
// 4️⃣ Fetch API data for that specific issue
// 5️⃣ Receive JSON data
// 6️⃣ Create a dynamic div with issue details
// 7️⃣ Append div inside a modal container
// 8️⃣ Show modal to the user
// 9️⃣ User can close modal with a button