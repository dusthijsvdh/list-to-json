const express = require('express');
const axios = require('axios');
const createError = require('http-errors');
const router = express.Router();
const jsonService = require('../services/json-json');

/* GET tools home page. */
router.get('/', (req, res, next) => {
  res.render('layout', {
    title: 'Tools',
    partials: {content: 'tools/tools'}
  });
});

router.get('/list-json', (req, res, next) => {
  res.render('layout', {
    title: 'List to JSON',
    partials: {content: 'tools/list-json'}
  });
});

router.post('/list-json/submit', (req, res, next) => {
  //TODO less dirty 💩
  axios.get(req.body.reqUrl)
  .then(response => {
    console.log(response.data);
    res.redirect('/tools/list-json');
  })
  .catch(err => {
    console.log(err);
    //TODO add usefull message
    next(createError(400));
  });
});

router.get('/json-json', (req, res, next) => {
  res.render('layout', {
    title: 'JSON to JSON',
    partials: {content: 'tools/json-json'}
  });
});

router.post('/json-json/results', (req, res, next) => {
  const reqUrl = req.body.reqUrl;

  jsonService.getFormattedJson(reqUrl)
  .then(response => {
    res.render('layout', {
      title: 'JSON Results',
      formattedJson: response,
      partials: {content: 'tools/json-results'}
    });
  })
  .catch(err => {
    //TODO add usefull message using the message from the err
    next(createError(400));
  });
});

module.exports = router;