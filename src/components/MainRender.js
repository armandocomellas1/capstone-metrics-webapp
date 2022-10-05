import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MainRenderer = (props) => {
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
    qualityAir = 'very Poor';
  }

  return (
    <div className="country_continaer">
      <h3>{Name}</h3>
      <div className="quality_air">
        Air Pollution Quality is&nbsp;
        {qualityAir}
      </div>
    </div>
  );
};

export default MainRenderer;
