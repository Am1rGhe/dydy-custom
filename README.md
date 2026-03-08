# Dydy Custom

A custom clothing e-commerce store. Customers can browse the shop, add items to the cart, checkout with Stripe, and manage their account and orders. Admins can manage products, categories, and orders.

The project went through **two different designs** during development before arriving at the current design.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database & Auth:** Supabase
- **Payments:** Stripe
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

---

## Functionalities

### For everyone

- **Home** – Landing page with intro and links to Shop and Log in.
- **Shop** – Product grid: products come from the database with image, name, category, price, and stock. Each product links to its detail page. Featured products show a badge.
- **Product detail** – Single product view with image, name, category, description, base price, size selector, and Add to Cart. Shows in-stock / out-of-stock.
- **Cart** – List of cart items with name, size, price, quantity (increase/decrease), remove item, and cart total. “Proceed to Checkout” sends logged-in users to checkout or redirects to login with return to checkout.
- **About** – Static about page for the brand.
- **Contact** – Contact details (email, phone, location) and expected response time.

### For logged-in customers

- **Checkout** – Shipping form: full name, email, phone, address, city, province, postal code, country. Form is tailored for Canada/Quebec (e.g. province, postal code placeholders). Order is created in the database, then user is sent to Stripe Checkout. After payment, redirect to order success page.
- **Order success** – Confirmation page with order number and shipping address.
- **Account** – Dashboard with links to Profile, Orders, and Settings; shows order count.
- **Account – Orders** – List of the user’s orders with order number, date, total, status, and link to order detail.
- **Account – Order detail** – One order: items, quantities, prices, shipping address, and contact info.
- **Account – Settings** – Update display name and change password.

### Authentication (no account required to browse)

- **Sign up** – Email + password registration.
- **Login** – Email + password. Optional redirect (e.g. after “Proceed to Checkout” from cart).
- **Forgot password** – Request reset email.
- **Reset password** – Set new password via link from email.

### Admin only

- **Admin dashboard** – Counts for products, categories, and orders; links to Products, Categories, and Orders.
- **Admin – Products** – List all products; create new product; edit or delete existing. Product form: name, description, base price, image upload, category, featured flag, in-stock flag.
- **Admin – Categories** – Manage categories (used to group products).
- **Admin – Orders** – List all orders; open an order to see details and update status (e.g. pending, processing, shipped).

Access to admin is controlled (e.g. by role/flag in the database); only admin users see the Admin link and can open admin routes.

---

## Getting Started

```bash
git clone <repository-url>
cd dydyshop
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Configure your own Supabase and Stripe keys locally as needed to run the app.

---

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## License

Private.
