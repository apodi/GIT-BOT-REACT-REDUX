const {octokit,owner} = require('../octokit-rest-service');
const {addCollaboratorHandler} = require('./collaborator-controller');



function addCollaborator() {
    octokit.repos.getForUser({username : owner}).then(result => {
        console.log(result.data);
     var x = document.getElementById("gitform");
     var alertDiv = document.createElement('div');
     //alertDiv.innerHTML = "Repository create successfully"
     alertDiv.setAttribute("id", "alert-div");
     alertDiv.setAttribute("role", "alert");
     alertDiv.classList.add("alert");
     alertDiv.classList.add("alert-success");
     alertDiv.style.display = 'none'; 
     x.appendChild(alertDiv);
     
 
     var createform = document.createElement('form');
     createform.setAttribute("id", "add-collaborator"); // Setting method Attribute on form
     x.appendChild(createform);
     var heading = document.createElement('h2'); // Heading of form
     heading.innerHTML = "Add Collaborators";
     createform.appendChild(heading);
     var headingDescription = document.createElement('p');
     headingDescription.innerHTML = "Search by username, full name or email address";
     createform.appendChild(headingDescription);
 
     var line = document.createElement('hr'); //giving horizontal row after heading
     createform.appendChild(line);
 
     var linebreak = document.createElement('br');
     createform.appendChild(linebreak);
 
     var formgroupDiv = document.createElement('div');
     formgroupDiv.classList.add("form-group");
     createform.appendChild(formgroupDiv);
 
 
     var namelabel = document.createElement('label'); // Create Label for name field
     namelabel.setAttribute("for", "collaborator");
     namelabel.innerHTML = "Collaborator: "; // Set Field Labels
     formgroupDiv.appendChild(namelabel);
 
     var inputelement = document.createElement('input'); // Create input field for name
     inputelement.setAttribute("type", "text");
     inputelement.setAttribute("name", "collaborator");
     inputelement.setAttribute("id", "collaborator");
     inputelement.setAttribute("placeholder", "Search by username, full name or email address");
    //  inputelement.value = title;
     inputelement.classList.add("form-control");
     formgroupDiv.appendChild(inputelement);
 
     var linebreak = document.createElement('br');
     createform.appendChild(linebreak);
     
     //select menu
     var formgroupDiv = document.createElement('div');
     formgroupDiv.classList.add("form-group");
     createform.appendChild(formgroupDiv);
    
     var selectlabel = document.createElement('label'); 
     selectlabel.setAttribute("for", "repository-list");
     selectlabel.innerHTML = "Select Repository : ";
     formgroupDiv.appendChild(selectlabel);
 
     var selectElem = document.createElement('select'); // Create select
     selectElem.setAttribute("id", "repository-list");
     selectElem.classList.add("form-control");
     selectElem.classList.add("form-control-sm");
     
      for (let repo of result.data){
       let optionElem =  document.createElement('option');
       optionElem.setAttribute("value", repo.id);
       optionElem.innerHTML = repo.name;
       selectElem.appendChild(optionElem);
      }
      formgroupDiv.appendChild(selectElem);
      var formgroupDiv = document.createElement('div');
      formgroupDiv.classList.add("form-group");
      createform.appendChild(formgroupDiv);
  
      // Append Submit Button
      var submitelement = document.createElement('input');
      submitelement.setAttribute("type", "submit");
      submitelement.setAttribute("name", "dsubmit");
      submitelement.classList.add("btn");
      submitelement.classList.add("btn-primary");
      submitelement.setAttribute("value", "Add Collaborator");
      createform.appendChild(submitelement);
    })
 }

 //add collaborator
$(document).on('submit', '#add-collaborator',addCollaboratorHandler);
module.exports = addCollaborator;