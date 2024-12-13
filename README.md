# FatSecret Nutrition API FRUIT-NUTRI

This project is a Node.js-based API server that fetches nutritional information about fruits using the FatSecret API.

## Features
- Fetch nutritional data for fruits by name.
- Retrieve detailed information about specific food items.
- Simple health-check endpoint to confirm the API is running.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- FatSecret API credentials (Key and Secret)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/C242-PS525/backend-fruit-nutri.git
   cd fruit-nutri
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your FatSecret API credentials:
   ```env
   FATSECRET_KEY=your_client_key
   FATSECRET_SECRET=your_client_secret
   ```

### Running the Server
To start the server locally:
```bash
node app.js
```

The server will run on `http://localhost:8080` by default.

## Endpoints

### 1. Health Check
**GET /**
- Description: Confirms the API is running.
- Response:
  ```
  API berjalan!
  ```

### 2. Fetch Nutrition Information
**GET /nutrition**
- Description: Fetch nutritional details for a given fruit.
- Query Parameters:
  - `fruit` (required): The name of the fruit to search for.
- Example:
  ```
  GET /nutrition?fruit=apple
  ```
- Response:
  ```json
  {
    "food_id": "12345",
    "food_name": "Apple",
    "food_description": "A red apple, medium size",
    "food_type": "fruit",
    "food_url": "https://www.fatsecret.com/food/apple",
    "servings": {
      "serving_size": "1 medium apple",
      "calories": 95,
      "protein": 0.5,
      "carbs": 25,
      "fat": 0.3
    }
  }
  ```

### Error Responses
- 400 Bad Request: Missing `fruit` parameter.
  ```json
  {
    "error": "Nama buah harus disertakan"
  }
  ```
- 404 Not Found: Fruit not found in the database.
  ```json
  {
    "error": "Data untuk buah 'banana' tidak ditemukan"
  }
  ```
- 500 Internal Server Error: Issues with API communication.
  ```json
  {
    "error": "Gagal mengambil data dari API"
  }
  ```

## Deployment
This project is designed to be deployed on Google Compute Engine.

### Steps to Deploy
1. Create a VM instance in Google Compute Engine.
2. SSH into the instance and set up Node.js:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm
   ```
3. Clone your repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the server:
   ```bash
   node app.js
   ```
6. Configure a firewall rule to allow external traffic to your instance on port 8080.
7. Access the API using the external IP address of your Compute Engine instance, e.g.,
   ```
   http://<your-external-ip>:8080
   ```

## Testing with Postman
1. Open Postman and create a new request.
2. Set the request method to **GET**.
3. Enter the endpoint URL, e.g.,
   ```
   https://<your-project-id>.appspot.com/nutrition?fruit=apple
   ```
4. Click **Send** to view the response.
5. you can also test with our endpoint
   ```
   http://34.34.223.87:5000/nutrition
   ```




# Frulens API BACKEND RECIPE

Frulens API adalah sebuah API sederhana yang memungkinkan pengguna untuk mengelola resep makanan dan minuman sehat. API ini mencakup fitur seperti mendapatkan semua resep, mendapatkan resep berdasarkan ID, dan menambahkan resep baru.

## Fitur Utama
- **GET /api/recipes**: Mendapatkan semua resep yang tersedia.
- **GET /api/recipes/:id**: Mendapatkan detail resep berdasarkan ID.
- **POST /api/recipes**: Menambahkan resep baru ke dalam daftar resep.

## Teknologi yang Digunakan
- **Node.js**: Platform server-side JavaScript.
- **Express**: Framework untuk membangun aplikasi web dengan Node.js.
- **JSON File**: Data resep disimpan dalam file `recipes.json` untuk kemudahan pengelolaan.
- **Google App Engine**: Platform untuk mendeploy aplikasi di cloud.

## Struktur Proyek
```
Frulens-API/
├── data/
│   └── recipes.json
├── handler/
│   └── handler.js
├── routes/
│   └── routes.js
├── images/
├── app.yaml
├── server.js
└── README.md
```

### Penjelasan Folder dan File
- **data/recipes.json**: File JSON tempat data resep disimpan.
- **handler/handler.js**: Berisi logika bisnis untuk menangani permintaan API.
- **routes/routes.js**: Mendefinisikan rute API.
- **images/**: Folder untuk menyimpan gambar-gambar resep.
- **app.yaml**: File konfigurasi untuk Google App Engine.
- **server.js**: File utama untuk menjalankan server.

## Cara Menjalankan di Lokal
1. **Clone repository**
   ```bash
   git clone https://github.com/C242-PS525/backend-fruit-nutri.git
   cd backend
   ```

2. **Install dependencies**
   Pastikan Node.js sudah terinstall di komputer Anda. Kemudian jalankan:
   ```bash
   npm install
   ```

3. **Jalankan server**
   ```bash
   node server.js
   ```

4. **Akses API**
   Server akan berjalan pada `http://localhost:8080`. Anda dapat mengakses API menggunakan alat seperti Postman atau browser.

## Cara Deploy ke Google App Engine
1. **Install Google Cloud SDK**
   Pastikan Google Cloud SDK sudah terpasang di komputer Anda.

2. **Login ke Google Cloud**
   ```bash
   gcloud auth login
   ```

3. **Set Project**
   ```bash
   gcloud config set project [PROJECT_ID]
   ```

4. **Deploy Aplikasi**
   Jalankan perintah berikut untuk mendeploy aplikasi:
   ```bash
   gcloud app deploy
   ```

5. **Akses API di App Engine**
   Setelah berhasil deploy, aplikasi Anda akan tersedia di URL yang diberikan oleh Google App Engine, misalnya `https://[PROJECT_ID].appspot.com`.

## Contoh Endpoint

### Mendapatkan Semua Resep
- **Endpoint**: `GET /api/recipes`
- **Response**:
```json
[
  {
    "id": 1,
    "title": "Smoothie Mangga Pisang",
    "ingredients": [
      "1 buah mangga matang",
      "1 buah pisang",
      "100 ml susu almond",
      "1 sendok makan madu"
    ],
    "steps": [
      "Potong mangga dan pisang menjadi bagian kecil.",
      "Masukkan mangga, pisang, susu almond, dan madu ke dalam blender.",
      "Blender hingga halus, sajikan dalam gelas."
    ],
    "image": "images/smoothie.jpg",
    "category": ["Minuman Sehat"],
    "serving": 2,
    "prep_time": "10 menit"
  }
]
```

### Mendapatkan Resep Berdasarkan ID
- **Endpoint**: `GET /api/recipes/:id`
- **Contoh**: `GET /api/recipes/1`
- **Response**:
```json
{
  "id": 1,
  "title": "Smoothie Mangga Pisang",
  "ingredients": ["1 buah mangga matang", "1 buah pisang", "100 ml susu almond", "1 sendok makan madu"],
  "steps": ["Potong mangga dan pisang menjadi bagian kecil.", "Masukkan mangga, pisang, susu almond, dan madu ke dalam blender.", "Blender hingga halus, sajikan dalam gelas."],
  "image": "images/smoothie.jpg",
  "category": ["Minuman Sehat"],
  "serving": 2,
  "prep_time": "10 menit"
}
```

### Menambahkan Resep Baru
- **Endpoint**: `POST /api/recipes`
- **Request Body**:
```json
{
  "title": "Es Krim Alpukat",
  "ingredients": [
    "2 buah alpukat matang",
    "200 ml susu kental manis",
    "100 ml susu cair",
    "1 sendok teh air jeruk nipis"
  ],
  "steps": [
    "Ambil daging alpukat dan haluskan.",
    "Campurkan susu kental manis, susu cair, dan air jeruk nipis.",
    "Masukkan campuran alpukat dan susu ke dalam freezer selama 4 jam.",
    "Es krim buah alpukat siap disajikan!"
  ],
  "image": "images/ice_cream_avocado.jpg",
  "category": ["Dessert", "Sehat"],
  "serving": 4,
  "prep_time": "10 menit"
}
```
- **Response**:
```json
{
  "message": "Recipe added successfully",
  "recipe": {
    "id": 7,
    "title": "Es Krim Alpukat",
    "ingredients": [
      "2 buah alpukat matang",
      "200 ml susu kental manis",
      "100 ml susu cair",
      "1 sendok teh air jeruk nipis"
    ],
    "steps": [
      "Ambil daging alpukat dan haluskan.",
      "Campurkan susu kental manis, susu cair, dan air jeruk nipis.",
      "Masukkan campuran alpukat dan susu ke dalam freezer selama 4 jam.",
      "Es krim buah alpukat siap disajikan!"
    ],
    "image": "images/ice_cream_avocado.jpg",
    "category": ["Dessert", "Sehat"],
    "serving": 4,
    "prep_time": "10 menit"
  }
}
```

## Pengembangan dan Kontribusi
- Fork repository ini.
- Buat branch baru untuk fitur atau perbaikan Anda.
- Kirim pull request setelah perubahan selesai.

## Lisensi
Proyek ini menggunakan lisensi MIT. Silakan gunakan dan modifikasi sesuai kebutuhan Anda.

---

Nikmati eksplorasi resep dengan Frulens API!

