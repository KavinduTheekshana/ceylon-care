# Document Management Setup Guide

This guide will help you set up the PDF document management feature for the CAH Investment Platform.

## 1. Database Setup

Run the SQL schema in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of documents-schema.sql into your Supabase SQL Editor
```

Or run this file directly:
- Navigate to your Supabase project
- Go to the SQL Editor
- Open `documents-schema.sql` from this repository
- Execute the SQL commands

## 2. Enable Realtime (Important!)

After running the schema:
1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Replication**
3. Find the `documents` table
4. Enable replication for real-time updates

## 3. Features Overview

### Admin Panel Features
- **Add Documents**: Upload PDFs by providing a public URL
- **Manage Documents**: Reorder documents using up/down arrows
- **Delete Documents**: Soft delete (sets `is_active` to false)
- **Real-time Updates**: Changes appear instantly on the frontend

### Frontend Features
- **View Documents**: Users can view PDFs in a new tab
- **Download Documents**: Direct download option
- **Auto-updating**: New documents appear automatically without page refresh
- **Professional UI**: Clean, modern design matching the platform theme

## 4. How to Add Documents

### Step 1: Upload Your PDF
You'll need to host your PDF files on a cloud storage service. Options include:

**Option A: Supabase Storage (Recommended)**
1. Go to your Supabase Dashboard → Storage
2. Create a new bucket called `documents` (make it public)
3. Upload your PDF files
4. Copy the public URL

**Option B: Other Cloud Services**
- Google Drive (make sure link is publicly accessible)
- Dropbox
- AWS S3
- Any other cloud storage with public URLs

### Step 2: Add Document via Admin Panel
1. Navigate to `/admin` on your site
2. Log in with admin credentials
3. Scroll to **Document Management** section
4. Fill in the form:
   - **Document Title**: A descriptive name (e.g., "Investment Prospectus")
   - **Description**: Optional brief description
   - **PDF File URL**: The public URL of your PDF
5. Click **Add Document**

### Step 3: Manage Documents
- **Reorder**: Use ▲/▼ arrows to change display order
- **Delete**: Click Delete button to remove from frontend
- **Edit**: To edit, delete and re-add (or update database directly)

## 5. Using Supabase Storage (Detailed)

### Create Storage Bucket
```sql
-- Run in Supabase SQL Editor
insert into storage.buckets (id, name, public)
values ('documents', 'documents', true);
```

### Set Storage Policies
```sql
-- Allow public read access
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'documents' );

-- Allow authenticated uploads (for admin)
create policy "Authenticated users can upload"
on storage.objects for insert
with check ( bucket_id = 'documents' AND auth.role() = 'authenticated' );
```

### Upload via Dashboard
1. Go to Storage → documents bucket
2. Click **Upload File**
3. Select your PDF
4. After upload, click the file
5. Copy the public URL
6. Use this URL in the admin panel

## 6. Database Schema

The `documents` table includes:
- `id`: Unique identifier
- `title`: Document title
- `description`: Optional description
- `file_url`: Public URL to the PDF
- `file_name`: Original filename
- `file_size`: File size in bytes
- `display_order`: Order of appearance (0 = first)
- `is_active`: Whether document is visible
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## 7. Security Considerations

### For Production:
1. **Update RLS Policies**: Replace the permissive policies in `documents-schema.sql` with proper authentication:

```sql
-- Remove the permissive policy
DROP POLICY "Allow admin operations" ON documents;

-- Add authenticated admin policy
CREATE POLICY "Authenticated admin access"
  ON documents
  FOR ALL
  USING (auth.email() IN ('admin@ceyloncare.co.uk', 'admin@example.com'));
```

2. **Protect Storage**: If using Supabase Storage, ensure only authenticated users can upload:
```sql
create policy "Admin can upload"
on storage.objects for insert
with check (
  bucket_id = 'documents' AND
  auth.email() IN ('admin@ceyloncare.co.uk')
);
```

## 8. Troubleshooting

### Documents not appearing on frontend?
- Check if `is_active` is `true` in the database
- Verify the document was added successfully (check browser console)
- Ensure realtime is enabled for the `documents` table

### PDF not loading when clicked?
- Verify the URL is publicly accessible
- Check CORS settings if using external storage
- Test the URL directly in a new browser tab

### Real-time updates not working?
- Confirm realtime replication is enabled in Supabase
- Check browser console for connection errors
- Verify the Supabase URL and keys are correct

### Upload failing?
- Ensure the URL is valid and starts with `https://`
- Check that the file is actually a PDF
- Verify Supabase is accessible

## 9. Example Usage

### Sample Document Entry
```javascript
{
  title: "Investment Prospectus 2025",
  description: "Complete details about the investment opportunity",
  file_url: "https://your-project.supabase.co/storage/v1/object/public/documents/prospectus.pdf",
  file_name: "prospectus.pdf",
  display_order: 0,
  is_active: true
}
```

## 10. Next Steps

After setup:
1. ✅ Add your first test document
2. ✅ Verify it appears on the homepage
3. ✅ Test the view and download buttons
4. ✅ Try reordering multiple documents
5. ✅ Update RLS policies for production security

## Support

For issues or questions:
- Check the Supabase logs in your dashboard
- Review browser console for errors
- Verify all environment variables are set correctly
