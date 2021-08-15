CREATE DATABASE portal_system;

USE portal_system;

-- drop table expert_info;

CREATE TABLE user_credential (
	id int NOT NULL auto_increment,
	foreign_user_id int NOT NULL,
    account_name varchar(50) NOT NULL,
    account_password varchar(30) NOT NULL,
    permission_role varchar(30) NOT NULL,
    reset_password_token varchar(50),
    primary key (id)
);

SELECT * FROM user_credential;




CREATE TABLE project_info (
	project_id int NOT NULL auto_increment,
    start_date varchar(30),
    close_date varchar(30),
    job_title varchar(300),
    job_type varchar(30),
    organization_info varchar(1000),
    show_employer_name varchar(1),
	featured varchar(1),
    responsibility varchar(3000),
    essential_skills varchar(1000),
    professional_field varchar(300),
    job_description varchar(3000),
    required_expertise varchar(3000),
    employer varchar(300),
    location varchar(300),
    distance varchar(30),
    salary varchar(3000),
    currency varchar(10),
    primary key (project_id)
);

SELECT * FROM project_info;




CREATE TABLE expert_info (
	expert_id int NOT NULL auto_increment,
    title varchar(30),
    first_name varchar(300),
    last_name varchar(300),
    gender varchar(100),
    nationality varchar(300),
    date_of_birth varchar(300),
    email varchar(30), 
    phone_no varchar(30), 
    linkedin varchar(100), 
    skype varchar(100), 
    twitter varchar(100),
    expertise varchar(3000),
    category varchar(300),
    source_references varchar(300),
    edu_organization varchar(300),
    field_of_speciality varchar(1000),
    education varchar(1000),
    employment varchar(1000),
    membership_of_professional_bodies varchar(1000),
    scientific_contribution_and_research_leadership varchar(1000),
    awarded_grants_and_funded_activities varchar(1000),
    awards varchar(1000),
    patents varchar(1000),
    publications varchar(1000),
    collaborative_project_proposal varchar(1000),
    cv_file_path varchar(500),
    primary key (expert_id)
);

SELECT * FROM expert_info;




CREATE TABLE project_matching (
	matching_id int NOT NULL auto_increment,
	project_id int,
    expert_id int,
    application_complete varchar(1),
    supplementary_material_status varchar(300),
    talent_project_demand_status varchar(300),
    project_matching_phase varchar(3000),
    project_specialist varchar(3000),
    project_side_communication_remarks varchar(300),
    expert_side_communication_remarks varchar(300),
--     foreign key (project_id) references project_info(project_id),
--     foreign key (expert_id) references expert_info(expert_id),
	primary key (matching_id)
);

SELECT * FROM project_matching;
																				



ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234567890';
