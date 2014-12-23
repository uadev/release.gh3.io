// Instantiate and export the configuration

var GitHubApiV3 = function(token, repo) {
    if (!token || !repo) {
        throw new Exception('Not enough arguments');
    }
    this.token = token;    
    this.repo = repo;
}

GitHubApiV3.prototype.getNotes = function(interval) {
    var curl = ['curl -i  -H "Authorization: token ', this.token,'"  https://api.github.com/repos/', this.repo, '/compare/', interval].join('');
    console.log(curl);    
    console.log('Not implemented'); 
}

module.exports = GitHubApiV3;