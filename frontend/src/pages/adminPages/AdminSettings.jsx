
import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { ThemeModeContext } from "../../context/ThemeContext";

const AdminSettings = () => {
  const { mode, toggleMode } = useContext(ThemeModeContext);

  return (
    <div className="p-6 space-y-6">

      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Admin Settings
      </Typography>

      {/* Theme Mode */}
      <Card>
        <CardContent>
          <Typography variant="h6">Theme Settings</Typography>
          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleMode} />}
            label={`Dark Mode: ${mode === "dark" ? "ON" : "OFF"}`}
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      {/* System Controls */}
      <Card>
        <CardContent>
          <Typography variant="h6">System Controls</Typography>

          <div className="grid md:grid-cols-2 gap-4 mt-4">

            <FormControlLabel control={<Switch />} label="Enable Bookings" />
            <FormControlLabel control={<Switch />} label="Enable Refunds" />
            <FormControlLabel control={<Switch />} label="Enable Cancellations" />
            <FormControlLabel control={<Switch />} label="Enable Log Tracking" />
          </div>
        </CardContent>
      </Card>

      {/* Payment System Settings */}
      <Card>
        <CardContent>
          <Typography variant="h6">Payment Settings</Typography>

          <div className="mt-4 space-y-3">
            <FormControlLabel control={<Switch />} label="Enable Online Payments" />
            <FormControlLabel control={<Switch />} label="Enable Refund Automation" />
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode */}
      <Card>
        <CardContent>
          <Typography variant="h6">Maintenance Mode</Typography>

          <FormControlLabel
            control={<Switch />}
            label="Enable Maintenance Mode"
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            When enabled, users cannot book movies.
          </Typography>
        </CardContent>
      </Card>

      {/* Cleanup Tools */}
      <Card>
        <CardContent>
          <Typography variant="h6">Database Cleanup</Typography>

          <div className="flex flex-col gap-3 mt-4">
            <Button variant="contained" color="error">
              Clear System Logs
            </Button>
            <Button variant="contained" color="error">
              Clear Failed Payments
            </Button>
            <Button variant="contained" color="error">
              Delete Old Cancelled Bookings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardContent>
          <Typography variant="h6">Notification Settings</Typography>

          <div className="mt-4 space-y-3">
            <FormControlLabel control={<Switch />} label="Email Notifications" />
            <FormControlLabel control={<Switch />} label="SMS Notifications" />
          </div>
        </CardContent>
      </Card>

      {/* Role & Access */}
      <Card>
        <CardContent>
          <Typography variant="h6">Role & Access Control</Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            These settings help manage user privilege levels according to your SQL schema.
          </Typography>

          <div className="mt-4 space-y-3">
            <Button variant="contained">Manage Roles</Button>
            <Button variant="contained">Manage Theater Owners</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default AdminSettings;
