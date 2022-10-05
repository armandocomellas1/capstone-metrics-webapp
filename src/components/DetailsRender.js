import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './detailsRndr.css';

let count = 1;
const DetailsRender = (props) => {
  const dispatch = useDispatch();
  const {
    Name,
    Region,
    contry,
    list,
  } = props;
  console.log('props', props);
  const getStats = list[0].components;
  const getCo = getStats.co;
  const getNh3 = getStats.nh3;
  const getNo = getStats.no;
  const getNo2 = getStats.no2;
  const getO3 = getStats.o3;
  const getPm2 = getStats.pm2_5;
  const getPm10 = getStats.pm10;
  const getSo2 = getStats.so2;
  // let qualityAir = '';

  // if (getNo2 <= 50 && getPm10 <= 25 && getO3 <= 60) {
  //   qualityAir = 'Good';
  // } else if (getNo2 <= 100 && getPm10 <= 50 && getO3 <= 120) {
  //   qualityAir = 'Fair';
  // } else if (getNo2 <= 200 && getPm10 <= 90 && getO3 <= 180) {
  //   qualityAir = 'Moderate';
  // } else if (getNo2 <= 400 && getPm10 <= 180 && getO3 <= 240) {
  //   qualityAir = 'Poor';
  // } else if (getNo2 > 400 && getPm10 > 180 && getO3 > 240) {
  //   qualityAir = 'Very Poor';
  // } else {
  //   qualityAir = 'Very Poor';
  // }
  count += 1;

  return (
    <div className="country_continaer_stats">
      <div className="container_element">
        <h3 className="title_country_stats">
          Carbon monoxide (CO):&nbsp;
        </h3>
        <span className="component_country_stats">{getCo}</span>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Ammonia (NH3):&nbsp;
        </h3>
        <span className="component_country_stats">{getNh3}</span>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Nitrogen monoxide (NO):&nbsp;
        </h3>
        <span className="component_country_stats">{getNo}</span>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Nitrogen dioxide (NO2):&nbsp;
        </h3>
        <span className="component_country_stats">{getNo2}</span>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Ozone (O3):&nbsp;
        </h3>
        <span className="component_country_stats">{getO3}</span>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          particulates (pm2_5):&nbsp;
        </h3>
        <span className="component_country_stats">{getPm2}</span>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          particulates (pm10):&nbsp;
        </h3>
        <span className="component_country_stats">{getPm10}</span>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Sulphur dioxide (SO2):&nbsp;
        </h3>
        <span className="component_country_stats">{getSo2}</span>
      </div>
    </div>
  );
};

export default DetailsRender;
