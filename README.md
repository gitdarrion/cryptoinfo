# Demo

Demo is a crypto-currency analysis application. The application downloads data from the coinmetrics.io API on Bitcoin, BitcoinCash, Litecoin, Ethereum, and EthereumClassic. The data is stored in a local MySQL database named "crypto." The data is loaded from the database into a searchable and sortable table rendered on a web page. The web application has a domain for each coin (e.g., "/bitcoin"). 

## Requirements

 - MacOS or Ubuntu.
 - Local running instance of MySQL database.
 - MySQL 'root' user with password 'password'. 
 - Node.
 - Express.

## Install
Download the code.

    git clone https://github.com/darrion/cryptoinfo.git.

Navigate to the root directory of the repository.

    cd cryptoinfo

Install the dependencies using npm. 

    npm install 

Create the database.

    node setup

Execute the application.

    node server

Open a browser. Navigate to localhost:3000.
