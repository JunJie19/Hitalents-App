import React, { useEffect, useState } from "react";
import { fetchReq } from "../../utils/utils";
import "../../styles/dashboard.css";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import ReactGA from "react-ga";

const Dashboard = () => {
  const [totalApplicant, setTotalApplicant] = useState([]);
  const [gender, setGender] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [category, setCategory] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [sourceref, setSourceref] = useState([]);
  const [gender_val, setGender_val] = useState([]);
  const [category_val, setCategory_val] = useState([]);
  const [expertise_val, setExpertise_val] = useState([]);
  const [nationality_val, setNationality_val] = useState([]);
  const [sourceref_val, setSourceref_val] = useState([]);


  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    Promise.all([
      fetchReq("/api/expertDashboard/totalapplicant"),
      fetchReq("/api/expertDashboard/gender"),
      fetchReq("/api/expertDashboard/category"),
      fetchReq("/api/expertDashboard/expertise"),
      fetchReq("/api/expertDashboard/nationality"),
      fetchReq("/api/expertDashboard/sourceref"),
    ])
      .then((data) => {
        const [
          totalApplicant,
          gender,
          category,
          expertise,
          nationality,
          sourceref,
        ] = data;
        setTotalApplicant(totalApplicant.map((ta) => ta.total_applicant));
        setGender(gender.map((g) => g.gender));
        setGender_val(gender.map((g) => g.number_applicant))
        setCategory(category.map((c) => c.category));
        setCategory_val(category.map((cv) => cv.number_applicant));
        setExpertise(expertise.map((e) => e.expertise));
        setExpertise_val(expertise.map((ev) => ev.number_applicant));
        setNationality(nationality.map((n) => n.nationality));
        setNationality_val(nationality.map((nv) => nv.number_applicant));
        setSourceref(sourceref.map((s) => s.source_references));
        setSourceref_val(sourceref.map((sv) => sv.number_references));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard">
      <section className="chart-one">
        <div className='number_chart'>
          <h3>Total Applicant</h3>
          <hr />
          <div className='no_font'>{totalApplicant}</div>
        </div>

        <div className='gender_chart'>
          <Pie
            data={{
              labels: gender,
              datasets: [{
                data: gender_val,
                label: 'Gender',
                backgroundColor: ['blue', 'red'],
                borderWidth: 4,
                borderColor: '#777',
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
              }]
            }}
            options={{
              // {
              //   scales: {
              //     yAxes: [{
              //       ticks: {
              //         min: 0
              //       }
              //     }]
              //   },
              responsive: false,
              title: {
                display: true,
                text: 'Gender',
                fontSize: 25
              },
              legend: {
                display: false,
              },
              maintainAspectRatio:false
            }}
            height={300}
            width={300}
          />
        </div>


        <div className='nationality_chart'>

          <Bar data={{
            labels: nationality,
            datasets: [{
              data:nationality_val,
              label: 'Nationality',
              // backgroundColor: ['blue', 'red'],
              borderWidth: 4,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          }}
            options={
              {
                scales: {
                  yAxes: [{
                    ticks: {
                      min: 0
                    }
                  }]
                },
                responsive: true,
                title: {
                  display: true,
                  text: 'Nationality',
                  fontSize: 25
                },
                legend: {
                  display: false,

                },
                maintainAspectRatio:false
              }
            }
            height={400}
            width={500}
          />
        </div>


      </section>


      <section className="chart-two">
        <div className="category_chart" >
          
          <Pie data={{
            labels: category,
            datasets: [{
              data: category_val,
              label: 'Category',
              // backgroundColor: ['blue', 'red'],
              borderWidth: 4,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          }}
            options={
              {
                // scales: {
                //   yAxes: [{
                //     ticks: {
                //       beginAtZero: true
                //     }
                //   }]
                // },
                title: {
                  display: true,
                  text: 'Category',
                  fontSize: 25
                },
                legend: {
                  display: false,

                },
                responsive: false,
                maintainAspectRatio:false

              }
            }
            height={400}
            width={450}
          />
        </div>


        <div className="expertise_chart">
          <Doughnut data={{
            labels: expertise,
            datasets: [{
              data: expertise_val,
              label: 'Expertise',
              // backgroundColor: ['blue', 'red'],
              borderWidth: 4,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          }}
            options={
              {
                // scales: {
                //   yAxes: [{
                //     ticks: {
                //       beginAtZero: true
                //     }
                //   }]
                // },
                responsive: false,
                title: {
                  display: true,
                  text: 'Expertise',
                  fontSize: 25
                },
                legend: {
                  display: false,

                },
                maintainAspectRatio:false
              }
            }
            height={400}
            width={450}
          />

        </div>
      </section>

      <section className="chart-two">
        <div className="source_chart">
          <Bar data={{
            labels: sourceref,
            datasets: [{
              data: sourceref_val,
              label: 'Source references',
              // backgroundColor: ['blue', 'red'],
              borderWidth: 4,
              borderColor: '#777',
              hoverBorderWidth: 3,
              hoverBorderColor: '#000'
            }]
          }}
            options={
              {
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                },
                responsive: false,
                title: {
                  display: true,
                  text: 'Source Referrences',
                  fontSize: 25
                },
                legend: {
                  display: false,

                },
                maintainAspectRatio:false
              }
            }
            height={480}
            width={600}
          />
        </div>
      </section>


    </div>
  )
};

export default Dashboard;
