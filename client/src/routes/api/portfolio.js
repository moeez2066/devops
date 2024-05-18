const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Portfolio = require('../../models/Portfolio');


// @route    POST api/portfolio
// @desc     Create a portfolio ite
// @access   Private

router.post(
    '/',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('link', 'Link is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
  
        const newPortfolio = new Portfolio({
          title: req.body.title,
          link: normalize(req.body.link, { forceHttps: true }),          
          user: req.user.id
        });
  
        const portf = await newPortfolio.save();
  
        res.json(portf);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
      const portf = await Portfolio.find({user: req.user.id});
      
      res.json(portf);
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
      const portf = await Portfolio.findById(req.params.id);
      await portf.delete();
      const portfolio = await Portfolio.find({user: req.user.id});
      res.status(200).json(portfolio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  module.exports = router;

