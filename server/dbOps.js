const nodemailer = require("nodemailer");
const { createTransportConfig } = require("./mailerConfig");
const fakeData = require("./fakeData");
const jwtUtil = require("./jwtUtil");
const { welcomeSignupHTML } = require("./asset/emailTemplate");

const expertData = fakeData.expertData;
const projectData = fakeData.projectData;
const employerData = fakeData.employerData;
const projectMatchingData = fakeData.projectMatchingData;

const transporter = nodemailer.createTransport(createTransportConfig);

function login(req, res) {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  if (email && password) {
    const sql = `SELECT foreign_user_id, permission_role 
                    FROM user_credential 
                    WHERE account_name=? AND account_password=?`;

    res.app
      .get("connection")
      .query(sql, [email, password], function (err, rows) {
        if (err) {
          res.status(400).json({
            success: false,
            msg: err.sqlMessage,
          });
        } else {
          if (rows[0]) {
            if (rows[0].permission_role == "admin") {
              req.session.token = jwtUtil.generateTokenByRole("admin");
              res.status(200).json({
                success: true,
                data: {
                  role: "__admin__",
                  user_id: rows[0].foreign_user_id,
                },
              });
            } else {
              req.session.token = jwtUtil.generateTokenByRole(
                rows[0].permission_role
              );
              res.status(200).json({
                success: true,
                data: {
                  role: rows[0].permission_role,
                  user_id: rows[0].foreign_user_id,
                },
              });
            }
          } else {
            res.status(400).json({
              success: false,
              msg: "failed authorization",
            });
          }
        }
      });
  }
}

function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "failed clear session",
      });
    } else {
      res.status(200).json({
        success: true,
        data: {
          session: "session destroyed",
        },
      });
    }
  });
}

function signup(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;
  const phone = req.body.phone;
  const role = req.body.role;

  const sql = `SELECT *
                FROM user_credential 
                WHERE account_name=?`;

  res.app.get("connection").query(sql, [email], function (err, rows) {
    if (err) {
      res.status(400).json({
        success: false,
        msg: "failed selecting from user_credential",
      });
    } else {
      if (rows.length > 0) {
        res.status(400).json({
          success: false,
          msg: "sorry, this email already exists",
        });
      } else {
        const sql = `INSERT INTO expert_info (first_name, last_name, email, phone_no) 
                VALUES (?, ?, ?, ?)`;

        res.app
          .get("connection")
          .query(
            sql,
            [firstname, lastname, email, phone],
            function (err, rows) {
              if (err) {
                res.status(400).json({
                  success: false,
                  msg: "failed inserting into expert_info",
                });
              } else {
                const sql = `SELECT expert_id FROM expert_info 
                        WHERE first_name=? AND last_name=? AND email=? AND phone_no=?`;
                res.app
                  .get("connection")
                  .query(
                    sql,
                    [firstname, lastname, email, phone],
                    function (err, rows) {
                      if (err) {
                        res.status(400).json({
                          success: false,
                          msg: "failed getting user_id",
                        });
                      } else {
                        const expertid = rows[0].expert_id;
                        const sql = `INSERT INTO user_credential (foreign_user_id, account_name, account_password, permission_role) 
                                    VALUES (?, ?, ?, ?)`;
                        res.app
                          .get("connection")
                          .query(
                            sql,
                            [expertid, email, password, role],
                            function (err, rows) {
                              if (err) {
                                res.status(400).json({
                                  success: false,
                                  msg: "failed inserting into user_credential",
                                });
                              } else {
                                req.session.token =
                                  jwtUtil.generateTokenByRole(role);

                                const mailOptions = {
                                  from: "contact@hyde-china.com",
                                  to: `${email}`,
                                  subject: "Welcome to HI TALENTS!",
                                  html: welcomeSignupHTML(firstname),
                                };
                                transporter.sendMail(
                                  mailOptions,
                                  (err, response) => {}
                                );

                                res.status(200).json({
                                  success: true,
                                  data: {
                                    role: role,
                                    user_id: expertid,
                                    msg: "Successfully registered.",
                                  },
                                });
                              }
                            }
                          );
                      }
                    }
                  );
              }
            }
          );
      }
    }
  });
}

