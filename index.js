const express = require('express');
const path = require('path');
const parser = require('body-parser');
const secret = require('./secret.json');

var webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

var driver = new webdriver.Builder()
.forBrowser('chrome')
.build();

driver.get('http://www.facebook.com/');
driver.findElement(By.name('email')).sendKeys(secret.email);
driver.findElement(By.name('pass')).sendKeys(secret.password)
  .then(driver.findElement(By.id('loginbutton')).click())

driver.get('http://www.tinder.com/')
  .then(driver.wait(until.elementLocated(By.xpath('//*[@id="modal-manager"]/div/div/div[2]/div[1]/div/div[3]/button[1]')), 10000))
    .then(driver.findElement(By.xpath('//*[@id="modal-manager"]/div/div/div[2]/div[1]/div/div[3]/button[1]')).click())
      .then(driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[2]/div/div[1]/div[1]/div/button')), 10000))
        .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[2]/div/div[1]/div[1]/div/button')).click())
          .then(driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[2]/div/div/main/div/button')), 10000))
            .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[2]/div/div/main/div/button')).click())
              .then(driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[2]/div/div/div[1]/div/div/div[4]/button[1]')), 10000))
                .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[2]/div/div/div[1]/div/div/div[4]/button[1]')).click())
                  .then(driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[2]/div/div/div[1]/div/div/div[4]/button[1]')), 10000))
                    .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[2]/div/div/div[1]/div/div/div[4]/button[1]')).click());

  
                

    

// driver.quit();