# 🎞️ Film Lab Management Dashboard

A high-performance, full-stack Next.js 15 application designed to streamline commercial film lab operations. This platform manages the entire lifecycle of a film order—from customer intake to processing, massive file delivery, and automated email notifications.

## 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router)
* **Frontend:** React, Tailwind CSS, Lucide Icons
* **Database:** PostgreSQL (hosted on Supabase)
* **ORM:** Prisma
* **Storage:** Cloudflare R2 (AWS S3 compatible API)
* **Email:** Resend API
* **Utilities:** `react-to-print` (for PDF work orders)

## ✨ Key Features

* **Real-Time Order Dashboard:** A clean, responsive interface to manage orders categorized by status (New, Pending, Completed).
* **Direct-to-Cloud Uploads:** Bypasses standard server limits to upload massive high-resolution `.zip` scan files (up to 5GB+) directly from the browser to Cloudflare R2.
* **Live Upload Tracking:** Custom `XMLHttpRequest` integration to display smooth, real-time progress bars for large file uploads.
* **Automated Customer Delivery:** Automatically dispatches a beautifully formatted email with a secure download link the exact moment an order is marked as Completed.
* **Printable Work Orders:** Generates formatted, printer-friendly PDF dockets for the lab technicians with a single click.
* **Customer Intake & Routing:** Seamless customer form submission that automatically redirects to a dynamic "Thank You" confirmation page with next steps.

## 🛠️ Getting Started

### Prerequisites
Make sure you have Node.js installed, and active accounts for:
* Supabase (Database)
* Cloudflare (R2 Storage Bucket)
* Resend (Emails)

### 1. Clone & Install
```bash
git clone [https://github.com/your-username/film-lab-app.git](https://github.com/your-username/film-lab-app.git)
cd film-lab-app
npm install
