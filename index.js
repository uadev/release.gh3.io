\\curl -i  -H "Authorization: token 26931e58f8ca6ef44ee9680d7ba8f991ccc6b395"  https://api.github.com/repos/LiveOne/liveone/compare/daily_20141218...daily_20141219
function GitHub(url, token) {
    this.settings.url = url;
    this.settings.token = token;
}
