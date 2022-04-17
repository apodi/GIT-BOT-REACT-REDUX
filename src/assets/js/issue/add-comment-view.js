const {octokit,owner} = require('../octokit-rest-service');
const {addCommentPartialHandler , addCommentHandler} = require('./issue-controller');

function addComment() {
    octokit.repos.getForUser({
        username: owner
    }).then(result => {
        console.log(result.data);
        var x = document.getElementById("gitform");

        var createform = document.createElement('form');
        createform.setAttribute("id", "add-comment"); // Setting method Attribute on form
        x.appendChild(createform);
        var alertDiv = document.createElement('div');
        //alertDiv.innerHTML = "Repository create successfully"
        alertDiv.setAttribute("id", "alert-div");
        alertDiv.setAttribute("role", "alert");
        alertDiv.classList.add("alert");
        alertDiv.classList.add("alert-success");
        alertDiv.style.display = 'none';
        createform.appendChild(alertDiv);

        var heading = document.createElement('h2'); // Heading 
        heading.innerHTML = "Add Comment";
        createform.appendChild(heading);
        var headingDescription = document.createElement('p');
        headingDescription.innerHTML = "Add comment to any issue";
        createform.appendChild(headingDescription);

        var line = document.createElement('hr'); //giving horizontal row after heading
        createform.appendChild(line);

        var linebreak = document.createElement('br');
        createform.appendChild(linebreak);

        var formgroupDiv = document.createElement('div');
        formgroupDiv.classList.add("form-group");
        createform.appendChild(formgroupDiv);

        //select menu
        var formgroupDiv = document.createElement('div');
        formgroupDiv.classList.add("form-group");
        createform.appendChild(formgroupDiv);

        var selectlabel = document.createElement('label');
        selectlabel.setAttribute("for", "repository-list-issue");
        selectlabel.innerHTML = "Select Repository : ";
        formgroupDiv.appendChild(selectlabel);

        var selectElem = document.createElement('select'); // Create select
        selectElem.setAttribute("id", "repository-list");
        selectElem.classList.add("form-control");
        selectElem.classList.add("form-control-sm");
        
        var optionElem =  document.createElement('option');
        optionElem.innerHTML = "select repository";
        optionElem.value = "#";
        selectElem.appendChild(optionElem);

        for (let repo of result.data) {
            let optionElem = document.createElement('option');
            optionElem.innerHTML = repo.name;
            selectElem.appendChild(optionElem);
        }
        formgroupDiv.appendChild(selectElem);
       
        var formgroupDiv = document.createElement('div');
        formgroupDiv.classList.add("form-group");
        formgroupDiv.setAttribute("id", "issue-listing");
    
        
        createform.appendChild(formgroupDiv);
       
        var formgroupDiv = document.createElement('div');
        formgroupDiv.classList.add("form-group");
        createform.appendChild(formgroupDiv);
    
        var desclabel = document.createElement('label'); 
        desclabel.setAttribute("for", "comment");
        desclabel.innerHTML = "Comment : ";
        formgroupDiv.appendChild(desclabel);
    
        var descelement = document.createElement('textarea'); 
        descelement.setAttribute("name", "comment");
        descelement.setAttribute("id", "comment");
        descelement.setAttribute("rows", 3);
        descelement.classList.add("form-control");
        formgroupDiv.appendChild(descelement);
        
        // Append Submit Button
        var submitelement = document.createElement('input');
        submitelement.setAttribute("type", "submit");
        submitelement.setAttribute("name", "dsubmit");
        submitelement.classList.add("btn");
        submitelement.classList.add("btn-primary");
        submitelement.setAttribute("value", "Add Comment");
        createform.appendChild(submitelement);
    })

}


//dsiplay partial 
$(document).on('change', '#repository-list',function(event){
    addCommentPartialHandler(event);
});
//add comment
$(document).on('submit', '#add-comment',function(event){
    addCommentHandler(event);
});

module.exports = addComment;