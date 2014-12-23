// Instantiate and export the configuration

var GitHubApiV3 = function(token, repo) {
    if (!token || !repo) {
        throw new Error('Not enough arguments');
    }
    this.validateToken(token);
    this.validateRepo(repo);
    
    this.token = token;    
    this.repo = repo;
}

GitHubApiV3.prototype.validateToken = function(v) {
    var valid = true;
    if (!v) {
        valid = false;
    }
    
    if (valid && v.length !== 40) {
        valid = false;
    }
    
    if (!valid) {
        throw new Error('token is invalid', v);
    }
    return valid;
}
GitHubApiV3.prototype.validateRepo = function(v) {
    var valid = true;
    if (!v) {
        valid = false;
    }
    
    if (valid && !v.length) {
       valid = false; 
    }
    if (!valid) {
        throw new Error('repo is invalid', v);
    }
    
    return valid;
}

GitHubApiV3.prototype.validateDiff = function(v) {
    var valid = true;
    if (!v) {
        valid = false;
    }
    if (valid && !v.length) {
       valid = false; 
    }
    if (valid && v.indexOf('...') === -1) {
       valid = false; 
    }
    if (!valid) {
        throw new Error('diff is invalid', v);
    }
    
    return valid;
}



GitHubApiV3.prototype.getNotes = function(diff) {
    this.validateDiff(diff);
    var curl = ['curl -i  -H "Authorization: token ', this.token,'"  https://api.github.com/repos/', this.repo, '/compare/', diff].join('');
    console.log(curl);    
    console.log('Not implemented'); 
}

module.exports = GitHubApiV3;