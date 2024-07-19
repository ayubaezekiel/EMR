create table
  insurance_plan (
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    validity date,
    created_at timestamptz default now()
  );

create table
  patients (
    id uuid primary key default uuid_generate_v4() not null,
    first_name text not null,
    middle_name text,
    last_name text not null,
    dob date not null,
    phone text not null,
    gender text not null,
    relationship_status text not null,
    residential_address text not null,
    state_of_origin text not null,
    lga text not null,
    parmanent_home_address text not null,
    next_of_kin text not null,
    next_of_kin_phone text not null,
    next_of_kin_relationship text not null,
    next_of_kin_address text not null,
    insurance_plan_id uuid references insurance_plan not null,
    created_by uuid references auth.users not null,
    created_at timestamptz default now()
  );


 create table specialties(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    created_at timestamptz default now()
  );


 create table clinics(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    created_at timestamptz default now()
  );


  create table appointments_types(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    created_at timestamptz default now()
  );

create table appointments(
  id uuid primary key  default uuid_generate_v4() not null,
  patients_id uuid references patients not null,
  appointments_type_id uuid references appointments_types not null,
  clinics_id uuid references clinics not null,
  specialties_id uuid references specialties not null,
  follow_up boolean default false,
  is_all_day boolean default false,
  starting timestamptz not null,
  ending timestamptz not null,
  created_by uuid references auth.users not null,
  created_at  timestamp default now()
)


  create table branch(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    address text not null,
    created_at timestamptz default now()
  );

 create table service_types(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    created_at timestamptz default now()
  );

 create table document_types(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    created_at timestamptz default now()
  );

 create table cash_points(
    id uuid primary key default uuid_generate_v4() not null,
    branch_id uuid references branch not null,
    service_type_id uuid references service_types not null,
    name text not null,
    clinics_id uuid references clinics not null, 
    created_at timestamptz default now()
  );

 create table departments(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    created_at timestamptz default now()
  );

   create table religions(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    created_at timestamptz default now()
  );


 create table job_positions(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    created_at timestamptz default now()
  );

   create table payment_methods(
    id uuid primary key default uuid_generate_v4() not null,
    name text not null,
    allow_only_financial_admin boolean default false,
    created_at timestamptz default now()
  );