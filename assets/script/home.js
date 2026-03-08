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

const allTabCounts = document.getElementById("allTabCount");
const openTabCounts = document.getElementById("openTabCount");
const closedTabCounts = document.getElementById("closedTabCount");



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
  
  const borderClass = data.status === "open" ? "border-green" : "border-purple";
  const statusImg = data.status === "open" ? "./assets/image/Open-Status.png" : "./assets/image/Closed-Status.png";
  const priorityClass = data.priority === "low"?  "bg-base-300 text-gray-500" : data.priority === "medium"? "bg-[#FFF8DB] text-orange-500" : "bg-[#FEECEC] text-red-500";
  const label2Class = data.labels[1] ? "flex" : "hidden";
    
  div.className = `issue-card ${borderClass}`;
  div.id = data.id;
  // div.onclick = my_modal_4.showModal();
  div.innerHTML = `
  <div class="flex justify-between">
      <img src="${statusImg}" alt="" id="status-img">
      <p id="priority" class="${priorityClass} rounded-full px-3">${data.priority}</p>
    </div>
    <h2 id="title" class="font-semibold text-4">${data.title}</h2>
    <p id="description" class="line-clamp-2">${data.description}</p>
    <div id="labels" class="flex gap-2">
      <p  class="bg-[#FEECEC] text-red-500 rounded-md ">${data.labels[0]}</p>
      <p  class="bg-[#FFF8DB] text-orange-500 rounded-md ${label2Class} ">${data.labels[1]}</p>
    </div>
    <div class="flex flex-col gap-4">
      <p id="author"><span>#1 by </span>${data.author}</p>
      <p id="createdAt">${data.createdAt}</p>
  </div>
  `
    
    
  allTabContent.appendChild(div);

    if(data.status === "open"){
  openTabContent.appendChild(div.cloneNode(true));
}else {
      closedTabContent.appendChild(div.cloneNode(true));
}
  
  
});

  
updateCounts(allTabContent, allTabCounts);
updateCounts(openTabContent, openTabCounts);
updateCounts(closedTabContent, closedTabCounts);


};

loadAllIssues();

