import React, { useState, useEffect, useRef, createRef } from "react";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";
import { currencyList } from "../asset/currencyList";
import { jobTypeList } from "../asset/jobTypeList";
import { distanceList } from "../asset/distanceList";
import { placeholder } from "../asset/placeholder";
import Category from "../asset/category";
import {
  projectDataLessField,
  projectDataMoreField,
} from "../asset/dataFieldHeader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const createFields = () => {
  let fields = projectDataLessField.concat(projectDataMoreField);
  _.pullAll(fields, ["project_id"]);

  return fields;
};
const AddProjectModal = (props) => {
  let Refs = useRef([]);
  const [expertModalState, setExpertModalState] = useState({
    show: props.show,
    organization_info: "",
    professional_field: "",
    job_description: "",
    required_expertise: "",
    responsibility: "",
    essential_skills: "",
  });

  const [allFields, setAllFields] = useState([]);

  useEffect(() => {
    setAllFields(createFields());
    Refs.current = createFields().map(
      (ref, index) => (Refs.current[index] = createRef())
    );
  }, []);
  useEffect(() => {
    setExpertModalState((prev) => ({ ...prev, show: props.show }));
  }, [props.show]);

  const handleAdd = (e) => {
    e.preventDefault();

    const { onAdd } = props;
    let obj = {};

    _.forEach(allFields, (item, index) => {
      if (
        Refs.current[index].current?.props &&
        Refs.current[index].current.props.name
      ) {
        let name = Refs.current[index].current.props.name;
        let value = expertModalState[name];
        obj[item] = value;
      } else if (Refs.current[index].current) {
        obj[item] = Refs.current[index].current.value;
      } else {
        obj[item] = "";
      }
    });
    console.log('obj', obj);

    onAdd(obj);
  };

  const ckeditorChange = (data, name) => {
    setExpertModalState((prev) => ({ ...prev, [name]: data }));
  };

  const closeModal = () => {
    const { close } = props;
    setExpertModalState((prev) => ({ ...prev, show: false }));
    close(false);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={expertModalState.show}
      onHide={closeModal}
    >
      <Modal.Header
        closeButton
        onHide={closeModal}
        id="contained-modal-title-vcenter"
      >
        Job Posting
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleAdd}>
          <div className="columns-add">
            <label>Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder.job_title}
              required
              ref={Refs.current[0]}
            />

            <label>Job Type</label>
            <select
              name="job_type"
              className="form-control"
              defaultValue="full time"
              required
              ref={Refs.current[1]}
            >
              {_.map(jobTypeList, (item, index) => {
                return (
                  <option key={`job_type-${index}`} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="columns-add">
            <label>Employer</label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder.employer}
              required
              ref={Refs.current[2]}
            />

            <label>Show Employer Name</label>
            <select
              name="show_employer_name"
              className="form-control"
              defaultValue="Y"
              required
              ref={Refs.current[7]}
            >
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>

          <div className="columns-add">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control"
              required
              ref={Refs.current[8]}
            />
            <label>Close Date</label>
            <input
              type="date"
              className="form-control"
              required
              ref={Refs.current[9]}
            />
          </div>
          <div className="columns-add">
            <label>Category</label>
            <select
              className="form-control"
              defaultValue="remote"
              required
              ref={Refs.current[16]}
            >
              {_.map(Category, (item, index) => {
                return (
                  <option key={`distance-${index}`} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="columns-add">
            <label>Location</label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder.location}
              required
              ref={Refs.current[3]}
            />
            <label>Distance</label>
            <select
              className="form-control"
              defaultValue="remote"
              required
              ref={Refs.current[5]}
            >
              {_.map(distanceList, (item, index) => {
                return (
                  <option key={`distance-${index}`} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="columns-add">
            <label>Salary</label>
            <select
              name="currencylist"
              className="form-control"
              defaultValue="GBP"
              required
              ref={Refs.current[6]}
            >
              {_.map(currencyList, (item, index) => {
                return (
                  <option key={`currency-${index}`} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="35,000 - 45,000"
              required
              ref={Refs.current[4]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Organization Infomation</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.organization_info,

                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "numberedList",
                  "bulletedList",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              data=""
              name="organization_info"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "organization_info");
              }}
              ref={Refs.current[10]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Professional Field</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.professional_field,

                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "numberedList",
                  "bulletedList",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              data=""
              name="professional_field"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "professional_field");
              }}
              ref={Refs.current[11]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Job Description</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.job_description,

                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "numberedList",
                  "bulletedList",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              data=""
              name="job_description"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "job_description");
              }}
              ref={Refs.current[12]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Required Expertise</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.required_expertise,

                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "numberedList",
                  "bulletedList",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              data=""
              name="required_expertise"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "required_expertise");
              }}
              ref={Refs.current[13]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Responsibilities</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.responsibility,

                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "numberedList",
                  "bulletedList",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              data=""
              name="responsibility"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "responsibility");
              }}
              ref={Refs.current[14]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Essential skills</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.essential_skills,

                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "numberedList",
                  "bulletedList",
                  "|",
                  "undo",
                  "redo",
                ],
              }}
              data=""
              name="essential_skills"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "essential_skills");
              }}
              ref={Refs.current[15]}
            />
          </div>
          <Button className="apply-btn" type="submit">
            Add Job
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProjectModal;
