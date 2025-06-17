CREATE TABLE IF NOT EXISTS coordinator (
  coord_id SERIAL PRIMARY KEY,
  department VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  coord_username VARCHAR(100) NOT NULL,
  coord_password VARCHAR(100) NOT NULL,
  is_coord BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS employee (
  emp_id SERIAL PRIMARY KEY ,
  department VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  emp_username VARCHAR(100) NOT NULL,
  emp_password VARCHAR(100) NOT NULL,
  is_coord BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS tasks (
  task_id SERIAL PRIMARY KEY ,
  emp_id INTEGER,
  coord_id INTEGER,
  task_description VARCHAR(200),
  task_type VARCHAR(200),
  init_date DATE NOT NULL,
  due_date DATE NOT NULL,
  FOREIGN KEY (emp_id) REFERENCES employee (emp_id),
  FOREIGN KEY (coord_id) REFERENCES coordinator (coord_id),
  is_coord BOOLEAN DEFAULT false
);