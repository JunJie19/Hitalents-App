import React, { useState, useRef, useEffect, createRef } from "react";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";
import { countryList } from "../asset/countryList";
import { placeholder } from "../asset/placeholder";
import Category from "../asset/category";
import {
  expertDataLessField,
  expertDataMoreField,
} from "../asset/dataFieldHeader";
import "../styles/signup.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const createFields = () => {
  let fields = expertDataLessField.concat(expertDataMoreField);
  _.pullAll(fields, ["expert_id"]);
  fields.push("password");

  return fields;
};

const AddExpertModal = (props) => {
  let Refs = useRef([]);
  
  const [expertModalState, setExpertModalState] = useState({
    show: props.show,
    education: "",
    employment: "",
    patents: "",
    publications: "",
    field_of_speciality: "",
    awards: "",
    scientific_contribution_and_research_leadership: "",
    collaborative_project_proposal: "",
  });

  const [allFields, setAllFields] = useState([]);

  useEffect(() => {
    setAllFields(createFields());
    Refs.current = createFields().map(
        (ref, index) => (Refs.current[index] = createRef())
      );
  }, [])
  useEffect(() => {
    setExpertModalState((prev) => ({ ...prev, show: props.show }));
  }, [props.show]);

  const handleAdd = (e) => {
    e.preventDefault();

    const { onAdd } = props;
    let obj = {};

    _.forEach(allFields, (item, index) => {
      if (Refs.current[index].current?.props && Refs.current[index].current.props.name) {
        let name = Refs.current[index].current.props.name;
        let value = expertModalState[name];
        obj[item] = value;
      } else if (Refs.current[index].current) {
        obj[item] = Refs.current[index].current.value;
      } else {
        obj[item] = "";
      }
    });

    onAdd(obj);
  }

  const ckeditorChange = (data, name) => {
    setExpertModalState((prev) => ({ ...prev, [name]: data }));
  };

  const closeModal = () => {
    const { close } = props;
    setExpertModalState((prev) => ({...prev, show: false}));
    close(false);
  }

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
        Expert Application Form
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleAdd}>
          <div className="columns-add">
            <label>Title</label>
            <select
              name="title"
              className="form-control"
              required
              ref={Refs.current[0]}
            >
              <option value="">Please Select</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
              <option value="Professor">Professor</option>
            </select>
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder.first_name}
              required
              ref={Refs.current[1]}
            />
          </div>

          <div className="columns-add">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder.last_name}
              required
              ref={Refs.current[2]}
            />
            <label>Nationality </label>
            <select
              name="nationality"
              className="form-control"
              required
              ref={Refs.current[5]}
            >
              <option value="">Please Select</option>
              {_.map(countryList, (item, index) => {
                return (
                  <option key={`country-${index}`} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="columns-add">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder={placeholder.email}
              required
              ref={Refs.current[6]}
            />
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="******"
              required
              ref={Refs.current[16]}
            />
          </div>

          <div className="columns-add">
            <label>Expertise</label>
            <input
              type="text"
              className="form-control"
              placeholder={placeholder.expertise}
              required
              ref={Refs.current[3]}
            />
            <label>Category</label>
            <select
              name="category"
              className="form-control"
              required
              ref={Refs.current[4]}
            >
              <option value="">Please Select</option>
              {_.map(Category, (item, index) => {
                return (
                  <option key={`country-${index}`} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="columns-add">
            <label>Phone number</label>
            <input
              type="tel"
              className="form-control"
              placeholder={placeholder.phone_no}
              ref={Refs.current[7]}
            />
            {/* <label>Upload CV</label>
                          <UploadFile /> */}
          </div>

          <div className="columns-add-merge">
            <h2>Education</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.education,

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
              name="education"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "education");
              }}
              ref={Refs.current[8]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Employment</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.employment,

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
              name="employment"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "employment");
              }}
              ref={Refs.current[9]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Patents</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.patents,

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
              name="patents"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "patents");
              }}
              ref={Refs.current[10]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Publications</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.publications,

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
              name="publications"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "publications");
              }}
              ref={Refs.current[11]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Field of Speciality</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.field_of_speciality,

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
              name="field_of_speciality"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "field_of_speciality");
              }}
              ref={Refs.current[12]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Awards</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.awards,

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
              name="awards"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "awards");
              }}
              ref={Refs.current[13]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Scientific Contribution And Research Leadership</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder:
                  placeholder.scientific_contribution_and_research_leadership,

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
              name="scientific_contribution_and_research_leadership"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(
                  data,
                  "scientific_contribution_and_research_leadership"
                );
              }}
              ref={Refs.current[14]}
            />
          </div>

          <div className="columns-add-merge">
            <h2>Collaborative Project Proposal</h2>
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: placeholder.collaborative_project_proposal,

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
              name="collaborative_project_proposal"
              onChange={(event, editor) => {
                const data = editor.getData();
                ckeditorChange(data, "collaborative_project_proposal");
              }}
              ref={Refs.current[15]}
            />
          </div>
          <Button type="submit" className="apply-btn">
            Add User
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpertModal;
