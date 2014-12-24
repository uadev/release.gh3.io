var https = require("https");
var urln = require("url");

var GitHubApiV3 = function(token, repo) {
    if (!token || !repo) {
        throw new Error('Not enough arguments');
    }
    this.validateToken(token);
    this.validateRepo(repo);
    
    this.token = token;    
    this.repo = repo;
}

GitHubApiV3.prototype.makeApiRequest = function(url, callback) {
    var options = {
        headers: {
            Authorization: 'token ' + this.token,
            'User-Agent': 'release.gh3.io'
        },
        hostname: 'api.github.com',
        path: url
    };
    
    var req = https.request(options, function(res) {
        var body = '';
        if (res.statusCode === '200') {
            
        }
        res.on('data', function(d) {
                body += d;
            }
        );
        res.on('end', function() {
            callback(null, body); 
        })
    });
    req.on('error', function(err) {
        callback(err, null);
    });
    req.end();
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
    var url = ['/repos/', this.repo, '/compare/', diff].join('');
    this.makeApiRequest(url, function(err, res) {
        if (err) {
            console.error(err); 
        }
        if (res) {
            this.getCommentsUrlsFromDiff(JSON.parse(res));
        }
    }.bind(this))
}

GitHubApiV3.prototype.getCommentsUrlsFromDiff = function(diff) {
    diff.commits.filter(function getNotEmptyComments(commit) {
        return commit.commit.comment_count > 0;
    })
    .map(function getCommentUrl(comment) {
        return comment.comments_url;
    })
    .forEach(function getCommentBody(comment_url) {
        var url = urln.parse(comment_url)['pathname'];
        return this.makeApiRequest(url, function onCommentBody(err, res) {
            var comments = JSON.parse(res);
            comments.forEach(function(comment) {
                console.log(comment.body);
            });
        });
    }, this);
}

module.exports = GitHubApiV3;
