const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user'); // Adjust path as needed

const app = express();

// CORS and middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Delete endpoint - change to match frontend
app.delete('/register/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Attempting to delete delivery with ID:', id);
    
    const deletedDelivery = await User.findByIdAndDelete(id);
    
    if (!deletedDelivery) {
      console.log('Delivery not found');
      return res.status(404).json({ message: 'Delivery not found' });
    }
    
    console.log('Deleted delivery:', deletedDelivery);
    res.status(200).json({ 
      message: 'Delivery deleted successfully',
      deletedDelivery 
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      message: 'Error deleting delivery', 
      error: error.message 
    });
  }
});

module.exports = app;