// const {octokit,owner} = require('../octokit-rest-service');
// const {displayIssueHandler} = require('./issue-controller');

// function displayIssue() {

//     octokit.repos.getForUser({
//         username: owner
//     }).then(result => {
//         console.log(result.data);
//         var x = document.getElementById("container");
//         var alertDiv = document.createElement('div');
//         //alertDiv.innerHTML = "Repository create successfully"
//         alertDiv.setAttribute("id", "alert-div");
//         alertDiv.setAttribute("role", "alert");
//         alertDiv.classList.add("alert");
//         alertDiv.classList.add("alert-success");
//         alertDiv.style.display = 'none';
//         x.appendChild(alertDiv);

//         var heading = document.createElement('h2'); // Heading 
//         heading.innerHTML = "List Issues";
//         x.appendChild(heading);
//         var headingDescription = document.createElement('p');
//         headingDescription.innerHTML = "issues list";
//         x.appendChild(headingDescription);

//         var line = document.createElement('hr'); //giving horizontal row after heading
//         x.appendChild(line);

//         var linebreak = document.createElement('br');
//         x.appendChild(linebreak);

//         var formgroupDiv = document.createElement('div');
//         formgroupDiv.classList.add("form-group");
//         x.appendChild(formgroupDiv);

//         //select menu
//         var formgroupDiv = document.createElement('div');
//         formgroupDiv.classList.add("form-group");
//         x.appendChild(formgroupDiv);

//         var selectlabel = document.createElement('label');
//         selectlabel.setAttribute("for", "repository-list-issue");
//         selectlabel.innerHTML = "Select Repository : ";
//         formgroupDiv.appendChild(selectlabel);

//         var selectElem = document.createElement('select'); // Create select
//         selectElem.setAttribute("id", "repository-list-issue");
//         selectElem.classList.add("form-control");
//         selectElem.classList.add("form-control-sm");

//         for (let repo of result.data) {
//             let optionElem = document.createElement('option');
//             optionElem.innerHTML = repo.name;
//             selectElem.appendChild(optionElem);
//         }
//         formgroupDiv.appendChild(selectElem);
//         var formgroupDiv = document.createElement('div');
//         formgroupDiv.classList.add("form-group");
//         formgroupDiv.setAttribute("id", "issue-listing");
//         x.appendChild(formgroupDiv);
//     })

// }

// //display issues
// $(document).on('change', '#repository-list-issue',function(event){
//     displayIssueHandler(event)
// });
// module.exports = displayIssue;