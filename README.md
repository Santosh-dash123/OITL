# ✌️ Odisha IT Learners — .NET Full Stack & Angular Online Portal

Specialized training portal for **Odisha IT Learners** (.NET Full Stack Development, Angular, and .NET with AI).

---

## 📅 New Batch Details
- **Batch Start Date**: **26th October**
- **Delivery Mode**: **Online Batch Only** (Live interactive video classes & screen sharing)
- **Batch Timing Options (1 Hour Daily)**:
  - **Morning Slots**: `6:30 AM – 7:30 AM` &nbsp;|&nbsp; `7:30 AM – 8:30 AM`
  - **Night Slots**: `8:00 PM – 9:00 PM` &nbsp;|&nbsp; `9:00 PM – 10:00 PM`

---

## 💰 Course Pricing & Special Offer
- **.NET Full Stack Development Course (3 Months)**:
  - **Standard Tuition Price**: `₹15,000`
  - **Special Batch Offer**: **`₹12,000`** *(Save ₹3,000!)*
- **Angular Mastery Course (1.5 Months)**:
  - **Full Course Fee**: **`₹3,500`**

---

## 🚀 Key Course Offerings ("What We Provide")
1. **Live Sessions**: Delivered bilingually in **Odia / Hindi / English** for deep clarity and zero language barrier.
2. **24*7 Technical Support**: Continuous doubt clearing, assignment reviews, and error debugging.
3. **Last 1 Month Dedicated to Real Industry Standard Project**: Complete development of an enterprise product with Clean Architecture, CQRS, and Angular UI.
4. **Server Related Knowledge**: Real DevOps skills — Windows IIS Server setup, Linux Ubuntu hosting, Docker containerization, and cloud deployment.

---

## 👥 Core Contact & Admissions
- **HR & Admissions Lead**: **Arpita Pani** — **`7846890323`** (Call & WhatsApp)
- **Official Email**: **`odishaitlearners@gmail.com`**
- **Registered Address**: Niladri Vihar, Housing Board Colony, Bhubaneswar (BBSR), Odisha

---

## 🔐 Protected Admin Portal & Batch Registration Details
Only the institute admin can view student leads and download the Excel sheet:
- **Admin Portal URL**: [`admin.html`](file:///C:/Users/nirak/.gemini/antigravity/scratch/odisha-it-learners/admin.html)
- **Admin Login Email**: `odishaitlearners@gmail.com`
- **Admin Password**: `Oitl@123`

### Features Inside Admin Portal:
1. **Confidential Student View**: Normal students on public pages cannot see or access other students' submissions.
2. **Batch Registration Details Table**: Displays Date, Student Name, Contact Number, Selected Course, Batch Slot, and Location.
3. **1-Click Call & WhatsApp**: Instantly dial or message registered students directly from the dashboard.
4. **Export to Excel (.CSV)**: Generates and downloads the latest Excel spreadsheet with all student records.

---

## 🌐 Centralized Multi-Laptop Data Sync (How to Connect Live Google Sheets)
When 100 students submit forms from 100 different laptops/phones across Odisha, connect a free Google Sheet so all entries stream directly into one central cloud spreadsheet:
1. Create a blank Google Sheet in your Google Drive (e.g. named *"Odisha IT Learners - Batch Registrations"*).
2. Go to **Extensions ➔ Apps Script**.
3. Paste this simple 7-line script:
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.date, data.name, data.phone, data.email, data.course, data.slot, data.mode, data.location]);
  return ContentService.createTextOutput("Success");
}
```
4. Click **Deploy ➔ New Deployment ➔ Web App** (Set *Who has access: Anyone*).
5. Copy the generated Web App URL and paste it into `GOOGLE_SHEET_WEBHOOK_URL` in `js/main.js` (line 197).
Now, whenever any student anywhere in Odisha clicks Submit, their lead is immediately added to your Google Sheet and reflected in your Admin Portal!

---

## 📁 Project Structure

```
odisha-it-learners/
├── index.html              # Main landing page with 26th Oct batch & inquiry form
├── courses.html            # Course catalog with ₹15k -> ₹12k offer details
├── contact.html            # Contact desk with HR Arpita Pani (7846890323)
├── admin.html              # Password-protected Admin Portal (Batch Registration Details)
├── README.md               # Documentation & setup guide
├── css/
│   └── style.css           # Styling, themes, responsive rules
├── js/
│   ├── main.js             # Logic: Lead recording, timers, calculations
│   └── admin.js            # Admin Auth & Batch Registration table management
└── assets/
    └── images/
        ├── logo.svg        # Scalable vector logo (Universal / Light)
        └── logo-dark.svg   # Scalable vector logo (Dark mode)
```

---

## 🌐 How to View
Open [**`index.html`**](file:///C:/Users/nirak/.gemini/antigravity/scratch/odisha-it-learners/index.html) in any web browser!
