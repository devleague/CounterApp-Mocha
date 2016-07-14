'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ds = require('../dataStore');

router.use(bodyParser.json());

router.get('/', (req, res) => res.json(ds.data));

router.post('/', (req, res) => res.json(ds.create(req.body)));

router.get('/:id', (req, res) => res.json(ds.getById(req.params.id)));

router.get('/:id/increment', (req, res) => res.json(ds.incrementById(req.params.id)));

router.get('/:id/decrement', (req, res) => res.json(ds.decrementById(req.params.id)));

router.put('/:id', (req, res) => res.json(ds.updateById(req.params.id, req.body)));


module.exports = router;
