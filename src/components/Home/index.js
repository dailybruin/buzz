import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./style.css";
import DesignNotes from './DesignNotes';
import Modulars from './Modulars';
import { InstagramStories }from './InstagramStories';
import { Schedule } from './Schedules';
import config from '../../config';
import AuditIcon from './icons/Audit.svg';
import DesignIcon from './icons/Design.svg';
import InstaIcon from './icons/Instagram.svg';
import BubbleIcon from './icons/Bubble.svg';
import CalendarIcon from './icons/Calendar.svg';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


const Home = () => {
  const[loading, setLoading] = useState(true);
  const[date, setDate] = useState(null);
  const[dateString, setDateString] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());


  // const history = useHistory();
  const location = useLocation();
  const navigate = useNavigate();

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const parseParams= () => {
    if (window) {
      const urlParams = new URLSearchParams(window.location.search);
      const dateString = urlParams.get('date');

      if (dateString) {
        const YMDArr = dateString.split("-");
        const now = new Date();
        // return new Date(YMDArr[0], YMDArr[1] - 1, YMDArr[2], now.getHours(), now.getMinutes(), now.getSeconds())
        return new Date(YMDArr[0], YMDArr[1] - 1, YMDArr[2])
      }
    }
    return new Date();
  };

  const navigateDate = (amount) => {
    const date = amount.target.value;
    console.log("heres teh date", date);
    if (!date) return;
    setDateString(date);
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
            <div className="date-input-wrapper">
              <input
                id="production-date"
                type="date"
                value={dateString}
                onChange={navigateDate}
                className="custom-date-input"
              />
              <label htmlFor="production-date" className="floating-label">Date</label>
              <img src={CalendarIcon} alt="CalendarIcon" className="calendar-icon" />
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

export default Home;
