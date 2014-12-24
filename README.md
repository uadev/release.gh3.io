release.gh3.io
==============

Release notes generator for GitHub v3

You have to generate API token for this app https://help.github.com/articles/creating-an-access-token-for-command-line-use/

Usage: 
```
bin/gh3-release -d daily_20141218...daily_20141219
```
Output:
```
! LIVEONE-7249 Emulate touch click enhancement
! LIVEONE-7313 TD :: TF :: Update functional tests
! LIVEONE-7283: iPad: Can't log out
```
It is also possible to pass repo and token with arguments
```
bin/gh3-release -t GITHUB_API_TOKEN -r LiveOne/liveone -d daily_20141218...daily_20141219
