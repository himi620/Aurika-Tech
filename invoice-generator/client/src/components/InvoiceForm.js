import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    orderNumber: '',
    orderDate: '',
    items: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/invoices`, formData);
      console.log(response.data);
      // Optionally, clear the form after successful submission
      setFormData({
        customerName: '',
        customerEmail: '',
        customerAddress: '',
        orderNumber: '',
        orderDate: '',
        items: [],
      });
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div>
      <h1>Create Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Customer Email</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Customer Address</label>
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Order Number</label>
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Order Date</label>
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add fields for items if needed */}
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
