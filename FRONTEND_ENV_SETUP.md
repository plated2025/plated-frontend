# Frontend Environment Setup

## Create `.env` file

In the `foodie-social` directory, create a file named `.env` (not `.env.example`) and add:

```env
VITE_API_URL=http://localhost:5000/api
```

This tells the frontend where to find the backend API.

## That's it!

The frontend is now configured to communicate with your backend server.

Restart the frontend dev server if it's running:
```bash
# Stop the server (Ctrl+C)
# Then start it again
npm run dev
```
