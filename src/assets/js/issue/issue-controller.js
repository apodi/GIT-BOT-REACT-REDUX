const {
    octokit,
    owner
} = require('../octokit-rest-service');

const issueList = require('./display-issue-partial-view');
const issueOptionList = require('./add-comment-partial-view');

import C from '../constants'
const {
    store
} = require('../redux-store');


    const createIssueHandler = (e) => {
        console.log('asdasdasdasdasdasd');
        var titleElement = $('#issuetitle');
        e.preventDefault();
        if (!titleElement.val()) {
            // Add errors highlight
            titleElement.closest('.form-group').removeClass('has-success').addClass('has-error');
        } else {
            // Remove the errors highlight
            titleElement.closest('.form-group').removeClass('has-error').addClass('has-success');

            const obj = {
                owner: owner,
                repo: $("#repository-list option:selected").text(),
                title: titleElement.val(),
                body: $('#comment').val()
            };
            octokit.issues.create(obj).then(result => {
                    if (result.status == 201) {
                        //redux dispatch
                        store.dispatch({
                            type: C.ADD_ISSUE,
                            payload: obj.title
                        });
                        $(this).closest('form').find("input[type=text], textarea").val("");
                        $("#alert-div").html("Issue created successfully!");
                        $("#alert-div").show();
                    }
                })
                .catch(error => {
                    $("#alert-div").html("Error");
                    $("#alert-div").show();
                });
        }
    }
    const displayIssueHandler = (e) => {
        $('#issue-listing').empty();
        var obj = {
            owner: owner,
            repo: e.target.value,
            sort: 'comments'
        };
        issueList(octokit, obj);
    }

    const addCommentPartialHandler = (e) => {
        if (e.target.value != "#") {
            $('#issue-listing').empty();
            var obj = {
                owner: owner,
                repo: e.target.value,
                sort: 'comments'
            };
            issueOptionList(octokit, obj);
        }
    }

    const addCommentHandler = (e) => {
        var repoName = $("#repository-list option:selected").val();
        e.preventDefault();
        if (repoName == '#') {
            // Add errors highlight
            $("#repository-list option:selected").closest('.form-group').removeClass('has-success').addClass('has-error');
        } else {
            // Remove the errors highlight
            $("#repository-list option:selected").closest('.form-group').removeClass('has-error').addClass('has-success');

            const obj = {
                owner: owner,
                repo: $("#repository-list option:selected").text(),
                number: $("#issue-list-comment option:selected").val(),
                body: $('#comment').val()
            };
            octokit.issues.createComment(obj).then(result => {
                    console.log(result);
                    if (result.status == 201) {
                        $(this).closest('form').find("input[type=text], textarea").val("");
                        $("#alert-div").html("Comment added successfully!");
                        $("#alert-div").show();
                    }
                })
                .catch(error => {
                    $("#alert-div").html("Please add comment");
                    $("#alert-div").show();
                });
        }
    }

    const closeIssueHandler = (e) => {
        var repoName = $("#repository-list option:selected").val();
        e.preventDefault();
        if (repoName == '#') {
            // Add errors highlight
            $("#repository-list option:selected").closest('.form-group').removeClass('has-success').addClass('has-error');
        } else {
            // Remove the errors highlight
            $("#repository-list option:selected").closest('.form-group').removeClass('has-error').addClass('has-success');

            const obj = {
                owner: owner,
                repo: $("#repository-list option:selected").text(),
                number: $("#issue-list-comment option:selected").val(),
                state: 'closed'
            };
            const issueTitle = $("#issue-list-comment option:selected").text();
            octokit.issues.update(obj).then(result => {
                    console.log(result);
                    if (result.status == 200) {
                            //redux dispatch
                            store.dispatch({
                                type: C.REMOVE_ISSUE,
                                payload: issueTitle
                            });
                        $(this).closest('form').find("input[type=text], textarea").val("");
                        $("#alert-div").html("Issue closed successfully!");
                        $("#alert-div").show();
                    }
                })
                .catch(error => {
                    $("#alert-div").html("Please add comment");
                    $("#alert-div").show();
                });
        }
    }
 export {createIssueHandler, displayIssueHandler, addCommentPartialHandler, addCommentHandler, closeIssueHandler }