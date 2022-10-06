import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './detailsRndr.css';
import { BsArrowRightCircle } from 'react-icons/bs';

let count = 1;
const DetailsRender = (props) => {
  const dispatch = useDispatch();
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
  count += 1;

  return (
    <div className="country_continaer_stats">
      <div className="container_element">
        <h3 className="title_country_stats">
          Carbon monoxide (CO):&nbsp;
        </h3>
        <span className="component_country_stats">{getCo}</span>
        <div className="icon_main_react">
          <div className="icon_svg"><BsArrowRightCircle /></div>
        </div>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Ammonia (NH3):&nbsp;
        </h3>
        <span className="component_country_stats">{getNh3}</span>
        <div className="icon_main_react">
          <div className="icon_svg"><BsArrowRightCircle /></div>
        </div>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Nitrogen monoxide (NO):&nbsp;
        </h3>
        <span className="component_country_stats">{getNo}</span>
        <div className="icon_main_react">
          <div className="icon_svg"><BsArrowRightCircle /></div>
        </div>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Nitrogen dioxide (NO2):&nbsp;
        </h3>
        <span className="component_country_stats">{getNo2}</span>
        <div className="icon_main_react">
          <div className="icon_svg"><BsArrowRightCircle /></div>
        </div>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Ozone (O3):&nbsp;
        </h3>
        <span className="component_country_stats">{getO3}</span>
        <div className="icon_main_react">
          <div className="icon_svg"><BsArrowRightCircle /></div>
        </div>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          particulates (pm2_5):&nbsp;
        </h3>
        <span className="component_country_stats">{getPm2}</span>
        <div className="icon_main_react">
          <div className="icon_svg"><BsArrowRightCircle /></div>
        </div>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          particulates (pm10):&nbsp;
        </h3>
        <span className="component_country_stats">{getPm10}</span>
        <div className="icon_main_react">
          <div className="icon_svg"><BsArrowRightCircle /></div>
        </div>
      </div>
      <div className="container_element">
        <h3 className="title_country_stats">
          Sulphur dioxide (SO2):&nbsp;
        </h3>
        <span className="component_country_stats">{getSo2}</span>
        <div className="icon_main_react">
          <div className="icon_svg"><BsArrowRightCircle /></div>
        </div>
      </div>
    </div>
  );
};

export default DetailsRender;
