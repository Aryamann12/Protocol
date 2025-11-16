# 🔐 Admin Dashboard Setup Guide

## Quick Setup

To use the Admin Dashboard at `/admin`, you need to configure MongoDB connection and set a secret key.

### Step 1: Create `.env.local` file

Create a file named `.env.local` in the `portfolio` folder with the following content:

```env
# MongoDB Connection (from ConnectNest)
MONGODB_URI=mongodb+srv://aryamatomar:iSo9H2oZrdn6WlVV@jstraining.buufn0n.mongodb.net/?retryWrites=true&w=majority&appName=JSTraining
MONGODB_DATABASE=AryamannLifeVars

# Admin Secret Key (CHANGE THIS!)
ADMIN_SECRET_KEY=your-secret-key-change-this
```

**OR** use individual variables:

```env
# MongoDB Connection (from ConnectNest)
MONGODB_USERNAME=aryamatomar
MONGODB_PASSWORD=iSo9H2oZrdn6WlVV
MONGODB_HOST=jstraining.buufn0n.mongodb.net
MONGODB_DATABASE=AryamannLifeVars

# Admin Secret Key (CHANGE THIS!)
ADMIN_SECRET_KEY=your-secret-key-change-this
```

### Step 2: Set Your Secret Key

**Important:** Change `your-secret-key-change-this` to a strong, unique secret key. This key is used to authenticate all admin API requests.

Example of a good secret key:
```
ADMIN_SECRET_KEY=my-super-secret-admin-key-2024-xyz789
```

### Step 3: Restart Your Dev Server

After creating/updating `.env.local`, restart your Next.js development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Access the Admin Dashboard

1. Navigate to `http://localhost:3000/admin` (or your Next.js port)
2. Enter your secret key in the input field
3. Click "Load Collections" to fetch all collections from ConnectNest database

## Available Collections

Based on ConnectNest, you should see these collections:

- **items** - General items
- **wardrobe** - Wardrobe items and outfits
- **gym-progress** - Gym workout progress
- **exercise-entries** - Individual exercise entries
- **fridgeitems** - Fridge inventory
- **kitchenequipments** - Kitchen equipment
- **utensils** - Kitchen utensils
- **devices** - Device inventory
- **books** - Book collection
- **udemyaccesses** - Udemy course access
- **gfgcourseprogresses** - GeeksforGeeks course progress
- **codingninjascourses** - Coding Ninjas courses
- **tlelevel3courses** - TLE Level 3 courses
- **topicprogresses** - Topic progress tracking
- **moduleprogresses** - Module progress tracking
- **cppproblems** - C++ problems
- **cppproblemlists** - C++ problem lists
- **companies** - Company information
- **streamingapps** - Streaming app subscriptions
- **socialplatformitems** - Social platform items
- **musicalinstruments** - Musical instruments
- **mobilities** - Mobility/transportation
- **airesources** - AI resources
- **modelusages** - AI model usage tracking
- **usagelimits** - Usage limits
- **users** - User accounts

## Troubleshooting

### "No collections found"

1. **Check MongoDB connection:**
   - Verify your `.env.local` file has the correct MongoDB credentials
   - Make sure the MongoDB URI is correct
   - Restart your Next.js server after updating `.env.local`

2. **Check secret key:**
   - Make sure you're using the same secret key that's in your `.env.local` file
   - The default key is `your-secret-key-change-this` if you haven't set `ADMIN_SECRET_KEY`

3. **Check MongoDB access:**
   - Verify the MongoDB credentials are correct
   - Make sure your IP is whitelisted in MongoDB Atlas (if using Atlas)
   - Check that the database `AryamannLifeVars` exists

### "Unauthorized" error

- Make sure you're entering the correct secret key
- Check that `ADMIN_SECRET_KEY` in `.env.local` matches what you're entering
- Restart the server after changing the secret key

### Connection errors

- Verify MongoDB URI format is correct
- Check network connectivity
- Ensure MongoDB Atlas allows connections from your IP address

## Security Notes

⚠️ **IMPORTANT:**

1. **Never commit `.env.local` to git** - It's already in `.gitignore`
2. **Use a strong secret key** - Don't use the default `your-secret-key-change-this`
3. **Rotate credentials** - If credentials were exposed, rotate them immediately
4. **Production setup** - Use environment variables in your hosting platform (Vercel, etc.)

## Example Usage

Once set up, you can:

1. **View all collections** - Click "Load Collections"
2. **View all data** - Click "Load All Data" or expand individual collections
3. **Create documents** - Click the green "Create" button next to any collection
4. **Edit documents** - Hover over a document and click the blue Edit icon
5. **Delete documents** - Hover over a document and click the red Delete icon

The secret key is saved in your browser's localStorage for convenience, so you don't need to enter it every time.

