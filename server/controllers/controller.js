const urls = require('../../db/models/urlModel.js')

module.exports = {
	getUrls: function(req,res){
		urls.findAll().then((url) => {
  			res.status(200).send(JSON.stringify(url))
		})
		.catch(()=>{console.log("get Urls failed")})
	},

	postUrl: function(req,res){
		console.log(req.body.url, "post res")
		urls.create({
        url: req.body.url
    }).then(function(data) {
       	console.log(data, "post data")
        res.status(200).send(data)
	})
	.catch(()=>{console.log("postUrl failed")})
	}
}