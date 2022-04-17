const {
    octokit,
    owner
} = require('../octokit-rest-service');

module.exports = {
    addCollaboratorHandler: (e) => {
        var nameCollaborator = $('#collaborator').val();
        var reponame = $('#repository-list').find(":selected").text();
        e.preventDefault();
        if (!nameCollaborator) {
            // Add errors highlight
            $('#collaborator').closest('.form-group').removeClass('has-success').addClass('has-error');
        } else {
            // Remove the errors highlight
            $('#collaborator').closest('.form-group').removeClass('has-error').addClass('has-success');

            const obj = {
                owner: owner,
                repo: reponame,
                username: nameCollaborator
            };
            console.log(obj);
            octokit.repos.addCollaborator(obj).then(result => {
                    if (result.status == 201) {
                        $(this).closest('form').find("input[type=text], textarea").val("");
                        $("#alert-div").html("collaborator added successfully!");
                        $("#alert-div").show();
                    }
                })
                .catch(error => {
                    $("#alert-div").html("Error");
                    $("#alert-div").show();
                });
        }
    }
}