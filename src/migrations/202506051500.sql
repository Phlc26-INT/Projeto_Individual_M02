INSERT INTO coordinator (department, name, email, coord_username, coord_password, is_coord)
VALUES
  ('Compras', 'Rogeria Castro', 'r.castro@email.com', 'Rcastro', 'hashed_password_1', 'TRUE'),
  ('Financeiro', ' Alessandra Lima', 'A.lima@email.com', 'Alima', 'hashed_password_2', 'TRUE')
ON CONFLICT DO NOTHING;