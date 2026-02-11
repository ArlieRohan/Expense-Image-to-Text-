import React, { useState } from 'react';
import './ExpenseOCR.css';

function ExpenseOCR() {
  // Three simple variables to track state
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simple function to get fake receipt data (random)
  function getFakeReceiptData() {
    // Array of different receipts
    const allReceipts = [
      {
        vendor: 'Starbucks Coffee',
        amount: '1547',
        date: '2026-01-28',
        category: 'Food & Dining',
        items: [
          { name: 'Caffe Latte', price: '525' },
          { name: 'Croissant', price: '450' },
          { name: 'Espresso', price: '375' },
          { name: 'Tax', price: '197' }
        ],
        paymentMethod: 'Credit Card'
      },
      {
        vendor: 'Apple store',
        amount: '8799',
        date: '2026-01-30',
        category: 'Shopping',
        items: [
          { name: 'Wireless Mouse', price: '2499' },
          { name: 'USB-C Cable 3pk', price: '1599' },
          { name: 'Notebook Set', price: '1299' },
          { name: 'Shipping', price: '0.00' },
          { name: 'Tax', price: '402' }
        ],
        paymentMethod: 'Debit Card'
      },
      {
        vendor: ' Gas Station',
        amount: '5230',
        date: '2026-02-01',
        category: 'Transportation',
        items: [
          { name: 'Petrol', price: '4875' },
          { name: 'Air fill', price: '355' }
        ],
        paymentMethod: 'UPI'
      },
    ];

    
    const randomNumber = Math.floor(Math.random() * 3);   // it is used to pick random NO from list
    
    // Return the receipt at that position
    return allReceipts[randomNumber];
  }

  // Function when user uploads a file
  function handleImageUpload(event) {
    // Get the file from the input
    const file = event.target.files[0];
    
    // If no file, do nothing
    if (!file) {
      return;
    }

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    
    // Clear old data
    setExtractedData(null);
    
    // Start processing
    setIsProcessing(true);

    // Wait 1.5 seconds then show fake data
    setTimeout(function() {
      const fakeData = getFakeReceiptData();
      setExtractedData(fakeData);
      setIsProcessing(false);
    }, 1500);
  }

  // Function to clear everything
  function handleClear() {
    setSelectedImage(null);
    setExtractedData(null);
    setIsProcessing(false);
  }

  // The HTML part
  return (
    <div className="expense-ocr-container">
      <div className="expense-ocr-wrapper">
        
        {/* Title */}
        <div className="header">
          <h1>Expense Scanner</h1>
          <p>Upload your receipt</p>
        </div>

        {/* If no image selected, show upload box */}
        {selectedImage === null && (
          <div className="upload-box">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <label htmlFor="image-upload" className="upload-label">
              <div className="upload-icon">📁</div>
              <h3>Upload Receipt</h3>
              <p className="upload-text">Click to choose file</p>
              <button 
                type="button"
                onClick={function() {
                  document.getElementById('image-upload').click();
                }}
                className="upload-button"
              >
                Choose File
              </button>
            </label>
          </div>
        )}

        {/* If image is selected, show results */}
        {selectedImage !== null && (
          <div className="details-card">
            
            {/* Top part with clear button */}
            <div className="details-header">
              <h3>Extracted Details</h3>
              <button onClick={handleClear} className="clear-button">
                Clear
              </button>
            </div>

            {/* If processing, show loading */}
            {isProcessing === true && (
              <div className="processing">
                <div className="processing-icon">⏳</div>
                <p>Processing image...</p>
              </div>
            )}

            {/* If done processing and have data, show it */}
            {isProcessing === false && extractedData !== null && (
              <div>
                
                {/* Vendor name */}
                <div className="detail-item">
                  <p className="detail-label">Vendor:</p>
                  <p className="detail-value vendor">{extractedData.vendor}</p>
                </div>

                {/* Total amount */}
                <div className="detail-item">
                  <p className="detail-label">Total Amount:</p>
                  <p className="detail-value amount">{extractedData.amount}</p>
                </div>

                {/* Date */}
                <div className="detail-item">
                  <p className="detail-label">Date:</p>
                  <p className="detail-value">{extractedData.date}</p>
                </div>

                {/* Category */}
                <div className="detail-item">
                  <p className="detail-label">Category:</p>
                  <p className="detail-value">{extractedData.category}</p>
                </div>

                {/* Payment method */}
                <div className="detail-item">
                  <p className="detail-label">Payment Method:</p>
                  <p className="detail-value">{extractedData.paymentMethod}</p>
                </div>

                {/* List of items */}
                <div className="items-container">
                  <p className="items-title">Items:</p>
                  {extractedData.items.map(function(item, index) {
                    return (
                      <div key={index} className="item-row">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">{item.price}</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* If not processing and no data, show message */}
            {isProcessing === false && extractedData === null && (
              <div className="empty-state">
                <p>Upload an image to see details</p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default ExpenseOCR;