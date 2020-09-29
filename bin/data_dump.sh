mysqldump -u cs314-db -p -h faure cs314 world --where="municipality like '%Heli__%' or name like '%Heli__%'" --lock-tables=false > ../server/src/test/resources/world.sql

mysqldump -u cs314-db -p -h faure cs314 country --where="name like '%Heli__%'" --lock-tables=false > ../server/src/test/resources/country.sql

mysqldump -u cs314-db -p -h faure cs314 region --where="name like '%Heli__%'" --lock-tables=false > ../server/src/test/resources/region.sql

mysqldump -u cs314-db -p -h faure cs314 colorado --where="municipality='Denver'" --lock-tables=false > ../server/src/test/resources/colorado.sql

