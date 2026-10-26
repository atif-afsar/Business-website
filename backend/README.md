# MOD-7 Backend & Content Management API

Backend API and dynamic content service for the **MOD-7 Modular Architecture** business website.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment (`.env`)
```env
PORT=5050
NODE_ENV=development
MONGO_URI=mongodb+srv://atif-afsar:<password>@cluster1.wkfp8.mongodb.net/mod7_db?retryWrites=true&w=majority
UPLOAD_DIR=uploads
JWT_SECRET=mod7_super_secret_jwt_key_2026
ADMIN_EMAIL=admin@mod-7.com
ADMIN_PASSWORD=admin123
```

### 3. Run Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on: **`http://localhost:5050`**

---

## 🔐 Admin Authentication Credentials
- **Admin Portal URL**: `http://localhost:5173/admin`
- **Email**: `admin@mod-7.com`
- **Password**: `admin123`
*(You can customize these credentials anytime in `backend/.env`)*

---

## 🗄️ Database Flexibility
- **MongoDB**: Automatically connects if `MONGO_URI` is available and reachable.
- **Auto Fallback**: If MongoDB is not yet running, the backend seamlessly falls back to `backend/data/store.json`. All API requests and file updates work immediately without crashing.

---

## 📡 API Endpoints Reference

### 1. Hero Section (`/api/hero`)
- **`GET /api/hero`**: Fetch current hero headline, subtext, button text, and hero image.
- **`PUT /api/hero`**: Update hero headline, subtext, philosophy text, button text, or image URL.
  ```json
  {
    "headline": "MODULAR CONSTRUCTION IS OUR",
    "philosophyText": "NEW PHILOSOPHY.",
    "subtext": "Custom turnkey houses for living...",
    "buttonText": "DISCUSS THE PROJECT"
  }
  ```
- **`POST /api/hero/image`**: Upload a new hero photo (`multipart/form-data` with field `image`). Automatically sets `hero.image` to `/uploads/<new_filename>`.

### 2. About Studio (`/api/about`)
- **`GET /api/about`**: Get description, badge, button, and stats array.
- **`PUT /api/about`**: Update description and metric cards (`100+`, `23`, `15`).

### 3. Projects Showcase (`/api/projects`)
- **`GET /api/projects`**: List all published projects (Project #43, etc.).
- **`GET /api/projects/:id`**: Get single project.
- **`POST /api/projects`**: Create new project with title, location, area, images.
- **`PUT /api/projects/:id`**: Update existing project.
- **`DELETE /api/projects/:id`**: Delete project.

### 4. House Models (`/api/houses`)
- **`GET /api/houses`**: List models (Model S, Model M, Model L).
- **`GET /api/houses/:id`**: Get single model specs, dimensions, base price, 3D render.
- **`POST /api/houses`**: Create new house series.
- **`PUT /api/houses/:id`**: Update model specs, prices, images.
- **`DELETE /api/houses/:id`**: Delete model.

### 5. Advantages (`/api/advantages`)
- **`GET /api/advantages`**: List 3 core advantages (Rapid Construction, Build Anywhere, Best Insulation).
- **`PUT /api/advantages`**: Update advantages.

### 6. Client Consultation Inquiries (`/api/inquiries`)
- **`POST /api/inquiries`**: Submit consultation request from frontend.
- **`GET /api/inquiries`**: List all client inquiries (for Admin Panel).
- **`PATCH /api/inquiries/:id/status`**: Update inquiry status (`new`, `contacted`, `closed`).

### 7. Cost Calculator Quotes (`/api/quotes`)
- **`POST /api/quotes`**: Submit quote from cost calculator.
- **`GET /api/quotes`**: View all calculated estimates with client contact info (for Admin Panel).
- **`PATCH /api/quotes/:id/status`**: Update quote status.

### 8. Image Uploads (`/api/upload`)
- **`POST /api/upload`**: Generic upload endpoint (`multipart/form-data`, field `image`).
  - Returns: `{ "success": true, "relativeUrl": "/uploads/filename.png", "fullUrl": "http://localhost:5000/uploads/filename.png" }`
