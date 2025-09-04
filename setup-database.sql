CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  contact BIGINT,
  image TEXT,
  email_id TEXT
);

-- Insert dummy data
INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES
('Springfield Elementary School', '123 Main Street', 'Springfield', 'Illinois', 5551234567, 'school1.jpg', 'info@springfield-elementary.edu'),
('Riverside High School', '456 Oak Avenue', 'Riverside', 'California', 5559876543, 'school2.jpg', 'admin@riverside-high.edu'),
('Mountain View Academy', '789 Pine Road', 'Mountain View', 'Colorado', 5555551234, 'school3.jpg', 'contact@mountainview-academy.edu');