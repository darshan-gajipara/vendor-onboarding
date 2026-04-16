# Vendor Onboarding – Take Home Assignment

A responsive **3-step Vendor Onboarding Form** built with **React + Vite + TypeScript** using modern form handling, validation, state persistence, and file storage.

---

## 🚀 Tech Stack

* React (Functional Components)
* Vite
* TypeScript
* React Hook Form
* Zod + `@hookform/resolvers`
* Redux Toolkit
* Redux Persist
* IndexedDB (`idb`)
* TailwindCSS
* shadcn/ui
* styled-components

---

## 📦 Installation & Run

```bash
npm install
npm run dev
```

App will run on:

```bash
http://localhost:5173
```

---

## ✅ Features Implemented

### Multi-Step Vendor Form

### Step 1 – Company & Contact Information

* Company Name
* Company Type (dynamic dropdown from local JSON)
* Registration Number
* Established Date
* Employee Count
* Contact Name
* Contact Email
* Contact Phone
* Company Logo Upload

### Step 2 – Address & Bank Details

* Address
* Country / State
* ZIP Code
* Bank Name
* Account Number
* IFSC / SWIFT
* Bank Proof Upload

### Step 3 – Services & Declaration

* Services Offered
* Pricing Model
* Preferred Currency
* Declaration Checkbox
* Notes
* Final Document Upload

---

## ✅ Validation

Each step has its own **Zod schema** integrated with **React Hook Form** using `zodResolver`.

* Required fields validated
* Email format validated
* Minimum phone length
* Step-wise validation before moving next

---

## 🔄 State Management

All form data is managed using **Redux Toolkit**.

* Save step data individually
* Navigate between steps
* Final submit combines all steps

---

## 💾 Persistence

### Redux Persist

Form data remains available after page refresh.

### IndexedDB

Uploaded files are stored in browser IndexedDB.

Stored file metadata in Redux:

* name
* size
* type
* dbKey

After refresh:

* filename / preview restored

---

## 🌐 Dynamic Dropdown

Company Type options loaded from:

```bash
/public/mocks/companyTypes.json
```

Includes:

* Loading state
* Error state
* Retry support

---

## 🎨 UI / UX

* Responsive layout
* TailwindCSS utility styling
* shadcn/ui components
* Clean spacing and cards
* Inline validation messages

---

## 📤 Final Submit

On final submit:

* All collected data shown on screen
* JSON preview rendered
* Payload logged in console
* Success confirmation screen displayed

---

## ⚠️ Assumptions / Trade-offs

* Mock APIs use local JSON files
* No real backend integration
* File preview depends on file type
* IndexedDB storage is browser-specific

---

## 📁 Project Structure

```bash
src/
 ┣ components/
 ┣ features/
 ┣ pages/
 ┣ schemas/
 ┣ lib/
 ┣ hooks/
 ┗ App.tsx
```

---

## 👨‍💻 Author

Developed as part of Frontend Take-Home Assignment.
