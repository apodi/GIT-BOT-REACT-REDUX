
// const {octokit,owner} = require('../octokit-rest-service');
// const {closeIssueHandler} = require('./issue-controller');

// function closeIssue() {
//     octokit.repos.getForUser({
//         username: owner
//     }).then(result => {
//         console.log(result.data);
//         var x = document.getElementById("container");

//         var createform = document.createElement('form');
//         createform.setAttribute("id", "close-issue"); // Setting method Attribute on form
//         x.appendChild(createform);
//         var alertDiv = document.createElement('div');
//         //alertDiv.innerHTML = "Repository create successfully"
//         alertDiv.setAttribute("id", "alert-div");
//         alertDiv.setAttribute("role", "alert");
//         alertDiv.classList.add("alert");
//         alertDiv.classList.add("alert-success");
//         alertDiv.style.display = 'none';
//         createform.appendChild(alertDiv);

//         var heading = document.createElement('h2'); // Heading 
//         heading.innerHTML = "Close Issue";
//         createform.appendChild(heading);
//         var headingDescription = document.createElement('p');
//         headingDescription.innerHTML = "Close any repository issue";
//         createform.appendChild(headingDescription);

//         var line = document.createElement('hr'); //giving horizontal row after heading
//         createform.appendChild(line);

//         var linebreak = document.createElement('br');
//         createform.appendChild(linebreak);

//         var formgroupDiv = document.createElement('div');
//         formgroupDiv.classList.add("form-group");
//         createform.appendChild(formgroupDiv);

//         //select menu
//         var formgroupDiv = document.createElement('div');
//         formgroupDiv.classList.add("form-group");
//         createform.appendChild(formgroupDiv);

//         var selectlabel = document.createElement('label');
//         selectlabel.setAttribute("for", "repository-list-issue");
//         selectlabel.innerHTML = "Select Repository : ";
//         formgroupDiv.appendChild(selectlabel);

//         var selectElem = document.createElement('select'); // Create select
//         selectElem.setAttribute("id", "repository-list");
//         selectElem.classList.add("form-control");
//         selectElem.classList.add("form-control-sm");

//         var optionElem = document.createElement('option');
//         optionElem.innerHTML = "select repository";
//         optionElem.value = "#";
//         selectElem.appendChild(optionElem);

//         for (let repo of result.data) {
//             let optionElem = document.createElement('option');
//             optionElem.innerHTML = repo.name;
//             selectElem.appendChild(optionElem);
//         }
//         formgroupDiv.appendChild(selectElem);

//         var formgroupDiv = document.createElement('div');
//         formgroupDiv.classList.add("form-group");
//         formgroupDiv.setAttribute("id", "issue-listing");


//         createform.appendChild(formgroupDiv);


//         // Append Submit Button
//         var submitelement = document.createElement('input');
//         submitelement.setAttribute("type", "submit");
//         submitelement.setAttribute("name", "dsubmit");
//         submitelement.classList.add("btn");
//         submitelement.classList.add("btn-primary");
//         submitelement.setAttribute("value", "close issue");
//         createform.appendChild(submitelement);
//     })

// }

// //close issue
// $(document).on('submit', '#close-issue',function(event){
//     closeIssueHandler(event);
// });
// module.exports = closeIssue;