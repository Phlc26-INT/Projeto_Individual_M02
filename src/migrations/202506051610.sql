INSERT INTO employee (department, name, email, emp_username, emp_password, is_coord)
VALUES
  ('Compras', 'Pedro Costa', 'P.costa@email.com', 'Pcosta', 'hashed_password_3', 'FALSE'),
  ('Financeiro', ' Lívia Matos', 'L.matos@email.com', 'Lmatos', 'hashed_password_4', 'FALSE')
ON CONFLICT DO NOTHING;