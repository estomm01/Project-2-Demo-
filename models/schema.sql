
DROP DATABASE IF EXISTS petHappydb;
CREATE DATABASE petHappydb;
USE petHappydb;

CREATE TABLE users
(
  id MEDIUMINT
  AUTO_INCREMENT NOT NULL,
   user_name VARCHAR
  (15) NOT NULL,
   phone_number INTEGER
  (255) NOT NULL,
   zip_code INTEGER
  (6) NOT NULL,
   email VARCHAR
  (100) NOT NULL,
   pswd VARCHAR
  (255) NOT NULL,,
   PRIMARY KEY
  (id)
);


-- DROP DATABASE IF EXISTS exampledb;
-- CREATE DATABASE exampledb;
