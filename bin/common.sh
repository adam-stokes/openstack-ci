cpLogs()
{
    rsync -az ~/.cloud-install/* ../reports/$1/$2/files --exclude=juju --exclude=local-charms --exclude=*.deb
}
