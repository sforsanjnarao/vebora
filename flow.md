//src/actions/auth

➡️ currentUser() from Clerk
   ├── ❌ Not logged in → return 403
   └── ✅ Logged in
         ├── Check DB: user with clerkId exists?
         │    ├── ✅ Yes → return user + 200
         │    └── ❌ No → create user in DB
         │          ├── ✅ Created → return user + 201
         │          └── ❌ Failed → return 500 error
         └── 🔁 Catch errors → return 500