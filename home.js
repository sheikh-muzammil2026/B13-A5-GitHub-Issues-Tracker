
// ================================
// 1️⃣ Global DOM Elements
// ================================

const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("searchInput");

let allIssues = [];

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



// ================================
// 4️⃣ Load All Issues from API
// ================================

async function loadAllIssues() {
  showLoading();
    // fetch All Issues from.api
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  
  displayAllIssues(data);
  hideLoading();
};



// ================================
// 5️⃣ Display Issues in Tabs
// ================================

function displayAllIssues(param) {

  // 🔹 Clear old content
  allTabContent.innerHTML = "";
  openTabContent.innerHTML = "";
  closedTabContent.innerHTML = "";

  // 🔹 Loop through each issue
  param.data.forEach(data =>{


  // 🔹 Create dynamic div for issue
  const div = document.createElement("div");
  div.addEventListener("click", function () {
      openModal(data.id); 
    });
    
  const borderClass = data.status === "open" ? "border-green" : "border-purple";
  const statusImg = data.status === "open" ? "./assets/image/Open-Status.png" : "./assets/image/Closed-Status.png";
  const priorityClass = data.priority === "low"?  "bg-base-300 text-gray-500" : data.priority === "medium"? "bg-[#FFF8DB] text-orange-500" : "bg-[#FEECEC] text-red-500";
  const label2Class = data.labels[1] ? "flex" : "hidden";


  const date = new Date(data.createdAt);


//  div.onclick = openModal(data.id);
  div.className = `issue-card ${borderClass}`;
  div.id = data.id;

     // 🔹 Set inner HTML of card
  div.innerHTML = `
  <div class="flex justify-between">
      <img src="${statusImg}" alt="" id="status-img">
      <p  class="${priorityClass} rounded-full px-3">${data.priority.toUpperCase()}</p>
    </div>
    <h2   class="font-semibold text-4">${data.title}</h2>
    <p class="line-clamp-2">${data.description}</p>
    <div  class="flex gap-2">
      <p  class="bg-[#FEECEC] text-red-500 rounded-md ">${data.labels[0]}</p>
      <p  class="bg-[#FFF8DB] text-orange-500 rounded-md ${label2Class} ">${data.labels[1]}</p>
    
    </div>
    <div class="divider my-0"></div>
   <div class="flex flex-col gap-4">
      <p ><span>#1 by </span>${data.author.toUpperCase()}</p>
      <p >${date.toLocaleDateString()}</p>
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



// 6️⃣ Open Modal with Issue Details

async function openModal(cardId) {
  
  const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardId}`);
  const issues = await response.json();
  const data = issues.data;


const priorityClass = data.priority === "low"?  "bg-base-300 text-gray-500" : data.priority === "medium"? "bg-[#FFF8DB] text-orange-500" : "bg-red-500 text-white";
const label2Class = data.labels[1] ? "flex" : "hidden";
const date = new Date(data.createdAt);

  
modalTitle.innerText = data.title;

const author = data.status === "open"? `Opened by • ${data.author.toUpperCase()} •` :  `Closed by • ${data.author.toUpperCase()} •`;
modalAuthor.innerText = author;
  
modalPriority.innerText = data.priority.toUpperCase();
modalPriority.className = ""; // সব ক্লাস মুছে দাও
modalPriority.classList.add(...priorityClass.split(" "));
  
modalAssignee.innerText = data.assignee.toUpperCase();
modalDescription.innerText = data.description;
  
modalLabel1.innerText = data.labels[0];
// modalLabel2.innerText = `${data.labels[1] || ""}`;
modalLabel2.innerText = data.labels[1];
// modalLabel2.classList.add(label2Class);
modalLabel2.classList.remove("flex", "hidden");
modalLabel2.classList.add(label2Class);

modalCreatedAt.innerText = date.toLocaleDateString();
modalBadge.innerText = data.status;

  
  // 🔹 Show modal
cardModal.showModal();
}







// 7️⃣ Search Functionality

// ===== Search Button Click =====
btnSearch.addEventListener("click", function () {
  const searchText = searchInput.value.trim().toLowerCase();
  if (searchText) {
    loadSearchData(searchText);
  }
});



// ===== Fetch & Load Search Data =====
async function loadSearchData(text) {
  showLoading();
  
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
    const issues = await res.json();
    allIssues = issues.data || [];
    displaySearchIssues(allIssues);

    
    hideLoading();
  }


// ===== Display Issues Function =====
function displaySearchIssues(data) {
  // Clear previous content
  allTabContent.innerHTML = "";
  openTabContent.innerHTML = "";
  closedTabContent.innerHTML = "";

  data.forEach(issue => {
    // Create card
    const div = document.createElement("div");
    div.className = `issue-card ${issue.status === "open" ? "border-green" : "border-purple"}`;
    div.id = issue.id;

  const statusImg = issue.status === "open" ? "./assets/image/Open-Status.png" : "./assets/image/Closed-Status.png";
    const priorityClass = issue.priority === "low"
      ? "bg-base-300 text-gray-500"
      : issue.priority === "medium"
      ? "bg-[#FFF8DB] text-orange-500"
      : "bg-[#FEECEC] text-red-500";
    const label2Class = issue.labels[1] ? "flex" : "hidden";

    const date = new Date(issue.createdAt);

    div.innerHTML = `
      <div class="flex justify-between">
        <img src="${statusImg}" alt="" id="status-img">
        <p class="${priorityClass} rounded-full px-3">${issue.priority.toUpperCase()}</p>
      </div>
      <h2 class="font-semibold">${issue.title}</h2>
      <p class="line-clamp-2">${issue.description}</p>
      <div class="flex gap-2">
        <p class="bg-[#FEECEC] text-red-500 rounded-md">${issue.labels[0]}</p>
        <p class="bg-[#FFF8DB] text-orange-500 rounded-md ${label2Class}">${issue.labels[1] || ""}</p>
      </div>
      <div class="flex flex-col gap-4">
        <p><span>#1 by </span>${issue.author.toUpperCase()}</p>
        <p>${date.toLocaleDateString()}</p>
      </div>
    `;

    // Click to open modal
    div.addEventListener("click", () => openModal(issue.id));

    // Append to main tab
    allTabContent.appendChild(div);

    // Clone for open/closed tabs
    const clone = div.cloneNode(true);
    clone.addEventListener("click", () => openModal(issue.id));
    if (issue.status === "open") {
      openTabContent.appendChild(clone);
    } else {
      closedTabContent.appendChild(clone);
    }
  });

  // Update counts
updateCounts(allTabContent, allTabCounts);
updateCounts(openTabContent, openTabCounts);
updateCounts(closedTabContent, closedTabCounts);

}



// ================================
// 8️⃣ Initial Load
// ================================
loadAllIssues();

