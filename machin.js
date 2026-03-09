
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



