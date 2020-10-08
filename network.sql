 DROP TABLE IF EXISTS users;
 DROP TABLE IF EXISTS reset_psw CASCADE;
 DROP TABLE IF EXISTS friendships CASCADE;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS wall;


 CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     first VARCHAR NOT NULL, 
     last VARCHAR NOT NULL,
     email VARCHAR NOT NULL UNIQUE,
     password VARCHAR NOT NULL,
     bio TEXT,
     image_url VARCHAR,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE reset_psw (
     id SERIAL PRIMARY KEY,
     email VARCHAR NOT NULL,
     secretcode VARCHAR NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

 CREATE TABLE friendships(
       id SERIAL PRIMARY KEY,
       sender_id INT REFERENCES users(id) NOT NULL,
       recipient_id INT REFERENCES users(id) NOT NULL,
       accepted BOOLEAN DEFAULT false
   );

CREATE TABLE chat(
      id SERIAL PRIMARY KEY,
      sender_id INT REFERENCES users(id) NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE wall(
      id SERIAL PRIMARY KEY,
      sender_id INT REFERENCES users(id) NOT NULL,
      message TEXT,
      wall_owner_id INT REFERENCES users(id) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );