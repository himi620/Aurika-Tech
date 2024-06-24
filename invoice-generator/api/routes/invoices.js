// routes/invoices.js
const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Create a new invoice
router.post('/', async (req, res) => {
  try {
    const items = req.body.items.map(item => {
      item.netAmount = item.unitPrice * item.quantity - item.discount;
      item.taxAmount = item.netAmount * item.taxRate / 100;
      item.totalAmount = item.netAmount + item.taxAmount;
      if (req.body.placeOfSupply === req.body.placeOfDelivery) {
        item.taxType = 'CGST & SGST';
        item.taxAmount = item.netAmount * 0.18;
      } else {
        item.taxType = 'IGST';
        item.taxAmount = item.netAmount * 0.18;
      }
      return item;
    });
    req.body.items = items;

    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
