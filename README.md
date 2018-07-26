# Dependecies
* nodemon

# Usage
  npm run app
  
# Testing
  npm test

# Documentation
  npm docs
  
# Project Outline
## Goals:
* verify accounting's invoice list
  * confirm accurate bills
  * flag inaccurate bills and schedule for deletion
* audit Digital Ocean’s csv
  * find servers not on accounting's invoice list

## Procedures:
* accounting's invoice list
  * loop through each row
    * cross reference real IP with DigO IP
      * get IP data
        * get the domain name
        * find corresponding DigO IP
        * get the real IP for the domain
      * if real IP matches DigO IP
        * check billing amount
          * if billing amount matched
            * mark as ok
          * if billing amount wasn’t matched
            * flag to bill more
      * if real IP doesn’t matches DigO IP
        * flag DigO IP for deletion
        * mark as not ok
* Digital Ocean’s csv
  * loop through each server
    * check if already on accounting's list
      * if on accounting's list
        * leave verification up to 1st procedure
      * if not on accounting's list
        * determine billing amount
        * determine billing period
        * notify accounting to update invoice list
