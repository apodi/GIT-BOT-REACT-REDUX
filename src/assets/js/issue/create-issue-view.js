// const {octokit,owner} = require('../octokit-rest-service');
// import  createIssueHandler  from './issue-controller.js';

// function createIssue(title) {
// 	alert(title);
// 	octokit.repos.getForUser({username : owner}).then(result => {
// 	   console.log(result.data);
// 	   var x = document.getElementById("container");
// 	var alertDiv = document.createElement('div');
// 	//alertDiv.innerHTML = "Repository create successfully"
// 	alertDiv.setAttribute("id", "alert-div");
// 	alertDiv.setAttribute("role", "alert");
// 	alertDiv.classList.add("alert");
// 	alertDiv.classList.add("alert-success");
// 	alertDiv.style.display = 'none'; 
// 	x.appendChild(alertDiv);
	

// 	var createform = document.createElement('form');
// 	createform.setAttribute("id", "create-issue"); // Setting method Attribute on form
// 	x.appendChild(createform);
// 	var heading = document.createElement('h2'); // Heading of form
// 	heading.innerHTML = "New issue";
// 	createform.appendChild(heading);
// 	var headingDescription = document.createElement('p');
// 	headingDescription.innerHTML = "Create new issue";
// 	createform.appendChild(headingDescription);

// 	var line = document.createElement('hr'); //giving horizontal row after heading
// 	createform.appendChild(line);

// 	var linebreak = document.createElement('br');
// 	createform.appendChild(linebreak);

// 	var formgroupDiv = document.createElement('div');
// 	formgroupDiv.classList.add("form-group");
// 	createform.appendChild(formgroupDiv);


// 	var namelabel = document.createElement('label'); // Create Label for name field
// 	namelabel.setAttribute("for", "issuetitle");
// 	namelabel.innerHTML = "Title: "; // Set Field Labels
// 	formgroupDiv.appendChild(namelabel);

// 	var inputelement = document.createElement('input'); // Create input field for name
// 	inputelement.setAttribute("type", "text");
// 	inputelement.setAttribute("name", "issue");
// 	inputelement.setAttribute("id", "issuetitle");
// 	inputelement.setAttribute("placeholder", "Enter Title");
// 	inputelement.value = title;
// 	inputelement.classList.add("form-control");
// 	formgroupDiv.appendChild(inputelement);

// 	var linebreak = document.createElement('br');
// 	createform.appendChild(linebreak);
	
// 	//select menu
// 	var formgroupDiv = document.createElement('div');
// 	formgroupDiv.classList.add("form-group");
// 	createform.appendChild(formgroupDiv);
   
// 	var selectlabel = document.createElement('label'); 
// 	selectlabel.setAttribute("for", "repository-list");
// 	selectlabel.innerHTML = "Select Repository : ";
// 	formgroupDiv.appendChild(selectlabel);

// 	var selectElem = document.createElement('select'); // Create select
// 	selectElem.setAttribute("id", "repository-list");
// 	selectElem.classList.add("form-control");
// 	selectElem.classList.add("form-control-sm");
	
//      for (let repo of result.data){
// 	  let optionElem =  document.createElement('option');
// 	  optionElem.innerHTML = repo.name;
// 	  selectElem.appendChild(optionElem);
// 	 }
// 	 formgroupDiv.appendChild(selectElem);
// 	 var formgroupDiv = document.createElement('div');
// 	 formgroupDiv.classList.add("form-group");
// 	 createform.appendChild(formgroupDiv);
 
// 	 var desclabel = document.createElement('label'); 
// 	 desclabel.setAttribute("for", "comment");
// 	 desclabel.innerHTML = "Comment : ";
// 	 formgroupDiv.appendChild(desclabel);
 
// 	 var descelement = document.createElement('textarea'); 
// 	 descelement.setAttribute("name", "comment");
// 	 descelement.setAttribute("id", "comment");
// 	 descelement.setAttribute("rows", 3);
// 	 descelement.classList.add("form-control");
// 	 formgroupDiv.appendChild(descelement);
 
// 	 var descbreak = document.createElement('br');
// 	 createform.appendChild(descbreak);
 
 
// 	 // Append Submit Button
// 	 var submitelement = document.createElement('input');
// 	 submitelement.setAttribute("type", "submit");
// 	 submitelement.setAttribute("name", "dsubmit");
// 	 submitelement.classList.add("btn");
// 	 submitelement.classList.add("btn-primary");
// 	 submitelement.setAttribute("value", "Create Issue");
// 	 createform.appendChild(submitelement);
//    })
// }

// //create issue
// $(document).on("submit", '#create-issue', function(event){
// 	createIssueHandler(event);
// });

// export default  createIssue;