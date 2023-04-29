/*
    prompteng.js -- router for all promptengineering pages
*/
const express = require('express');
const router = express.Router();
const promptItem = require('../models/promptItem')
const User = require('../models/User')
const {Configuration, OpenAIApi} = require('openai')
const config = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(config);
/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    } else {
      res.redirect('/login')
    }
}


router.get('/promptengineering',
    isLoggedIn,
    async (req, res, next) => {
        res.render('promptind')       
    }
)

router.get('/promptengineering/team',
    isLoggedIn,
    async ( req, res, next) => {
        res.render('team')
    }
)

router.get('/promptengineering/about',
    isLoggedIn,
    async ( req, res, next) => {
        res.render('promptabout')
}
)

router.get('/promptengineering/prompt',
    isLoggedIn,
    async (req, res, next) => {
        res.render('promptform')
    }
)
router.get('/promptengineering/response',
    isLoggedIn,
    async (req, res, next) => {
        res.redirect('/promptengineering/prompt')
    }
)
router.post('/promptengineering/response',
    isLoggedIn,
    async (req, res, next) => {
        let prompt = "Turn the following prompt into a Limerick:"
        const userprompt = req.body.prompt
        prompt = prompt.concat(" ", userprompt)
        const completion = await openai.createCompletion({
            model:'text-davinci-003',
            prompt: prompt,
            max_tokens: 2048,
            temperature: 0.8,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop:["{}"],
        })
        let response = completion.data.choices[0].text
        const pr_eng = new promptItem(
            {prompt:userprompt,
            response: response,
            createdAt: new Date(),
            userId: req.user._id
            }
        )
        res.render('promptresponse',{response, userprompt})
    }
)

module.exports = router;