
function listIssueOptions(octokitObj, obj) {
    var selectlabel = document.createElement('label');
    selectlabel.setAttribute("for", "repository-list-issue");
    selectlabel.innerHTML = "Select Issue : ";

    var selectElem = document.createElement('select'); // Create select
    octokitObj.issues.getForRepo(obj).then(result => {
        selectElem.setAttribute("id", "issue-list-comment");
        selectElem.classList.add("form-control");
        selectElem.classList.add("form-control-sm");
        console.log(result.data);
        for (let repo of result.data) {
            let optionElem = document.createElement('option');
            optionElem.innerHTML = repo.title;
            optionElem.value = repo.number
            selectElem.appendChild(optionElem);
        }
        var listContainer = document.getElementById("issue-listing");
        listContainer.appendChild(selectlabel);
        listContainer.appendChild(selectElem);
    })
}

module.exports = listIssueOptions;
