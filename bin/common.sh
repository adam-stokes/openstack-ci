./node_modules/.bin/babel src --out-dir dist

cpLogs()
{
    rsync -az ~/.cloud-install/* ../reports/$1/$2/files --exclude=juju --exclude=local-charms --exclude=*.deb
}
