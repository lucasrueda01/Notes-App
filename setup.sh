#!/bin/bash

PASSWORD="root"

#Install

#MySQL Server
sudo apt update
sudo apt install -y mysql-server

#Create database and user
mysql -u root -p"${PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS notes_db;"
mysql -u root -p"${PASSWORD}" -e "GRANT ALL PRIVILEGES ON notes_db.* TO 'root'@'localhost' IDENTIFIED BY 'root';"
mysql -u root -p"${PASSWORD}" -e "FLUSH PRIVILEGES;"
echo "MySQL and Database configuration have been succesfully installed and configurated"

# Node.js and npm
sudo apt install -y nodejs npm

# Vite
sudo npm install -g create-vite

cd notes-frontend

# Dependencies
npm install
npm install react-bootstrap bootstrap
npm install react-router-dom
npm install axios

# Run React Aplication
npm run dev

cd ..
cd notes-backend
cd notes

# Run Spring Boot
./mvnw spring-boot:run