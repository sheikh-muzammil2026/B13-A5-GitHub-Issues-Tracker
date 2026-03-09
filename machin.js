
function showLoading() {
 loadingSpinner.classList.remove("hidden");
 loadingSpinner.classList.add("flex", "mx-auto");
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
 loadingSpinner.classList.remove("flex");
}

function updateCounts(tabId, countId) {
 countId.innerText = tabId.querySelectorAll(".issue-card").length;
}



// displaySearchIssues

function displaySearchIssues(param) {


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

  
};