const express = require('express');
const axios = require('axios')
const path = require('path');
const parser = require('body-parser');
const secret = require('./secret.json');
const domainName = 'http://localhost:3000';

let dummyFace = "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzQzMTY2NDc4/will-smith-9542165-1-402.jpg"
let urls = [];
let faceIds = [];
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
                for (var i = 0; i < 5; i++) {
                  driver.wait(until.elementLocated(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div/div[3]/div[5]')), 20000)
                    // .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[2]/button[4]')).click())
                    /* line above this comment swipes right. line below swipes left. Comment/uncomment them per direction you'd like to swipe */
                    .then(() => {
                      let image = driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div/div[3]/div[1]'))
                      image.getCssValue('background-image')
                        .then(val => {
                          val = val.substring(5, val.length - 2)
                          console.log(val, 'val')
                          if (val.length > 5){
                            urls.push(val)
                          }
                          //driver.get(val)
                        })
                      //driver.get(image)
                      //
                      // for other's pic:
                      // driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div/div[3]/div[1]')).getCssValue("style")
                      // for your own pic:
                      //driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[1]/div/div[1]/img')).getAttribute("src")
                    })
                    .then(driver.findElement(By.xpath('//*[@id="content"]/div/span/div/div[1]/div/main/div/div/div/div[1]/div[2]/button[2]')).click())
                      .then(driver.actions().sendKeys(webdriver.Key.ESCAPE).perform());
                }
              })
              .then(()=>{
                // console.log(urls,'urls')
                // stores urls into database
                for ( let j = 0; j < urls.length; j++) {
                  axios.post(`${domainName}/api/postUrl`, {
                    url: urls[j]
                    })
                    .then(data =>{
                      console.log('post sent', data)
                    })
                    .catch(err => {
                      console.log(err, 'post failed')
                    })
                  }
                })
                .then(()=>{
                  // face detect - get face id
                  let dataDetect = {
                    "url": dummyFace,
                    "returnFaceId": "true",
                    "returnFaceLandmarks": "false"
                  }
                  axios.post("https://westus.api.cognitive.microsoft.com/face/v1.0/detect?", dataDetect, {
                    headers: {
                      "Content-Type": "application/json",
                      "Ocp-Apim-Subscription-Key": secret.Key1
                    }
                  })
                  .then(function({data}) {
                      console.log("data from detect", data);
                      faceIds.push(data)
                      console.log(faceIds, 'faceIds')
                  })
                  .catch(function(err) {
                      console.log("error from detect", err);
                  });
                })
                // .then(()=>{
                //   // face verify - take two faces and compare them
                //   let dataVerify = {
                //     faceId1: "",
                //     faceId2: "",
                //   }
                //   axios.post("https://westus.api.cognitive.microsoft.com/face/v1.0/verify", dataVerify, {
                //     headers: {
                //       "Content-Type": "application/json",
                //       "Ocp-Apim-Subscription-Key": secret.key1
                //     }
                //   })
                //   .then(data => {
                //       console.log("data from verify", data);
                //   })
                //   .error(err => {
                //       console.log(err,"error from verify");
                //   })
                // })

// driver.quit();