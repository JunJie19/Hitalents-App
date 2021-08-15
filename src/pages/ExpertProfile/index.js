import React, { useState, useEffect } from "react";
import _ from "lodash";
import ExpertRightSidebar from "../../components/expertRightSidebar";
import { fetchReq } from "../../utils/utils";
import { placeholder } from "../../asset/placeholder";
import ReactGA from "react-ga";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const lessField = [
  "expert_id",
  "title",
  "first_name",
  "nationality",
  "expertise",
  "email",
  "phone_no",
  "linkedin",
  "skype",
  "twitter",
];

const moreHeader = [
  "Education",
  "Employment",
  "Field of Speciality",
  "Patents",
  "Publications",
  "Awards",
  "Scientific Contribution And Research Leadership",
  "Collaborative Project Proposal",
];

const moreField = [
  "education",
  "employment",
  "field_of_speciality",
  "patents",
  "publications",
  "awards",
  "scientific_contribution_and_research_leadership",
  "collaborative_project_proposal",
];

const requiredFields = ["education", "employment", "field_of_speciality"];

const fieldTitle = _.zipObject(moreField, moreHeader);

const ExpertProfile = (props) => {
  const [data, setData] = useState({});
  const [applicationComplete, setApplicationComplete] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [editbutton, setEditbutton] = useState("Edit");
  const [savebutton, setSavebutton] = useState("Save");

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    const url = `/api/fetchExpert/${props.id}`;
    fetchReq(url)
      .then((data) => {
          setData(data)

        const _url = `/api/fetchExpertProject/${props.id}`;
        fetchReq(_url)
          .then((data) => {
            if (data[0]) {
              const applicationComplete = data[0].application_complete;
              setApplicationComplete(applicationComplete);
              const { completeAppMsger } = props;
              completeAppMsger(applicationComplete);
            } else {
              const applicationComplete = "N";
              setApplicationComplete(applicationComplete);
              const { completeAppMsger } = props;
              completeAppMsger(applicationComplete);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => alert(err));
  }, []);

  const handleTextChange = (e, key, dataCk) => {

    let tmp_data;
    if(dataCk || dataCk === '') {
         tmp_data = Object.assign(data, {
            [key]: dataCk,
        });

    } else {
        tmp_data = Object.assign(data, {
            [key] : e.target.value
        })
    }
    setData(tmp_data);
  }

  const editHandler = (showInput) => {
      setShowInput(showInput);
  };

  const confirmHandler = (sidebarData) => {
    const { completeAppMsger } = props;

    const tmp_data = Object.assign(data, {
      ...sidebarData,
    });

    let condition = true;
    _.forEach(requiredFields, (key) => {
      condition = condition && tmp_data[key];
    });

    if (condition) {
      fetchReq("/api/editExpert", {
        body: JSON.stringify({
          record: tmp_data,
        }),
      })
        .then((feedback) => {
          const url = `/api/completeExpertApplication/${props.id}`;
          fetchReq(url)
            .then((feedback) => {
                setData(tmp_data);
                setShowInput(false);
                setApplicationComplete("Y");
                completeAppMsger("Y")
            })
            .catch((err) => alert(err));
        })
        .catch((err) => alert(err));
    } else {
      alert("please fill in required fields");
    }
  };

  return (
    <div>
      <div className="profile">
        {showInput
          ? _.map(_.pick(data, moreField), (value, key) => {
              return (
                <div key={`expertinfo-${key}`}>
                  <h3 className="label-tag">
                    {fieldTitle[key]} &nbsp;
                    {requiredFields.indexOf(key) !== -1 ? (
                      !value && applicationComplete === "N" ? (
                        <span className="warning-text">
                          * please fill this field to complete application
                        </span>
                      ) : (
                        <span className="warning-text">*</span>
                      )
                    ) : null}
                  </h3>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      placeholder: placeholder[key],

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
                    data={value}
                    required={requiredFields.indexOf(key) !== -1 ? true : false}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleTextChange(event, key, data);
                    }}
                  />
                </div>
              );
            })
          : _.map(_.pick(data, moreField), (value, key) => {
              return (
                <div key={`expertinfo-${key}`}>
                  <h3 className="label-tag">
                    {fieldTitle[key]} &nbsp;
                    {requiredFields.indexOf(key) !== -1 ? (
                      !value && applicationComplete === "N" ? (
                        <span className="warning-text">
                          * please fill this field to complete application
                        </span>
                      ) : (
                        <span className="warning-text">*</span>
                      )
                    ) : null}
                  </h3>
                  <section className="profile-content"><div dangerouslySetInnerHTML={{ __html: value }} /></section>
                </div>
              );
            })}
      </div>

      <ExpertRightSidebar
        data={_.pick(data, lessField)}
        showInput={showInput}
        handleInputChange={(e, key) => handleTextChange(e, key)}
        handleEdit={editHandler}
        handleConfirm={confirmHandler}
      />
    </div>
  )
};

export default ExpertProfile;
