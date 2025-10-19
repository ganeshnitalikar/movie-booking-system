# Authentication System Documentation

## Overview
This document explains the complete authentication system implemented in the MovieHub application, including login, registration, JWT token handling, and persistence.

## Features

### ✅ Implemented Features
- **Complete Login Page** with form validation and error handling
- **Complete Registration Page** with comprehensive form validation
- **JWT Token Management** with automatic storage and retrieval
- **Authentication State Persistence** using localStorage
- **Role-based Authentication** (User, Owner, Admin)
- **Protected Routes** with automatic redirection
- **Mock API Integration** ready for backend replacement
- **Responsive Design** for all screen sizes
- **Form Validation** with real-time error feedback
- **Loading States** and user feedback
- **Demo Accounts** for testing different roles

## File Structure

```
src/
├── hooks/
│   └── useAuth.js                 # Main authentication hook
├── redux/
│   └── slices/
│       └── authSlice.js          # Redux authentication state
├── pages/
│   └── public/
│       ├── LoginPage.jsx         # Login page component
│       └── RegisterPage.jsx      # Registration page component
├── config/
│   └── api.js                    # API configuration
└── docs/
    └── AUTHENTICATION.md         # This documentation
```

## Authentication Flow

### 1. Login Process
```javascript
// User submits login form
const result = await login({ email, password });

// Mock response (replace with real API)
{
  success: true,
  user: { id, email, name, role },
  token: "jwt-token-here"
}

// State updated and persisted
localStorage.setItem('authToken', token);
localStorage.setItem('authUser', JSON.stringify(user));
```

### 2. Registration Process
```javascript
// User submits registration form
const result = await register({ name, email, password, phone, role });

// Mock response (replace with real API)
{
  success: true,
  user: { id, email, name, role },
  token: "jwt-token-here"
}

// State updated and persisted
localStorage.setItem('authToken', token);
localStorage.setItem('authUser', JSON.stringify(user));
```

### 3. Authentication State
```javascript
// Redux state structure
{
  user: { id, email, name, role },
  token: "jwt-token-string",
  isAuthenticated: true,
  loading: false,
  error: null
}
```

## API Integration

### Current Implementation (Mock)
The system currently uses mock responses for development and testing. All API calls are commented out and ready to be uncommented when the backend is ready.

### Switching to Real API
To switch to real API calls, simply:

1. **Uncomment the API calls** in `src/hooks/useAuth.js`
2. **Comment out the mock responses**
3. **Set the API URL** in environment variables

```javascript
// In useAuth.js - Replace this:
const mockResponse = { /* mock data */ };

// With this:
const response = await apiCall(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
});
```

### API Configuration
```javascript
// src/config/api.js
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
    }
  }
};
```

## Form Validation

### Login Form
- **Email**: Required, valid email format
- **Password**: Required, minimum 6 characters

### Registration Form
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Phone**: Required, valid phone number format
- **Password**: Required, minimum 6 characters, must contain uppercase, lowercase, and number
- **Confirm Password**: Required, must match password
- **Role**: Required, dropdown selection (User/Owner)

## Demo Accounts

The login page includes demo account buttons for testing:

- **Admin Account**: `admin@moviehub.com` / `admin123`
- **Owner Account**: `owner@moviehub.com` / `owner123`
- **User Account**: `user@moviehub.com` / `user123`

## Role-Based Access

### User Roles
- **User**: Regular movie-goer, can book tickets
- **Owner**: Theater owner, can manage theaters and shows
- **Admin**: System administrator, full access

### Role Detection
```javascript
// Automatic role detection based on email
role: credentials.email.includes('admin') ? 'admin' : 
      credentials.email.includes('owner') ? 'owner' : 'user'
```

## Persistence

### localStorage Storage
```javascript
// Stored data
localStorage.setItem('authToken', token);
localStorage.setItem('authUser', JSON.stringify(user));

// Retrieved on app initialization
const token = localStorage.getItem('authToken');
const user = JSON.parse(localStorage.getItem('authUser'));
```

### State Restoration
The app automatically restores authentication state on page refresh:
```javascript
// In App.jsx
const AuthInitializer = () => {
  const { initializeAuthState } = useAuth();
  
  useEffect(() => {
    initializeAuthState(); // Restores state from localStorage
  }, []);
  
  return null;
};
```

## Protected Routes

### Route Protection
```javascript
// ProtectedRoute.jsx
const { user, isAuthenticated } = useAuth();

if (!isAuthenticated) {
  return <Navigate to={ROUTES.LOGIN} />;
}

if (requiredRole && user?.role !== requiredRole) {
  return <Navigate to={appropriateDashboard} />;
}
```

### Navigation Integration
The navbar automatically shows different options based on authentication status and user role.

## Error Handling

### Form Validation Errors
- Real-time validation with immediate feedback
- Field-specific error messages
- Form submission prevention for invalid data

### API Errors
- Network error handling
- Server error display
- Automatic error clearing on new attempts

### Loading States
- Button loading indicators
- Form field disabling during submission
- Loading spinners for better UX

## Security Considerations

### Current Implementation
- JWT tokens stored in localStorage
- Automatic token inclusion in API headers
- Token refresh mechanism (ready for implementation)

### Production Recommendations
- Implement token refresh logic
- Add token expiration handling
- Consider httpOnly cookies for enhanced security
- Add CSRF protection
- Implement rate limiting

## Testing

### Manual Testing
1. **Login Flow**: Use demo accounts to test different roles
2. **Registration Flow**: Create new accounts with different roles
3. **Persistence**: Refresh page to verify state restoration
4. **Protected Routes**: Try accessing protected pages without login
5. **Form Validation**: Test with invalid data

### Demo Data
- Use the "Fill Demo Data" button on registration page
- Use demo account buttons on login page
- Test different roles and their respective dashboards

## Future Enhancements

### Planned Features
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social login integration
- [ ] Remember me functionality
- [ ] Session timeout handling

### Backend Integration
When the backend is ready:
1. Uncomment API calls in `useAuth.js`
2. Update API endpoints in `config/api.js`
3. Set environment variables
4. Test with real backend responses

## Troubleshooting

### Common Issues
1. **State not persisting**: Check localStorage permissions
2. **Form validation errors**: Verify validation rules
3. **API calls failing**: Check network connectivity and CORS
4. **Role-based access issues**: Verify role assignment logic

### Debug Information
- Check Redux DevTools for state changes
- Monitor localStorage in browser DevTools
- Check console for error messages
- Verify API endpoint configurations

## Support

For issues or questions about the authentication system:
1. Check this documentation
2. Review the code comments
3. Test with demo accounts
4. Check browser console for errors
