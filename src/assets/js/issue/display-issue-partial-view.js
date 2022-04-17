// function listIssue(octokitObj,obj) {
//     var accordion = document.createElement('div');
//     accordion.setAttribute("id","accordion");
//     octokitObj.issues.getForRepo(obj).then(result => {
//         for (let repo of result.data){
//             var cardDiv = document.createElement('div');
//             cardDiv.classList.add("card");
        
//             var cardHeaderDiv = document.createElement('div');
//             cardHeaderDiv.classList.add("card-header");
//             cardHeaderDiv.setAttribute("id","heading_"+repo.id);   //todo make id variable
//             cardDiv.appendChild(cardHeaderDiv);
        
//             var heading = document.createElement('h5');
//             heading.classList.add("mb-0");
//             cardHeaderDiv.appendChild(heading);
            
//             var button = document.createElement('button');
//             button.classList.add("btn");
//             button.classList.add("btn-link");
//             cardHeaderDiv.setAttribute("data-toggle","collapse");
//             cardHeaderDiv.setAttribute("data-target","#collapse_"+repo.id); 
//             button.innerHTML = repo.title;
//             heading.appendChild(button);
        
//             var cardBodyParent = document.createElement('div');
//             cardBodyParent.classList.add("collapse");
//             cardBodyParent.setAttribute("data-parent","#accordion");
//             cardBodyParent.setAttribute("id","collapse_"+repo.id);   //todo make id variable
//             cardDiv.appendChild(cardBodyParent);
             
//             var cardBody = document.createElement('div');
//             cardBody.classList.add("card-body");
//             cardBody.innerHTML = repo.body;
//             cardBodyParent.appendChild(cardBody);
        
//             accordion.appendChild(cardDiv);
//            }
//            var listContainer = document.getElementById("issue-listing");
    
//            listContainer.appendChild(accordion);
//     })
 
//  }
//  module.exports = listIssue;