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
driver.findElement(By.id('u_0_2')).click();
driver.wait(until.titleIs('Facebook'), 1000);
driver.quit();