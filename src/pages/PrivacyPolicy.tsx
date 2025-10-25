import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="prose lg:prose-xl max-w-4xl mx-auto">
          <h1 className="text-primary">Privacy Policy</h1>
          <p className="lead">
            Your privacy is important to us. It is GR Billing's policy to respect your privacy regarding any information we may collect from you across our website and our mobile application, GR Billing.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>

          <h3>Log Data (Website)</h3>
          <p>
            When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your computer’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.
          </p>

          <h3>Personal Information</h3>
          <p>
            We may ask for personal information, such as your:
          </p>
          <ul>
            <li>Name</li>
            <li>Email</li>
            <li>Phone/mobile number</li>
            <li>Business Information</li>
          </ul>

          <h2>2. GR Billing Mobile App Permissions</h2>
          <p>
            To provide the full functionality of the GR Billing mobile app, we require certain permissions on your device. Here is a breakdown of why we need them:
          </p>
          <ul>
            <li>
              <strong>Internet:</strong> The app requires an internet connection to sync your data across devices, process transactions, back up your information securely, and communicate with our servers.
            </li>
            <li>
              <strong>Camera:</strong> We request camera access to enable you to scan product barcodes and QR codes. This feature significantly speeds up the billing process and inventory management.
            </li>
            <li>
              <strong>Storage (Read External Storage / Read Media Images):</strong> This permission is needed to allow you to upload images for your products directly from your device's gallery.
            </li>
            <li>
              <strong>Bluetooth (BLUETOOTH, BLUETOOTH_ADMIN, BLUETOOTH_CONNECT, BLUETOOTH_SCAN):</strong> These permissions are essential for the wireless printing feature. They allow the app to discover, pair with, and connect to compatible Bluetooth receipt printers.
            </li>
            <li>
              <strong>Location (ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION):</strong> Modern versions of Android require location permission to scan for nearby Bluetooth devices like wireless printers. We want to assure you that we do not track, store, or use your location data for any other purpose. This permission is solely to enable the discovery of Bluetooth printers.
            </li>
          </ul>

          <h2>3. Use of Information</h2>
          <p>
            We may use the information we collect for various purposes, including to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our services</li>
            <li>Improve, personalize, and expand our services</li>
            <li>Understand and analyze how you use our app and website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information, and for marketing and promotional purposes</li>
            <li>Process your transactions and prevent fraud</li>
          </ul>

          <h2>4. Security of Your Information</h2>
          <p>
            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
          </p>

          <h2>5. Links to Other Sites</h2>
          <p>
            Our website and app may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
          </p>

          <h2>6. Your Consent</h2>
          <p>
            By using our website and/or mobile app, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <h2>7. Changes to Our Privacy Policy</h2>
          <p>
            We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:ayushii.jain7459@gmail.com" className="text-primary hover:underline">ayushii.jain7459@gmail.com</a>.
          </p>
          <p><small>This policy is effective as of 1st January 2024.</small></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;