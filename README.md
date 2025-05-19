# Donation Demo (Next.js)

A Next.js-based donation tracking application that allows users to input and manage their donation details, including mosque selection and donation date.

## 🚀 Features

- Multi-step donation form (`Step1.jsx` to `Step6.jsx`).
- Mosque selection with a searchable dropdown.
- Date picker for selecting the donation date.
- State management using React hooks (`useState`, `useEffect`).
- Modular and reusable components.

## 🛠️ Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS
- **State Management:** React hooks (`useState`)
- **Icons:** React Icons (`react-icons`)
- **Image Handling:** Next.js `Image` component

## 📂 Folder Structure

```
donation-demo/
│── public/
│── src/
│   ├── app/                # Main application files
│   ├── assets/             # Static assets (images, styles)
│   │   ├── css/            # CSS files
│   │   ├── img/            # Images
│   ├── components/         # Reusable components
│   │   ├── global/         # Global UI components
│   │   ├── home/           # Home page components
│   │   ├── steps/          # Multi-step donation form
│   │   │   ├── Step1.jsx
│   │   │   ├── Step2.jsx
│   │   │   ├── Step3.jsx
│   │   │   ├── Step4.jsx
│   │   │   ├── Step5.jsx
│   │   │   ├── Step6.jsx
│   │   ├── index.jsx.jsx
│   │   ├── UserChoices.jsx # Displays user-selected options
│   ├── store/              # State management (if applicable)
│── package.json            # Project dependencies
│── README.md               # Project documentation
│── next.config.js          # Next.js configuration
```

## 🛠️ Installation & Setup

### 1. Clone the repository:

```sh
git clone https://github.com/abrarahmed111/donation-demo.git
cd donation-demo
```

### 2. Install dependencies:

```sh
npm install
# or
yarn install
```

### 3. Run the development server:

```sh
npm run dev
# or
yarn dev
```

The app will be available at: [http://localhost:3000](http://localhost:3000).

## 📝 Usage

- Start the app and navigate through the donation steps.
- Select a mosque and a donation date.
- View and confirm the entered donation details.
- (Optional) Extend functionality with a backend API to store donation data.

## 📦 Dependencies

- `next`
- `react`
- `react-dom`
- `react-icons`
- `tailwindcss`

## 📌 Future Improvements

✅ Integrate backend (Node.js/Python/PHP with MySQL/PostgreSQL).  
✅ Add authentication (NextAuth.js or Firebase).  
✅ Implement a payment gateway (Stripe/PayPal).  
✅ Enhance the UI with animations and better accessibility.

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Developed by

Abrar Ahmed from WebWhiz | ✉️ Contact: abrarahmed111

---

### 📌 **How to Use?**

- This file provides all necessary project details.
- Add a backend integration if required.

Let me know if you need modifications! 🚀
