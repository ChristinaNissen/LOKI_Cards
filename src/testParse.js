// Temporary diagnostic file to test Parse connection
// You can run this in your browser console or import it temporarily

import Parse from "parse";

// Test Parse connection
export async function testParseConnection() {
  console.log("Testing Parse connection...");
  console.log("Server URL:", Parse.serverURL);
  console.log("Application ID:", Parse.applicationId);
  
  try {
    // Try a simple query to test connection
    const TestObject = Parse.Object.extend("TestObject");
    const query = new Parse.Query(TestObject);
    query.limit(1);
    await query.find();
    console.log("✅ Parse connection successful!");
    return true;
  } catch (error) {
    console.error("❌ Parse connection failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return false;
  }
}

// Test user signup with a test account
export async function testUserSignup() {
  console.log("Testing user signup...");
  const testUsername = "test_" + Date.now();
  const testPassword = "testPassword123";
  
  try {
    const user = new Parse.User();
    user.set("username", testUsername);
    user.set("password", testPassword);
    await user.signUp();
    console.log("✅ User signup successful!");
    
    // Clean up - delete the test user
    await user.destroy({ useMasterKey: false });
    console.log("✅ Test user cleaned up");
    return true;
  } catch (error) {
    console.error("❌ User signup failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return false;
  }
}

// Run all tests
export async function runAllTests() {
  console.log("=== Running Parse Diagnostics ===");
  await testParseConnection();
  await testUserSignup();
  console.log("=== Tests Complete ===");
}
