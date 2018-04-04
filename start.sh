#!/bin/bash
echo ' ####################################### Starting script... #########################################'
echo 'Enter your instance public IP'
read ip
echo 'Enter your server name like this ===> example.com'
read serverName

nodeSetup(){
    echo '############################### Settting up Node Environment ################################'
    curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    sudo apt-get install nodejs -y
    sudo npm install babel-cli -g
}

nginxSetup(){
    echo '############################## Setting up pm2, nginx and getting the repo ########################################'
    sudo npm install pm2 -g -y
    git clone https://github.com/babadee001/DevOps-AWS-Intro
    sudo apt-get install nginx
    cd /etc/nginx/sites-enabled/default
    sudo rm /etc/nginx/sites-enabled/default
    sudo bash -c 'cat > /etc/nginx/sites-available/HelloBooks <<EOF
    server {
            listen 80;
            server_name '$serverName' 'www.$serverName';
            location / {
                    proxy_pass 'http://$ip:8000';
            }
    }
    EOF'
    sudo ln -s /etc/nginx/sites-available/HelloBooks /etc/nginx/sites-enabled/HelloBooks
    sudo /etc/init.d/nginx start
    sudo /etc/init.d/nginx restart
}

installDep(){
    echo '######################### Installing App Dependencies ##################################'
    cd DevOps-AWS-Intro
    sudo npm install --unsafe-perm
}

sslSetup(){
    echo '############################### Setting up SSL Certificate ##############################'
    sudo add-apt-repository ppa:certbot/certbot
    sudo apt-get update
    sudo apt-get install python-certbot-nginx
    sudo certbot --nginx -d $serverName -d www.$serverName
}

startPm2() {
    echo '############################### Starting App with pm2 ###############################'
     pm2 startOrRestart ecosystem.config.js
}

nodeSetup
nginxSetup
installDep
sslSetup
startPm2