function expertDashboard_TotalApplicant(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `select count(expert_id) as total_applicant from expert_info; `;

        res.app.get("connection").query(sql, function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function expertDashboard_Gender(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `select gender, count(gender) as number_applicant from expert_info group by gender;`;

        res.app.get("connection").query(sql, function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function expertDashboard_Category(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `select category,count(category) as number_applicant from portal_system.expert_info group by category;`;

        res.app.get("connection").query(sql, function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function expertDashboard_Expertise(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `SELECT expertise, count(expertise) AS number_applicant FROM expert_info GROUP BY expertise ;`;

        res.app.get("connection").query(sql, function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function expertDashboard_Nationality(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `select nationality, count(nationality) as number_applicant from portal_system.expert_info group by nationality;`;

        res.app.get("connection").query(sql, function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function expertDashboard_SourceRef(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `select source_references, count(source_references) as number_references from portal_system.expert_info group by source_references;`;

        res.app.get("connection").query(sql, function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function fetchExpertAll(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `SELECT * FROM expert_info ORDER BY expert_id desc`;

        res.app.get("connection").query(sql, function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function addExpert(req, res) {
  const token = req.session.token;
  const record = req.body.record;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `INSERT INTO expert_info
                            (title, first_name, last_name, gender, nationality, date_of_birth, email, 
                            phone_no, linkedin, skype, twitter, expertise, category, source_references,
                            edu_organization, field_of_speciality, education, employment, membership_of_professional_bodies,
                            scientific_contribution_and_research_leadership, awarded_grants_and_funded_activities,
                            awards, patents, publications, collaborative_project_proposal)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        res.app
          .get("connection")
          .query(
            sql,
            [
              record.title,
              record.first_name,
              record.last_name,
              record.gender,
              record.nationality,
              record.date_of_birth,
              record.email.trim().toLowerCase(),
              record.phone_no,
              record.linkedin,
              record.skype,
              record.twitter,
              record.expertise,
              record.category,
              record.source_references,
              record.edu_organization,
              record.field_of_speciality,
              record.education,
              record.employment,
              record.membership_of_professional_bodies,
              record.scientific_contribution_and_research_leadership,
              record.awarded_grants_and_funded_activities,
              record.awards,
              record.patents,
              record.publications,
              record.collaborative_project_proposal,
            ],
            function (err, feedback) {
              if (err) {
                res.status(400).json({
                  success: false,
                  msg: err.sqlMessage,
                });
              } else {
                const sql = `SELECT expert_id FROM expert_info 
                                        WHERE first_name=? AND last_name=? AND email=?`;
                res.app
                  .get("connection")
                  .query(
                    sql,
                    [
                      record.first_name,
                      record.last_name,
                      record.email.trim().toLowerCase(),
                    ],
                    function (err, rows) {
                      if (err) {
                        res.status(400).json({
                          success: false,
                          msg: "failed getting user_id",
                        });
                      } else {
                        const expertid = rows[0].expert_id;
                        const sql = `INSERT INTO user_credential (foreign_user_id, account_name, account_password, permission_role) 
                                                    VALUES (?, ?, ?, ?)`;
                        res.app
                          .get("connection")
                          .query(
                            sql,
                            [
                              expertid,
                              record.email.trim().toLowerCase(),
                              record.password,
                              "expert",
                            ],
                            function (err, rows) {
                              if (err) {
                                res.status(400).json({
                                  success: false,
                                  msg: "failed inserting into user_credential",
                                });
                              } else {
                                res.status(200).json({
                                  success: true,
                                  data: feedback,
                                });
                              }
                            }
                          );
                      }
                    }
                  );
              }
            }
          );
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function editExpert(req, res) {
  const token = req.session.token;
  const record = req.body.record;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role) {
        const sql = `UPDATE expert_info
                            SET title=?,
                            first_name=?,
                            last_name=?,
                            gender=?,
                            nationality=?,
                            date_of_birth=?,
                            email=?,
                            phone_no=?,
                            linkedin=?,
                            skype=?,
                            twitter=?,
                            expertise=?,
                            category=?,
                            source_references=?,
                            edu_organization=?,
                            field_of_speciality=?,
                            education=?,
                            employment=?,
                            membership_of_professional_bodies=?,
                            scientific_contribution_and_research_leadership=?,
                            awarded_grants_and_funded_activities=?,
                            awards=?,
                            patents=?,
                            publications=?,
                            collaborative_project_proposal=?
                            WHERE expert_id=?`;

        res.app
          .get("connection")
          .query(
            sql,
            [
              record.title,
              record.first_name,
              record.last_name,
              record.gender,
              record.nationality,
              record.date_of_birth,
              record.email.trim().toLowerCase(),
              record.phone_no,
              record.linkedin,
              record.skype,
              record.twitter,
              record.expertise,
              record.category,
              record.source_references,
              record.edu_organization,
              record.field_of_speciality,
              record.education,
              record.employment,
              record.membership_of_professional_bodies,
              record.scientific_contribution_and_research_leadership,
              record.awarded_grants_and_funded_activities,
              record.awards,
              record.patents,
              record.publications,
              record.collaborative_project_proposal,
              record.expert_id,
            ],
            function (err, feedback) {
              if (err) {
                res.status(400).json({
                  success: false,
                  msg: err.sqlMessage,
                });
              } else {
                res.status(200).json({
                  success: true,
                  data: feedback,
                });
              }
            }
          );
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function deleteExpert(req, res) {
  const token = req.session.token;
  const expertId = req.params.expertid;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `DELETE FROM user_credential WHERE foreign_user_id=? AND permission_role='expert'`;

        res.app
          .get("connection")
          .query(sql, [expertId], function (err, feedback) {
            if (err) {
              res.status(400).json({
                success: false,
                msg: "failed deleting from user_credential",
              });
            } else {
              const sql = `DELETE FROM expert_info WHERE expert_id=?`;

              res.app
                .get("connection")
                .query(sql, [expertId], function (err, feedback) {
                  if (err) {
                    res.status(400).json({
                      success: false,
                      msg: "failed deleting from expert_info",
                    });
                  } else {
                    const sql = `DELETE FROM project_matching WHERE expert_id=?`;

                    res.app
                      .get("connection")
                      .query(sql, [expertId], function (err, feedback) {
                        if (err) {
                          res.status(400).json({
                            success: false,
                            msg: "failed deleting from project_matching",
                          });
                        } else {
                          res.status(200).json({
                            success: true,
                            data: feedback,
                          });
                        }
                      });
                  }
                });
            }
          });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function fetchExpert(req, res) {
  const token = req.session.token;
  const expertId = req.params.expertid;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role) {
        const sql = `SELECT * FROM expert_info WHERE expert_id=?`;

        res.app.get("connection").query(sql, [expertId], function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows[0],
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function expertApply(req, res) {
  const token = req.session.token;
  const expertid = req.body.expertid;
  const projectid = req.body.projectid;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role) {
        const sql = `SELECT * FROM project_matching 
                            WHERE project_id=? AND expert_id=?`;

        res.app
          .get("connection")
          .query(sql, [projectid, expertid], function (err, rows) {
            if (err) {
              res.status(400).json({
                success: false,
                msg: err.sqlMessage,
              });
            } else {
              if (rows.length > 0) {
                res.status(400).json({
                  success: false,
                  msg: "you already applied",
                });
              } else {
                const sql = `SELECT * FROM expert_info WHERE expert_id=?`;

                res.app
                  .get("connection")
                  .query(sql, [expertid], function (err, rows) {
                    if (err) {
                      res.status(400).json({
                        success: false,
                        msg: err.sqlMessage,
                      });
                    } else {
                      if (rows.length > 0) {
                        const education = rows[0].education;
                        const employment = rows[0].employment;
                        const field_of_speciality = rows[0].field_of_speciality;

                        if (education && employment && field_of_speciality) {
                          const sql = `INSERT INTO project_matching (project_id, expert_id, application_complete) 
                                            VALUES (?, ?, ?)`;

                          res.app
                            .get("connection")
                            .query(
                              sql,
                              [projectid, expertid, "Y"],
                              function (err, feedback) {
                                if (err) {
                                  res.status(400).json({
                                    success: false,
                                    msg: err.sqlMessage,
                                  });
                                } else {
                                  res.status(200).json({
                                    success: true,
                                    data: "successfully applied",
                                  });
                                }
                              }
                            );
                        } else {
                          const sql = `INSERT INTO project_matching (project_id, expert_id, application_complete) 
                                            VALUES (?, ?, ?)`;

                          res.app
                            .get("connection")
                            .query(
                              sql,
                              [projectid, expertid, "N"],
                              function (err, feedback) {
                                if (err) {
                                  res.status(400).json({
                                    success: false,
                                    msg: err.sqlMessage,
                                  });
                                } else {
                                  res.status(200).json({
                                    success: true,
                                    data: "successfully applied, but you need fill your info to complete the application",
                                  });
                                }
                              }
                            );
                        }
                      }
                    }
                  });
              }
            }
          });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function fetchExpertProject(req, res) {
  const token = req.session.token;
  const expertId = req.params.expertid;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role) {
        const sql = `SELECT *  FROM project_matching 
                            JOIN project_info
                            ON project_info.project_id = project_matching.project_id
                            WHERE project_matching.expert_id=?
                            ORDER BY project_matching.matching_id desc`;

        res.app.get("connection").query(sql, [expertId], function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function fetchEmployer(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        res.status(200).json({
          success: true,
          data: employerData,
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function fetchProjectAll(req, res) {
  const sql = "SELECT * FROM project_info ORDER BY project_id desc";

  res.app.get("connection").query(sql, function (err, rows) {
    if (err) {
      res.status(400).json({
        success: false,
        msg: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        data: rows,
      });
    }
  });
}

function fetchProject(req, res) {
  const projectId = req.params.projectid;

  const sql = "SELECT * FROM project_info WHERE project_id=?";

  res.app.get("connection").query(sql, [projectId], function (err, rows) {
    if (err) {
      res.status(400).json({
        success: false,
        msg: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        data: rows[0],
      });
    }
  });
}

function addProject(req, res) {
  const token = req.session.token;
  const record = req.body.record;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `INSERT INTO project_info 
                            (start_date, close_date, job_title, job_type, organization_info, responsibility,
                            essential_skills, professional_field, job_description,
                            required_expertise, employer, show_employer_name, location, distance, salary, currency, category)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        res.app
          .get("connection")
          .query(
            sql,
            [
              record.start_date,
              record.close_date,
              record.job_title,
              record.job_type,
              record.organization_info,
              record.responsibility,
              record.essential_skills,
              record.professional_field,
              record.job_description,
              record.required_expertise,
              record.employer,
              record.show_employer_name,
              record.location,
              record.distance,
              record.salary,
              record.currency,
              record.category,
            ],
            function (err, rows) {
              if (err) {
                res.status(400).json({
                  success: false,
                  msg: err.sqlMessage,
                });
              } else {
                res.status(200).json({
                  success: true,
                  data: rows,
                });
              }
            }
          );
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function editProject(req, res) {
  const token = req.session.token;
  const record = req.body.record;
  console.log("server record", record);
  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `UPDATE project_info 
                            SET start_date=?,
                            close_date=?,
                            job_title=?,
                            job_type=?,
                            organization_info=?,
                            responsibility=?,
                            essential_skills=?,
                            professional_field=?,
                            job_description=?,
                            required_expertise=?,
                            employer=?,
                            show_employer_name=?,
                            location=?,
                            distance=?,
                            salary=?,
                            currency=?,
                            category=?
                            WHERE project_id=?`;

        res.app
          .get("connection")
          .query(
            sql,
            [
              record.start_date,
              record.close_date,
              record.job_title,
              record.job_type,
              record.organization_info,
              record.responsibility,
              record.essential_skills,
              record.professional_field,
              record.job_description,
              record.required_expertise,
              record.employer,
              record.show_employer_name,
              record.location,
              record.distance,
              record.salary,
              record.currency,
              record.category,
              record.project_id,
            ],
            function (err, feedback) {
              if (err) {
                res.status(400).json({
                  success: false,
                  msg: err.sqlMessage,
                });
              } else {
                res.status(200).json({
                  success: true,
                  data: feedback,
                });
              }
            }
          );
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function completeExpertApplication(req, res) {
  const token = req.session.token;
  const expertId = req.params.expertid;
  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role) {
        const sql = `SELECT * FROM project_matching WHERE expert_id=?`;

        res.app.get("connection").query(sql, [expertId], function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            if (rows.length > 0) {
              const matching_id_list = rows
                .map((item) => item.matching_id)
                .join(",");
              const sql = `UPDATE project_matching 
                                        SET application_complete=?
                                        WHERE matching_id IN (${matching_id_list})`;

              res.app
                .get("connection")
                .query(sql, ["Y"], function (err, feedback) {
                  if (err) {
                    res.status(400).json({
                      success: false,
                      msg: err.sqlMessage,
                    });
                  } else {
                    res.status(200).json({
                      success: true,
                      data: feedback,
                    });
                  }
                });
            } else {
              res.status(200).json({
                success: true,
              });
            }
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function deleteProject(req, res) {
  const token = req.session.token;
  const projectId = req.params.projectid;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role === "admin") {
        const sql = `DELETE FROM project_info WHERE project_id=?`;

        res.app
          .get("connection")
          .query(sql, [projectId], function (err, feedback) {
            if (err) {
              res.status(400).json({
                success: false,
                msg: err.sqlMessage,
              });
            } else {
              res.status(200).json({
                success: true,
                data: feedback,
              });
            }
          });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function fetchProjectExpert(req, res) {
  const token = req.session.token;
  const projectId = req.params.projectid;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role == "admin") {
        const sql = `SELECT * FROM project_matching
                            JOIN expert_info
                            ON expert_info.expert_id = project_matching.expert_id
                            WHERE project_matching.project_id=? AND project_matching.application_complete='Y'`;

        res.app.get("connection").query(sql, [projectId], function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function fetchProjectMatching(req, res) {
  const token = req.session.token;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role == "admin") {
        const sql = `SELECT * FROM (
                                SELECT *, ROW_NUMBER() OVER (PARTITION BY project_matching.project_id ORDER BY project_matching.matching_id DESC) AS rn
                                FROM project_matching 
                            ) AS temp
                            JOIN project_info
                            ON project_info.project_id = temp.project_id 
                            WHERE rn=1 AND temp.application_complete='Y'
                            ORDER BY temp.matching_id DESC`;

        res.app.get("connection").query(sql, function (err, rows) {
          if (err) {
            res.status(400).json({
              success: false,
              msg: err.sqlMessage,
            });
          } else {
            res.status(200).json({
              success: true,
              data: rows,
            });
          }
        });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}

function deleteProjectMatching(req, res) {
  const token = req.session.token;
  const expertid = req.body.expertid;
  const projectid = req.body.projectid;

  jwtUtil
    .verifyRoleFromToken(token)
    .then((role) => {
      if (role) {
        const sql = `DELETE FROM project_matching 
                            WHERE expert_id=? AND project_id=?`;

        res.app
          .get("connection")
          .query(sql, [expertid, projectid], function (err, rows) {
            if (err) {
              res.status(400).json({
                success: false,
                msg: err.sqlMessage,
              });
            } else {
              res.status(200).json({
                success: true,
                data: "successfully deleted application",
              });
            }
          });
      } else {
        res.status(400).json({
          success: false,
          msg: "role permission denied",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err,
      });
    });
}
function sortByCategory(req, res) {
  const category = req.body.category;

  const mySelect = `SELECT * FROM project_info WHERE category = '${category}'`;

  res.app.get("connection").query(mySelect, function (err, rows) {
    if (err) {
      res.status(400).json({
        success: false,
        msg: err.sqlMessage,
      });
    } else {
      res.status(200).json({
        success: true,
        data: rows,
      });
    }
  });
}

module.exports = {
  expertDashboard_TotalApplicant,
  expertDashboard_Gender,
  expertDashboard_Category,
  expertDashboard_Expertise,
  expertDashboard_Nationality,
  expertDashboard_SourceRef,
  login,
  logout,
  signup,
  fetchExpertAll,
  addExpert,
  editExpert,
  completeExpertApplication,
  deleteExpert,
  fetchExpert,
  expertApply,
  fetchProjectAll,
  fetchProject,
  addProject,
  editProject,
  deleteProject,
  fetchProjectExpert,
  fetchExpertProject,
  fetchEmployer,
  fetchProjectMatching,
  deleteProjectMatching,
  sortByCategory,
};
