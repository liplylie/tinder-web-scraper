const express = require('express');
const path = require('path');
const parser = require('body-parser');
const secret = require('./secret.json');
const promise = require('selenium-webdriver').promise;
const https = require('https');
const fs = require('fs');

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
        .then(driver.wait(until.elementLocated(By.xpath('//*[@id="modal-manager"]/div/div/div[2]/div[1]/div/div[3]/button[1]')), 120000))
            .then(driver.findElement(By.xpath('//*[@id="modal-manager"]/div/div/div[2]/div[1]/div/div[3]/button[1]')).click())
              //start swiping
              .then(() => { 
                /* adjust iterations, how many profiles you'd like to swipe. it's set to 100 by default */
                for (var i = 0; i < 45000; i++) {
                  driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div/div[3]/div[5]')), 120000)
                    // .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[2]/button[4]')).click())
                    /* line above this comment swipes right. line below swipes left. Comment/uncomment them per direction you'd like to swipe */
                    .then(driver.actions().sendKeys(webdriver.Key.ARROW_UP).perform())
                    .then(driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div[1]/a/div/div[1]/div')), 120000))
                    .then(() => {
                        driver.findElements(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div[1]/a/div/div[1]/div/div'))                    
                          .then((elements) => {
                            for (var i = 1; i < elements.length; i++) {
                              driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div[1]/a/div/div[1]/div' + '/div[' + i + ']/div/img')), 120000)
                                .then((element) => {
                                  element.getAttribute('src')
                                    .then((src) => {
                                      console.log('src is: ', src);
                                      let file = fs.createWriteStream(__dirname + '/images/' + src.split('').join('').slice(src.length-10, src.length));
                                      let request = https.get(src, function(response) {
                                        response.pipe(file);
                                      });
                                    })
                                      .then(driver.actions().sendKeys(webdriver.Key.SPACE).perform());
                                });
                            }
                            });
                      })
                        .then(driver.actions().sendKeys(webdriver.Key.ARROW_DOWN).perform())
                            .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[2]/button[2]')).click())
                              .then(driver.actions().sendKeys(webdriver.Key.ESCAPE).perform());
                              console.log(i + ' profiles swiped');
                }
              });

// driver.quit();