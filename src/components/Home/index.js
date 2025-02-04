import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./style.css";
import { DesignNotes } from './DesignNotes';
import { Modulars } from './Modulars';
import { InstagramStories } from './InstagramStories';
import { Schedule } from './Schedules';
import config from '../../config';
import AuditIcon from './icons/Audit.svg';
import DesignIcon from './icons/Design.svg';
import InstaIcon from './icons/Instagram.svg';
import BubbleIcon from './icons/Bubble.svg';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const dateMatcher = /(\d{4})\-(\d{1,2})\-(\d{1,2})/;

// const formatDate = (dateObject) => ((dateObject.getDate() === new Date().getDate() ? "Today, " : dateObject.getDate() === new Date().getDate() + 1 ? "Tomorrow, " : "") + new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "2-digit"
//   }).format(dateObject)
// )

const Home = () => {
  const[loading, setLoading] = useState(true);
  const[date, setDate] = useState(null);
  const[dateString, setDateString] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());


  const navigate = useNavigate();
  const location = useLocation();

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const parseParams= () => {
    if (window) {
      const urlParams = new URLSearchParams(window.location.search);
      const dateString = urlParams.get('date');
      const YMDArr = dateMatcher.exec(dateString);
      if (YMDArr) {
        YMDArr.shift();
        const now = new Date();
        return new Date(YMDArr[0], YMDArr[1] - 1, YMDArr[2], now.getHours(), now.getMinutes(), now.getSeconds())
      }
    }
    return null;
  };

  const navigateDate = (amount) => {
    const date = amount.target.value;
    if (!date) return;
    const [year,month, day] = date.split('-');
    navigate(`/?date=${year}-${month}-${day}`);
  };

  useEffect(() => {
    const paramDate = parseParams();
    const date = paramDate ? paramDate : new Date();
    const dateString = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
    setDate(date);
    setDateString(dateString);
    setLoading(false);
  }, [location.search])

  if(loading){
    return null;
  }

  return (
    <>
        <div className="top-row">
          <div className="left-column">
            <h2>Production for</h2>
            <div className="data-input-row">
              <label htmlFor="production-date">Date</label>
              <input
                id="production-date"
                type="date"
                value={dateString} 
                onChange={navigateDate} 
              />
              {/* <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/dd/yyyy"
              /> */}
            </div>
          </div>
          <div className="right-column">
          <h2>Quick Access</h2>
            <div className="quick-access-grid">
              <a href="#design-notes" className="quick-access-item">
                <span className="icon-item">
                  <img src={DesignIcon} alt="DesignIcon" />
                  Design Notes
                </span>
              </a>
              <a href="/#instagram-stories" className="quick-access-item">
                <span className="icon-item">
                  <img src={InstaIcon} alt="DesignIcon" />
                  Instagram Stories
                  </span>
              </a>
              <a href="/#audits" className="quick-access-item">
                <span className="icon-item">
                  <img src={AuditIcon} alt="DesignIcon" />
                  Audits
                  </span>
                </a>
              <a href="/#opinion-modulars" className="quick-access-item">
                <span className="icon-item">
                  <img src={BubbleIcon} alt="DesignIcon" />
                  Opinion Modulars
                  </span>
              </a>
            </div>
          </div>
        </div>
      <Schedule section="design" />
      <div id="design-notes">
        <h2>Design Notes</h2>
        <DesignNotes date={dateString} />
      </div>
      <div id="instagram-stories">
        <h2>Instagram Stories</h2>
        <InstagramStories date={dateString}  />
      </div>
      <div id="audits">
        <h2>Audits</h2>
        <a target="_blank" rel="noopener noreferrer" href={config.auditSheet}>Click here (new tab)</a>
        </div>
      <div id="opinion-modulars">
        <h2>Opinion Modulars</h2>
        <Modulars date={dateString}  />
      </div>

    </>
  )
}


// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//       date: null,
//       dateString: null
//     };
//     this.parseParams = this.parseParams.bind(this);
//     this.navigateDate = this.navigateDate.bind(this);
//   }

//   parseParams() {
//     if (window) {
//       const urlParams = new URLSearchParams(window.location.search);
//       const dateString = urlParams.get('date');
//       const YMDArr = dateMatcher.exec(dateString);
//       if (YMDArr) {
//         YMDArr.shift();
//         const now = new Date();
//         return new Date(YMDArr[0], YMDArr[1] - 1, YMDArr[2], now.getHours(), now.getMinutes(), now.getSeconds())
//       }
//       return null;
//     }
//     return null;
//   }

//   componentDidMount() {
//     const paramDate = this.parseParams();
//     const date = paramDate ? paramDate : new Date();
//     const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

//     this.setState({ date, dateString, loading: false });
//   }

//   navigateDate(amount) {
//     const next = new Date(this.state.date);
//     next.setDate(next.getDate() + amount);
//     const year = next.getFullYear();
//     const month = next.getMonth() + 1;
//     const day = next.getDate();
//     if (window) {
//       window.location = `/?date=${year}-${month}-${day}`;
//     }
//   }

//   render() {
//     if (this.state.loading) {
//       return null;
//     }

//     return (
//       <>
//         <h1 className="notbold">Production for: <span className="semibold pointer" onClick={() => this.navigateDate(-1)}>&#8592;</span><span className="semibold">{formatDate(this.state.date)}</span><span className="semibold pointer" onClick={() => this.navigateDate(1)}>&#8594;</span></h1>
//         <Schedule section="design" />
//         <h2>Design Notes</h2>
//         <DesignNotes date={this.state.dateString} />
//         <h2>Instagram Stories</h2>
//         <InstagramStories date={this.state.dateString}  />
//         <h2>Audits</h2>
//         <a target="_blank" rel="noopener noreferrer" href={config.auditSheet}>Click here (new tab)</a>
//         <h2>Opinion Modulars</h2>
//         <Modulars date={this.state.dateString}  />
//       </>
//     )
//   }
// }

export default Home;
