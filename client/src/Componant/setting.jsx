export default function Setting() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Settings Page</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>Welcome to the settings page! Here you can manage your application preferences.</p>
        {/* Add your settings forms and components here */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Account Settings</h3>
          <p>Manage your profile information, password, and email preferences.</p>
          {/* Example: <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button> */}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
          <p>Configure how you receive notifications from the application.</p>
        </div>
      </div>
    </div>
  )
}
