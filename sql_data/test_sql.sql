SELECT * FROM (
	SELECT *, ROW_NUMBER() OVER (PARTITION BY project_matching.project_id ORDER BY project_matching.matching_id DESC) AS rn
    FROM project_matching 
) AS temp
JOIN project_info
ON project_info.project_id = temp.project_id 
WHERE rn=1 AND temp.application_complete='Y'
ORDER BY temp.matching_id DESC;


SELECT * FROM project_matching
JOIN expert_info
ON expert_info.expert_id = project_matching.expert_id
WHERE project_matching.project_id=39;


SELECT * FROM project_matching;



UPDATE expert_info  SET education='' WHERE expert_id=173;


-- 12, 17, 10, 11, 26, 16, 56, 23, 14, 15, 116, 114
SELECT * FROM expert_info;
SELECT * FROM expert_info WHERE expert_id IN (20);



SELECT * FROM project_info;
SELECT * FROM project_info WHERE project_id IN (41, 40, 42, 39);


INSERT INTO expert_info (first_name, last_name, email, phone_no) VALUES ('TEST', 'TEST', 'hh@gmail.com', '123' );
SELECT expert_id FROM expert_info WHERE first_name='TEST' AND last_name='TEST' AND email='hh@gmail.com' AND phone_no='123';

INSERT INTO project_matching (project_id, expert_id) VALUES ('100', '200' );

UPDATE project_info SET start_date='2020-07-13' WHERE project_id=40;

UPDATE project_matching SET application_complete='N'  WHERE matching_id IN (82);

UPDATE user_credential SET account_password='123456' WHERE id=30;

DELETE FROM user_credential  WHERE id IN (37);
DELETE FROM expert_info  WHERE expert_id IN (182);
DELETE FROM project_matching WHERE matching_id IN (83);

SELECT expert_info.first_name, user_credential.id FROM user_credential
JOIN  expert_info
ON user_credential.foreign_user_id = expert_info.expert_id
WHERE user_credential.account_name='expert_20@gmail.com';

-- dashboard query 
select count(expert_id) as total_applicant from portal_system.expert_info; 
SELECT expertise, count(expertise) AS number_applicant FROM expert_info GROUP BY expertise ;
select gender, count(gender) as number_applicant from expert_info group by gender;
select category,count(category) as number_applicant from portal_system.expert_info group by category;
select nationality, count(nationality) as number_applicant from portal_system.expert_info group by nationality;
select source_references, count(source_references) as number_references from portal_system.expert_info group by source_references;