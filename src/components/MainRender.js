import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './mainRendr.css';
import { BsArrowRightCircle } from 'react-icons/bs';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchGlobalData, updateRegion, detailsCtry } from '../redux/global/globalReduce';

let count = 1;
const MainRenderer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    Name,
    Region,
    contry,
    list,
  } = props;

  const getStats = list[0].components;
  const getCo = getStats.co;
  const getNh3 = getStats.nh3;
  const getNo = getStats.no;
  const getNo2 = getStats.no2;
  const getO3 = getStats.o3;
  const getPm2 = getStats.pm2_5;
  const getPm10 = getStats.pm10;
  const getSo2 = getStats.so2;
  let qualityAir = '';

  if (getNo2 <= 50 && getPm10 <= 25 && getO3 <= 60) {
    qualityAir = 'Good';
  } else if (getNo2 <= 100 && getPm10 <= 50 && getO3 <= 120) {
    qualityAir = 'Fair';
  } else if (getNo2 <= 200 && getPm10 <= 90 && getO3 <= 180) {
    qualityAir = 'Moderate';
  } else if (getNo2 <= 400 && getPm10 <= 180 && getO3 <= 240) {
    qualityAir = 'Poor';
  } else if (getNo2 > 400 && getPm10 > 180 && getO3 > 240) {
    qualityAir = 'Very Poor';
  } else {
    qualityAir = 'Very Poor';
  }
  count += 1;

  const countryDetail = ((event) => {
    const getCtryName = event.target.parentElement.id;
    dispatch(detailsCtry(getCtryName));
    navigate('/details');
  });

  return (
    <button type="button" className="country_continaer" id={Name} onClick={countryDetail}>
      <div className="icon_main_react">
        <div className="icon_svg"><BsArrowRightCircle /></div>
      </div>
      <h3 className="title_country">{Name.toUpperCase()}</h3>
      <div className="quality_air">
        <span className="country_string">
          Air Quality Pollution  is:
        </span>
        <span className="country_result">
          {qualityAir.toUpperCase()}
        </span>
      </div>
    </button>
  );
};

export default MainRenderer;
