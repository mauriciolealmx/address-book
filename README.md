# address-book

Simple address-book API. 

## Documentation

* For proper documentation please visit: [http://mleal-address-book.herokuapp.com/api](http://mleal-address-book.herokuapp.com/api).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [PostgreSQL](https://www.postgresql.org/download/)


## Installation

* `git clone https://github.com/mauriciolealmx/address-book.git`
* `cd address-book`
* `npm install`
* Change `connectionString` in `config.j` to point to your local postgreSQL.
* `node dist/models/database.js` This file created a `users` Database in your local instance.

## Running / Development

* `npm run start` or `npm run start:live` to keep updating after changes. 
* Visit your app at [http://localhost:5000](http://localhost:5000).


### Building

* `npm run build`

### Testing

* `npm run test:live`
