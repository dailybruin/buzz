import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./style.css";
import DesignNotes from './DesignNotes';
import Modulars from './Modulars';
import InstagramStories from './InstagramStories';
import { Schedule } from './Schedules';
import config from '../../config';
import AuditIcon from './icons/Audit.svg';
import DesignIcon from './icons/Design.svg';
import InstaIcon from './icons/Instagram.svg';
import BubbleIcon from './icons/Bubble.svg';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const dateMatcher = /\d{4}-\d{1,2}-\d{1,2}/;

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


  // const history = useHistory();
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
  }, [location.search]);

  if (loading) {
    return null;
  };

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
      <h2>Audits</h2>
      <div className='audit-link'>
        <a target="_blank" rel="noopener noreferrer" href={config.auditSheet}>
          <svg width="64px" height="64px" viewBox="0 0 20 20" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>icon/20/icon-open-in-new</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Output-svg" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="out" transform="translate(-838.000000, -29.000000)" fill="#000000"> <path d="M855,46 L841,46 L841,32 L848,32 L848,30 L841,30 C839.89,30 839,30.9 839,32 L839,46 C839,47.1 839.89,48 841,48 L855,48 C856.1,48 857,47.1 857,46 L857,39 L855,39 L855,46 L855,46 Z M850,30 L850,32 L853.59,32 L843.76,41.83 L845.17,43.24 L855,33.41 L855,37 L857,37 L857,30 L850,30 L850,30 Z" id="path"> </path> </g> </g> </g></svg>
          Open in New Tab
        </a>
      </div>
      <div id="opinion-modulars">
        <h2>Opinion Modulars</h2>
        <Modulars date={dateString}  />
      </div>
    </>
  )
}

export default Home;
