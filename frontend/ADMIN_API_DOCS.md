# 🔐 Admin Collections API - Secret Route

This document describes the secret admin API route that provides CRUD operations on all MongoDB collections from ConnectNest.

## Route

```
/api/admin/collections/[...path]
```

## Authentication

The route is protected by a secret key. You can provide the secret key in three ways:

1. **Authorization Header (Recommended)**:
   ```
   Authorization: Bearer <your-secret-key>
   ```

2. **Custom Header**:
   ```
   x-secret-key: <your-secret-key>
   ```

3. **Query Parameter** (Less secure, but convenient):
   ```
   ?secret=<your-secret-key>
   ```

The secret key is configured via the `ADMIN_SECRET_KEY` environment variable. If not set, it defaults to `'your-secret-key-change-this'` (you should change this!).

## Environment Setup

Add these environment variables to your `.env.local` file:

```env
# MongoDB Connection (same as ConnectNest)
MONGODB_URI=mongodb+srv://username:password@host/database?retryWrites=true&w=majority&appName=JSTraining
# OR use individual variables:
MONGODB_USERNAME=your-username
MONGODB_PASSWORD=your-password
MONGODB_HOST=jstraining.buufn0n.mongodb.net
MONGODB_DATABASE=AryamannLifeVars

# Admin Secret Key
ADMIN_SECRET_KEY=your-super-secret-key-here
```

## Available Collections

The API works with all collections in the ConnectNest database, including:

- `items`
- `wardrobe`
- `gym-progress`
- `exercise-entries`
- `fridgeitems`
- `kitchenequipments`
- `utensils`
- `devices`
- `books`
- `udemyaccesses`
- `gfgcourseprogresses`
- `codingninjascourses`
- `tlelevel3courses`
- `topicprogresses`
- `moduleprogresses`
- `cppproblems`
- `cppproblemlists`
- `companies`
- `streamingapps`
- `socialplatformitems`
- `musicalinstruments`
- `mobilities`
- `airesources`
- `modelusages`
- `usagelimits`
- `users`
- And any other collections in the database

## API Endpoints

### 1. List All Collections

**GET** `/api/admin/collections`

Returns a list of all collections in the database.

**Example:**
```bash
curl -H "Authorization: Bearer your-secret-key" \
  http://localhost:3000/api/admin/collections
```

**Response:**
```json
{
  "collections": [
    { "name": "items", "type": "collection" },
    { "name": "wardrobe", "type": "collection" },
    ...
  ]
}
```

### 2. Get All Documents from a Collection

**GET** `/api/admin/collections/{collectionName}`

**Query Parameters:**
- `limit` (default: 100) - Maximum number of documents to return
- `skip` (default: 0) - Number of documents to skip
- `sort` (default: "_id") - Field to sort by
- `order` (default: "asc") - Sort order: "asc" or "desc"
- Any other query params are used as filter criteria

**Example:**
```bash
# Get all items
curl -H "Authorization: Bearer your-secret-key" \
  http://localhost:3000/api/admin/collections/items

# Get items with pagination
curl -H "Authorization: Bearer your-secret-key" \
  "http://localhost:3000/api/admin/collections/items?limit=10&skip=0"

# Filter items by name
curl -H "Authorization: Bearer your-secret-key" \
  "http://localhost:3000/api/admin/collections/items?name=test"
```

**Response:**
```json
{
  "data": [...],
  "count": 10,
  "limit": 100,
  "skip": 0,
  "total": 10
}
```

### 3. Get Single Document

**GET** `/api/admin/collections/{collectionName}/{documentId}`

**Example:**
```bash
curl -H "Authorization: Bearer your-secret-key" \
  http://localhost:3000/api/admin/collections/items/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Item Name",
  "description": "Item Description",
  ...
}
```

### 4. Create Document(s)

**POST** `/api/admin/collections/{collectionName}`

**Body:** Single document object or array of documents

**Example:**
```bash
# Create single document
curl -X POST \
  -H "Authorization: Bearer your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item", "description": "Description"}' \
  http://localhost:3000/api/admin/collections/items

# Create multiple documents
curl -X POST \
  -H "Authorization: Bearer your-secret-key" \
  -H "Content-Type: application/json" \
  -d '[{"name": "Item 1"}, {"name": "Item 2"}]' \
  http://localhost:3000/api/admin/collections/items
```

