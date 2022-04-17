const octokit = require('@octokit/rest')();

const token = "";
const owner = '';

octokit.authenticate({
    type: 'oauth',
    token: token
});

module.exports = {octokit : octokit , owner :owner};
