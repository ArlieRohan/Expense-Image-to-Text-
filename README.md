# Expense-Image-to-Text-

A simple React-based web application that allows users to upload receipt/bill images and extract details using OCR (Optical Character Recognition) technology. This version is designed for **beginners** with easy-to-understand code.

![Expense Scanner Demo](https://img.shields.io/badge/React-18.0+-blue.svg)
![Beginner Friendly](https://img.shields.io/badge/Level-Beginner-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Module Implementation](#module-implementation)
- [Code Workflow](#code-workflow)
- [Assumptions & Simplifications](#assumptions--simplifications)
- [Future Improvements](#future-improvements)
- [Project Structure](#project-structure)

---

## ✨ Features

- 📤 **File Upload**: Simple click-to-upload interface
- 🔍 **OCR Processing**: Extracts text and data from receipt images
- 📊 **Data Display**: Shows extracted information in organized boxes:
  - Vendor name
  - Total amount
  - Date
  - Category
  - Payment method
  - Itemized list of purchases
- 🔄 **Random Mock Data**: Simulates 4 different receipt types for testing
- ⏳ **Loading State**: Visual feedback during processing (hourglass emoji)
- 🧹 **Clear Function**: Reset and upload new receipts
- 📱 **Responsive Design**: Works on mobile and desktop

---

## 🖼️ Demo

### Upload Screen
Users see a simple upload box with a folder icon and "Choose File" button.

### Processing State
Shows an hourglass emoji (⏳) with "Processing image..." text.

### Results Display
Extracted data is displayed in simple gray boxes with all relevant information.

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Basic knowledge of React

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArlieRohan/Expense-Image-to-Text-
   cd expense-scanner-simple
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🏗️ Module Implementation

### 1. **Upload Module**

**How it was implemented:**
- Uses a simple HTML file input: `<input type="file">`
- The input is hidden with CSS: `display: none`
- A visible button triggers the file picker
- Only accepts image files: `accept="image/*"`

**Which basic concepts are used:**
- HTML `<input>` element
- CSS to hide elements
- JavaScript `getElementById()` to access elements
- `onClick` event handler

**Code snippet:**
```javascript
// Hidden file input
<input
  id="image-upload"
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  style={{display: 'none'}}
/>

// Visible button that opens file picker
<button onClick={function() {
  document.getElementById('image-upload').click();
}}>
  Choose File
</button>
```

**Code Location:** `components/ExpenseOCR-simple.jsx` (lines 110-125)

**Why this approach:**
- Easy to understand for beginners
- No complex libraries needed
- Standard HTML functionality

---

### 2. **OCR Processing Module (Mock)**

**How it was implemented:**
- Uses a simple function called `getFakeReceiptData()`
- Creates an array with 4 different receipt objects
- Picks one randomly using `Math.random()`
- Uses `setTimeout()` to wait 1.5 seconds (simulates processing time)

**Which basic concepts are used:**
- JavaScript functions: `function getFakeReceiptData() { }`
- Arrays: `const allReceipts = [receipt1, receipt2, ...]`
- `Math.random()` for random numbers
- `Math.floor()` to round down
- `setTimeout()` for delays

**Code snippet:**
```javascript
function getFakeReceiptData() {
  // Step 1: Create array with all receipts
  const allReceipts = [
    {vendor: 'Starbucks', amount: '15.47', ...},
    {vendor: 'Amazon', amount: '87.99', ...},
    {vendor: 'Shell', amount: '52.30', ...},
    {vendor: 'Whole Foods', amount: '124.82', ...}
  ];

  // Step 2: Pick random number between 0 and 3
  const randomNumber = Math.floor(Math.random() * 4);
  
  // Step 3: Return receipt at that position
  return allReceipts[randomNumber];
}

// In the upload function:
setTimeout(function() {
  const fakeData = getFakeReceiptData();
  setExtractedData(fakeData);
  setIsProcessing(false);
}, 1500);
```

**Code Location:** `components/ExpenseOCR-simple.jsx` (lines 10-75)

**Why this approach:**
- Very easy to understand
- No complex async/await
- Uses basic JavaScript only
- Clear step-by-step logic

---

### 3. **State Management Module**

**How it was implemented:**
- Uses React's `useState` hook
- Three simple variables to track the app's state
- Each variable has a function to update it

**Which basic concepts are used:**
- React `useState` hook
- Variable declarations with `const`
- Setting initial values (`null` or `false`)

**Code snippet:**
```javascript
// Three state variables
const [selectedImage, setSelectedImage] = useState(null);
const [extractedData, setExtractedData] = useState(null);
const [isProcessing, setIsProcessing] = useState(false);

// To update them, just call the set function:
setSelectedImage('some-image-url');
setExtractedData({vendor: 'Starbucks', amount: '15.47'});
setIsProcessing(true);
```

**What each variable does:**
- `selectedImage`: Stores the image file URL (or null if no image)
- `extractedData`: Stores the receipt data (or null if not processed yet)
- `isProcessing`: True when processing, false otherwise

**Code Location:** `components/ExpenseOCR-simple.jsx` (lines 5-7)

**Why this approach:**
- Simple and easy to understand
- Standard React pattern
- Clear variable names

---

### 4. **File Upload Handler**

**How it was implemented:**
- A function that runs when user selects a file
- Checks if file exists
- Checks if it's an image
- Creates a URL for the image
- Starts the fake OCR process

**Which basic concepts are used:**
- Function definition: `function handleImageUpload(event) { }`
- `if` statements for checking conditions
- `return` to exit early if invalid
- `alert()` to show messages to user

**Code snippet:**
```javascript
function handleImageUpload(event) {
  // Get the file
  const file = event.target.files[0];
  
  // Check if file exists
  if (!file) {
    return; // Exit if no file
  }

  // Check if it's an image
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    alert('Please upload an image file');
    return; // Exit if not an image
  }

  // Create URL and start processing
  const imageUrl = URL.createObjectURL(file);
  setSelectedImage(imageUrl);
  setExtractedData(null);
  setIsProcessing(true);

  // Wait 1.5 seconds then show data
  setTimeout(function() {
    const fakeData = getFakeReceiptData();
    setExtractedData(fakeData);
    setIsProcessing(false);
  }, 1500);
}
```

**Code Location:** `components/ExpenseOCR-simple.jsx` (lines 77-105)

**Why this approach:**
- Step-by-step logic
- Easy to read and follow
- Clear error checking

---

### 5. **Clear/Reset Function**

**How it was implemented:**
- Simple function that resets everything back to the beginning
- Sets all state variables back to null or false

**Which basic concepts are used:**
- Function definition
- Calling state update functions

**Code snippet:**
```javascript
function handleClear() {
  // Reset everything
  setSelectedImage(null);
  setExtractedData(null);
  setIsProcessing(false);
}
```

**Code Location:** `components/ExpenseOCR-simple.jsx` (lines 107-111)

**Why this approach:**
- Very simple
- Does exactly what it says
- Easy to understand

---

### 6. **Display Module (Conditional Rendering)**

**How it was implemented:**
- Uses simple `if` statements with `&&` operator
- Shows different things based on state
- Uses `.map()` to loop through items

**Which basic concepts are used:**
- Conditional rendering: `{condition && <Component />}`
- Comparison: `=== null`, `=== true`, `!== null`
- Array `.map()` function for loops
- Curly braces `{}` to show JavaScript variables in HTML

**Code snippet:**
```javascript
// If no image, show upload box
{selectedImage === null && (
  <div className="upload-box">
    Upload interface here
  </div>
)}

// If image exists, show results
{selectedImage !== null && (
  <div className="details-card">
    
    // If processing, show loading
    {isProcessing === true && (
      <div>⏳ Processing...</div>
    )}
    
    // If done processing, show data
    {isProcessing === false && extractedData !== null && (
      <div>
        <p>Vendor: {extractedData.vendor}</p>
        <p>Amount: ${extractedData.amount}</p>
        
        // Loop through items
        {extractedData.items.map(function(item, index) {
          return (
            <div key={index}>
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
)}
```

**Code Location:** `components/ExpenseOCR-simple.jsx` (lines 113-220)

**Why this approach:**
- Easy to read conditions
- Clear what shows when
- Standard React pattern

---

### 7. **Styling Module**

**How it was implemented:**
- Separate CSS file (not inline styles anymore)
- Uses class names to apply styles
- Simple colors: green and red
- Basic layout with flexbox

**Which basic concepts are used:**
- CSS classes: `.upload-box`, `.detail-item`, etc.
- Colors with hex codes: `#4CAF50`, `#f44336`
- Layout with `display: flex`
- Spacing with `padding`, `margin`

**Code Location:** `components/ExpenseOCR.css`

**Why this approach:**
- Separates styling from logic
- Easy to modify colors
- Clean and organized

---

## 🔄 Code Workflow

### Complete Application Flow (Step-by-Step):

```
┌─────────────────────────────────────────────────────────────┐
│                      1. APP STARTS                          │
│                                                             │
│  • App.jsx loads                                            │
│  • ExpenseOCR component renders                             │
│  • All state variables are null/false:                      │
│    - selectedImage = null                                   │
│    - extractedData = null                                   │
│    - isProcessing = false                                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   2. SHOW UPLOAD SCREEN                     │
│                                                             │
│  Because selectedImage === null, React shows:               │
│  • Page title: "Expense Scanner"                            │
│  • Subtitle: "Upload your receipt"                          │
│  • White box with dashed border                             │
│  • Folder icon (📁)                                        │
│  • Text: "Upload Receipt"                                   │
│  • Green button: "Choose File"                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  3. USER CLICKS BUTTON                      │
│                                                             │
│  User clicks "Choose File" button                          │
│  ↓                                                          │
│  onClick function runs:                                     │
│    document.getElementById('image-upload').click()         │
│  ↓                                                          │
│  Hidden file input opens                                   │
│  ↓                                                          │
│  Operating system file picker appears                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  4. USER SELECTS IMAGE                      │
│                                                             │
│  User picks an image file                                   │
│  ↓                                                          │
│  onChange event triggers                                    │
│  ↓                                                          │
│  handleImageUpload(event) function is called                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│               5. VALIDATE THE FILE                          │
│                                                             │
│  Inside handleImageUpload():                                │
│                                                             │
│  Step 1: Get the file                                       │
│    const file = event.target.files[0];                      │
│                                                             │
│  Step 2: Check if file exists                               │
│    if (!file) { return; }                                   │
│    If no file → Stop here                                   │
│                                                             │
│  Step 3: Check if it's an image                             │
│    const isImage = file.type.startsWith('image/');          │
│    if (!isImage) {                                          │
│      alert('Please upload an image file');                  │
│      return;                                                │
│    }                                                        │
│    If not image → Show alert → Stop here                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                6. UPDATE STATE VARIABLES                    │
│                                                             │
│  File is valid, so:                                         │
│                                                             │
│  Step 1: Create a URL for the image                         │
│    const imageUrl = URL.createObjectURL(file);              │
│    (This creates a temporary URL like:                      │
│     blob:http://localhost:3000/abc-123-def)                 │
│                                                             │
│  Step 2: Update states                                      │
│    setSelectedImage(imageUrl);  ← Now has URL               │
│    setExtractedData(null);      ← Clear old data            │
│    setIsProcessing(true);       ← Show loading              │
│                                                             │
│  React automatically re-renders the component!              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                7. SHOW PROCESSING SCREEN                    │
│                                                             │
│  Because:                                                   │
│  • selectedImage !== null (has URL)                         │
│  • isProcessing === true                                    │
│                                                             │
│  React shows:                                               │
│  • White card with "Extracted Details" title                │
│  • Red "Clear" button in top right                          │
│  • Hourglass emoji: ⏳                                      │
│  • Text: "Processing image..."                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                8. START FAKE OCR PROCESS                    │
│                                                             │
│  Still inside handleImageUpload():                          │
│                                                             │
│  setTimeout(function() {                                    │
│    // This code runs after 1.5 seconds                      │
│                                                             │
│    Step 1: Get fake data                                    │
│      const fakeData = getFakeReceiptData();                 │
│                                                             │
│      Inside getFakeReceiptData():                           │
│      - Create array with 4 receipts                         │
│      - Generate random number: 0, 1, 2, or 3                │
│        Math.floor(Math.random() * 4)                        │
│      - Return receipt at that index                         │
│                                                             │
│    Step 2: Update states                                    │
│      setExtractedData(fakeData);  ← Now has data            │
│      setIsProcessing(false);      ← Done processing         │
│                                                             │
│    React automatically re-renders again!                    │
│  }, 1500);                                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
        (Wait 1.5 seconds...)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                9. SHOW RESULTS SCREEN                       │
│                                                             │
│  Because:                                                   │
│  • selectedImage !== null                                   │
│  • isProcessing === false                                   │
│  • extractedData !== null                                   │
│                                                             │
│  React shows:                                               │
│  ┌──────────────────────────────────────────┐               │
│  │ Extracted Details        [Clear Button]  │               │
│  ├──────────────────────────────────────────┤               │
│  │ Vendor:                                  │               │
│  │ Starbucks Coffee                         │               │
│  ├──────────────────────────────────────────┤               │
│  │ Total Amount:                            │               │
│  │ $15.47                                   │               │
│  ├──────────────────────────────────────────┤               │
│  │ Date:                                    │               │
│  │ 2026-01-28                              │                │
│  ├──────────────────────────────────────────┤               │
│  │ Category:                                │             │
│  │ Food & Dining                            │             │
│  ├──────────────────────────────────────────┤             │
│  │ Payment Method:                          │             │
│  │ Credit Card                              │             │
│  ├──────────────────────────────────────────┤             │
│  │ Items:                                   │             │
│  │  Caffe Latte           $5.25            │             │
│  │  Croissant             $4.50            │             │
│  │  Espresso              $3.75            │             │
│  │  Tax                   $1.97            │             │
│  └──────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              10. USER CLICKS "CLEAR" (OPTIONAL)             │
│                                                             │
│  If user clicks the red "Clear" button:                    │
│                                                             │
│  handleClear() function runs:                              │
│    setSelectedImage(null);                                 │
│    setExtractedData(null);                                 │
│    setIsProcessing(false);                                 │
│                                                             │
│  React re-renders                                          │
│  ↓                                                          │
│  Back to Step 2 (Upload Screen)                            │
└─────────────────────────────────────────────────────────────┘
```

## 📝 Assumptions & Simplifications

### 1. **Mock OCR (Fake Data)**
**Assumption:** Real OCR is not needed for learning.

**Simplification:**
- Uses hardcoded receipt data
- `setTimeout()` simulates processing delay
- Random selection from 4 receipts

**Why:**
- Easier to understand
- No external libraries needed
- Works without internet
- Perfect for learning React

**Real OCR would require:**
```javascript
// Example - NOT in this project
import Tesseract from 'tesseract.js';
```

---

### 2. **Only 4 Receipt Types**
**Assumption:** Limited receipt variety is fine for demo.

**Simplification:**
- Starbucks (coffee shop)
- Amazon (online shopping)
- Shell (gas station)
- Whole Foods (grocery)

**Why:**
- Easy to test
- Shows different categories
- Simple to understand

---

### 3. **No Real Image Processing**
**Assumption:** Don't need to see the uploaded image.

**Simplification:**
- Image URL is created but not displayed
- Focus on extracted text, not image

**Why:**
- Simpler UI
- Less code to write
- Faster page loading

---

### 4. **No Data Saving**
**Assumption:** Data doesn't need to be saved.

**Simplification:**
- No database
- No localStorage
- Data disappears on refresh

**Why:**
- Much simpler for beginners
- No backend needed
- Focuses on React basics

**To save data, you would need:**
- Backend server (Node.js)
- Database (MongoDB)
- A lot more code

---

### 5. **Simple Error Handling**
**Assumption:** Users will upload valid images.

**Simplification:**
- Only checks file type
- Shows simple alert messages
- No detailed error handling

**Why:**
- Keeps code simple
- Easy to understand
- Good enough for learning

---

### 6. **One Receipt at a Time**
**Assumption:** Users upload one receipt per session.

**Simplification:**
- No multiple file uploads
- No file queue
- Clear and start over

**Why:**
- Simple state management
- Easy to follow logic
- Common use case

---

### 7. **Basic Styling**
**Assumption:** Simple design is acceptable.

**Simplification:**
- Basic colors (green, red, gray)
- Simple layout
- No fancy animations
- Emojis for icons (📁, ⏳)

**Why:**
- No icon libraries needed
- Easy to customize
- Focus on functionality

---

### 8. **Modern Browser Only**
**Assumption:** Users have updated browsers.

**Simplification:**
- Uses ES6 JavaScript
- Assumes File API support
- No old browser support

**Supported:**
- Chrome 55+
- Firefox 52+
- Safari 10+
- Edge 15+

---

### 9. **No User Accounts**
**Assumption:** Single-user demo app.

**Simplification:**
- No login/signup
- No user profiles
- Anyone can use it

**Why:**
- Much simpler
- No authentication code
- Perfect for learning

---

### 10. **Fixed Categories**
**Assumption:** 4 categories are enough.

**Simplification:**
- Food & Dining
- Shopping
- Transportation
- Groceries

**Why:**
- Simple to understand
- Covers common cases
- Easy to test

---

## 🚀 Future Improvements

Want to improve this project? Great!

**Easy improvements:**
- Add more receipt types
- Change colors
- Fix typos in comments
- Improve error messages

**Medium improvements:**
- Add localStorage
- Better styling
- More receipt categories

**How to contribute:**
1. Fork this repository
2. Make your changes
3. Test it works
4. Submit a pull request



---

## 📁 Project Structure

```
expense-scanner-simple/
│
├── public/
│   ├── index.html              # Main HTML file
│   └── favicon.ico             # Website icon
│
├── src/
│   ├── components/
│   │   ├── ExpenseOCR-simple.jsx    # Main component (all logic here)
│   │   └── ExpenseOCR.css           # All styles here
│   │
│   ├── App.jsx                 # Root component (very simple)
│   └── index.js                # Entry point
│
├── package.json                # Lists all dependencies
├── README.md                   # This file
└── .gitignore                  # Files to ignore in git
```

---

## 👤 Author

**Your Name**
- GitHub: [@yourus](https://github.com/ArlieRohan)
- Email: arlierohann@gmail.com

---

## 📄 License

This project is licensed under the MIT License - free to use for learning!

---
#
A: Yes! It's MIT licensed - free to use and modify.

---

## 🎓 What You'll Learn

By studying this project, you'll learn:

✅ React basics (useState, components, JSX)
✅ JavaScript functions and variables
✅ Conditional rendering
✅ Event handling (onClick, onChange)
✅ Working with arrays (.map)
✅ File upload handling
✅ Basic styling with CSS
✅ Project structure
✅ How to organize code

---

**Last Updated:** February 2026  
**Version:** 1.0.0 (Simple/Beginner Version)  
**Difficulty:** ⭐ Beginner Friendly
