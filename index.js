const express = require('express');
const bodyParser = require('body-parser');
const expressApp = express().use(bodyParser.json());
const axios = require('axios');

const { dialogflow, Image } = require('actions-on-google');
const app = dialogflow();

// Register show.report handler
app.intent('show.report', (conv, {reportName, filterField, filterOperator, filterValue}) => {
    // Get the Report name and the Filter.
    let reportFilter = {
        column: filterField, 
        operator: filterOperator, 
        value: filterValue
    };

    // Call Salesforce.
    let response =  axios.post(
        'https://sfbottest-developer-edition.na78.force.com/services/apexrest/showreport', 
        {name: reportName, filter: reportFilter}, 
        {headers: {'Content-Type': 'application/json'}}
    );
    
    //Send back the response to Dialogflow
    conv.ask(response.data);
});

expressApp.post('/', app);
expressApp.listen(3000);