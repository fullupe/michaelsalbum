-- Create photos table
CREATE TABLE IF NOT EXISTS photos_michael (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  category text,
  featured boolean DEFAULT false
);

-- Create comments_michael table
CREATE TABLE IF NOT EXISTS comments_michael (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  photo_id uuid NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
  name text NOT NULL,
  comment text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE photos_michael ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments_michael ENABLE ROW LEVEL SECURITY;

-- Create policies for photos_michael
CREATE POLICY "Anyone can view phophotos_michaeltos"
  ON photos_michael
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage photos_michael"
  ON photos_michael
  USING (auth.role() = 'authenticated');

-- Create policies for comments_michael
CREATE POLICY "Anyone can view comments_michael"
  ON comments_michael
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create comments_michael"
  ON comments_michael
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage comments_michael"
  ON comments_michael
  USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_comments_photo_id ON comments_michael(photo_id);
CREATE INDEX IF NOT EXISTS idx_photos_featured ON photos_michael(featured) WHERE featured = true;