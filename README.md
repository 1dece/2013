database
===
We are using PostgreSQL. Application assum that you have user postgres with password postgres.

create db
---
bundle exec rake db:create

migrate db
---
bundle exec rake db:migrate

reset db
---
bundle exec rake db:migrate:reset

deploy
---

The OpenShift `ruby` cartridge documentation can be found at:

https://github.com/openshift/origin-server/tree/master/cartridges/openshift-origin-cartridge-ruby/README.md

