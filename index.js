const express = require('express');
const path = require('path');
const parser = require('body-parser');
const secret = require('./secret.json');

let webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

let chromeCapabilities = webdriver.Capabilities.chrome();
//setting chrome options to start the browser with notifications disabled
let chromeOptions = {
    'args': ['--disable-notifications']
};
chromeCapabilities.set('chromeOptions', chromeOptions);
let driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();

//log in to facebook
driver.get('http://www.facebook.com/');
driver.findElement(By.name('email')).sendKeys(secret.email)
  .then(driver.findElement(By.name('pass')).sendKeys(secret.password))
    .then(driver.findElement(By.id('loginbutton')).click())
      //log in to Tinder
      .then(driver.get('http://www.tinder.com/'))
        .then(driver.wait(until.elementLocated(By.xpath('//*[@id="modal-manager"]/div/div/div[2]/div[1]/div/div[3]/button[1]')), 20000))
            .then(driver.findElement(By.xpath('//*[@id="modal-manager"]/div/div/div[2]/div[1]/div/div[3]/button[1]')).click())
              //start swiping
              .then(() => { 
                /* adjust iterations, how many profiles you'd like to swipe. it's set to 1000 by default */
                for (var i = 0; i < 1000; i++) {
                  driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div/div[3]/div[5]')), 120000)
                    .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[2]/button[4]')).click())
                    /* line above this comment swipes right. line below swipes left. Comment/uncomment them per direction you'd like to swipe */
                    // .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[2]/button[2]')).click())
                      .then(driver.actions().sendKeys(webdriver.Key.ESCAPE).perform());
                  console.log(i + ' profiles swiped');
                }
              });

// driver.quit();