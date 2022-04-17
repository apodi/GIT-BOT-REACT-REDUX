function errorPage(){
    var x = document.getElementById("container");
	var alertDiv = document.createElement('div');
	alertDiv.innerHTML = "You Entered a wrong Command"
	alertDiv.setAttribute("id", "alert-div");
	alertDiv.setAttribute("role", "alert");
	alertDiv.classList.add("alert");
	alertDiv.classList.add("alert-warning");
	x.appendChild(alertDiv);
}

export default errorPage;