**Response:**
```json
{
  "success": true,
  "_id": "507f1f77bcf86cd799439011"
}
```

### 5. Update Document

**PUT** `/api/admin/collections/{collectionName}/{documentId}`

**Body:** Document with fields to update (excluding `_id`)

**Example:**
```bash
curl -X PUT \
  -H "Authorization: Bearer your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "description": "Updated Description"}' \
  http://localhost:3000/api/admin/collections/items/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "matchedCount": 1,
  "modifiedCount": 1
}
```

### 6. Update Multiple Documents

**PUT** `/api/admin/collections/{collectionName}`

**Body:**
```json
{
  "filter": { "status": "active" },
  "update": { "status": "inactive" }
}
```

**Example:**
```bash
curl -X PUT \
  -H "Authorization: Bearer your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"filter": {"category": "food"}, "update": {"priority": "high"}}' \
  http://localhost:3000/api/admin/collections/fridgeitems
```

### 7. Partial Update (Upsert)

**PATCH** `/api/admin/collections/{collectionName}/{documentId}`

**Body:** Fields to update (supports upsert)

**Example:**
```bash
# Update or create if not exists
curl -X PATCH \
  -H "Authorization: Bearer your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "New or Updated", "upsert": true}' \
  http://localhost:3000/api/admin/collections/items/507f1f77bcf86cd799439011
```

### 8. Delete Single Document

**DELETE** `/api/admin/collections/{collectionName}/{documentId}`

**Example:**
```bash
curl -X DELETE \
  -H "Authorization: Bearer your-secret-key" \
  http://localhost:3000/api/admin/collections/items/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "deletedCount": 1
}
```

### 9. Delete Multiple Documents

**DELETE** `/api/admin/collections/{collectionName}?deleteAll=true`

**Example:**
```bash
# Delete all documents in collection
curl -X DELETE \
  -H "Authorization: Bearer your-secret-key" \
  "http://localhost:3000/api/admin/collections/items?deleteAll=true"

# Delete with filter (via body)
curl -X DELETE \
  -H "Authorization: Bearer your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"filter": {"status": "inactive"}}' \
  http://localhost:3000/api/admin/collections/items
```

## JavaScript/TypeScript Examples

### Using Fetch API

```typescript
const SECRET_KEY = 'your-secret-key';

// Get all collections
const collections = await fetch('/api/admin/collections', {
  headers: {
    'Authorization': `Bearer ${SECRET_KEY}`
  }
}).then(r => r.json());

// Get all items
const items = await fetch('/api/admin/collections/items', {
  headers: {
    'Authorization': `Bearer ${SECRET_KEY}`
  }
}).then(r => r.json());

// Create item
const newItem = await fetch('/api/admin/collections/items', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SECRET_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'New Item',
    description: 'Description'
  })
}).then(r => r.json());

// Update item
const updated = await fetch('/api/admin/collections/items/item-id', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${SECRET_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Updated Name'
  })
}).then(r => r.json());

// Delete item
const deleted = await fetch('/api/admin/collections/items/item-id', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${SECRET_KEY}`
  }
}).then(r => r.json());
```

### Using Axios

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/admin/collections',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}`
  }
});

// Get collections
const collections = await api.get('/');

// Get items
const items = await api.get('/items');

// Create item
const newItem = await api.post('/items', {
  name: 'New Item',
  description: 'Description'
});

// Update item
const updated = await api.put('/items/item-id', {
  name: 'Updated Name'
});

// Delete item
const deleted = await api.delete('/items/item-id');
```

## Security Notes

⚠️ **IMPORTANT**: 

1. **Change the default secret key** - The default key is not secure
2. **Use environment variables** - Never commit the secret key to version control
3. **Use HTTPS in production** - Always use HTTPS when accessing this API
4. **Restrict access** - Consider adding IP whitelisting or additional authentication layers
5. **Monitor usage** - Log all access to this endpoint for security auditing

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing required parameters)
- `401` - Unauthorized (invalid or missing secret key)
- `404` - Not Found (document or collection not found)
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message here"
}
```

