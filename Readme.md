<div align="center">

# 🛒 BazarDor - বাজার দর

## 📖 About the Project

BazarDor is a daily grocery price website built for people in Bangladesh. It shows today's price for rice, pulses, oil, vegetables, fish, meat, eggs, milk and spices, how each price changed compared to yesterday, last week and last month, and the price range in different markets. The goal is to help people compare prices and plan their shopping before they go to the market.

## 🌐 Live Website

👉 https://bazardor-owner.netlify.app/

## ✨ Features

- 📈 **Price movers:** separate sections for the top products whose price went up or came down today
- 🏷️ **Live price ticker:** a scrolling bar under the navbar with each product's price and percentage change
- 🗂️ **Category pages:** browse products by rice, pulses, oil, vegetables, fish, meat, eggs and milk, or spices
- 🔃 **Sort by price:** order products from low to high or high to low, sorted by the real numeric value
- 🔒 **Protected product details:** after signing in, see the minimum, maximum and average price, history, and a market-by-market price list
- 🔑 **Authentication:** sign up and sign in with email and password, or with Google and GitHub
- 👤 **My Profile:** view your account details and update your name
- 💀 **Loading skeletons and toasts:** smooth loading states and clear success and error messages
- 🚫 **Friendly 404 page:** a helpful page with a button back to the home page for any unknown route
- 📱 **Responsive design:** works well on mobile, tablet and desktop

## 🛠️ Technologies Used

| Area | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS, DaisyUI |
| Authentication | Better Auth (email/password, Google, GitHub) |
| Database | MongoDB Atlas |
| Notifications | react-hot-toast |
| Hosting | Netlify |


## 🔐 Environment Variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `BETTER_AUTH_SECRET` | Secret key used to sign login sessions |
| `BETTER_AUTH_URL` | The site's address, for example `http://localhost:3000` |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google login |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | GitHub login |

## 🔌 API

Product and category data comes from this API:

- `https://api.api-store.workers.dev/api/bazardor`

---

<div align="center">

Made with ❤️ Tanvir Hasan

</div>