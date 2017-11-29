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
driver.findElement(By.name('pass')).sendKeys(secret.password);
driver.wait(until.titleIs('Facebook - Log In or Sign Up'), 10000);
driver.findElement(By.id('u_0_2')).click();
driver.wait(until.titleIs('Facebook'), 10000);
driver.get('http://www.tinder.com/');
driver.wait(until.titleIs('Tinder | Swipe. Match. Chat.'), 50000);
driver.findElement(By.linkText('Log in with Facebook')).click();

driver.quit();