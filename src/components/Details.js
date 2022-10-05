import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import loadingStatus from '../redux/loadStats';
import './details.css';
import DetailsRender from './DetailsRender';
import { fetchGlobalData, updateRegion, detailsCtry } from '../redux/global/globalReduce';

// const regionsArr = ['South America', 'Europe', 'Africa', 'Oceania', 'North America & Caribbean'];

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((store) => store.globaStats.status);
  // console.log('loading', loading);
  const countires = useSelector((store) => store.globaStats.stateArr);
  // console.log('countries', countires);
  const regions = useSelector((store) => store.globaStats.region);
  // console.log('countries', countires);
  const detailCtry = useSelector((store) => store.globaStats.country);

  const backButton = ((event) => {
    navigate('/mainstat');
  });

  useEffect(() => {
    if (loading === loadingStatus.idle) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch, loading]);

  if (loading === 'SUCCEEDED') {
    const ctryName = countires.Name;
    const ctryRegion = countires.Region;
    const ctryStats = countires;
    const setRegion = detailCtry.toUpperCase();
    const sumPollution = {
      sumNo2: 0,
      sumO3: 0,
      sumPm10: 0,
    };
    let count = 1;
    const regionStat = countires.filter((cntry) => cntry.Country === detailCtry).map((data) => {
      const getStats = data.list[0].components;
      const getCo = getStats.co;
      const getNh3 = getStats.nh3;
      const getNo = getStats.no;
      const getNo2 = getStats.no2;
      const getO3 = getStats.o3;
      const getPm2 = getStats.pm2_5;
      const getPm10 = getStats.pm10;
      const getSo2 = getStats.so2;
      sumPollution.sumNo2 += getNo2;
      sumPollution.sumO3 += getO3;
      sumPollution.sumPm10 += getPm10;
      count += 1;
      return sumPollution;
    });
    const getCount = count - 1;
    sumPollution.sumNo2 /= getCount;
    sumPollution.sumO3 /= getCount;
    sumPollution.sumPm10 /= getCount;

    let qualityAir = '';
    if (sumPollution.sumNo2 <= 50 && sumPollution.sumPm10 <= 25 && sumPollution.sumO3 <= 60) {
      qualityAir = 'Good';
    } else if (sumPollution.sumNo2 <= 100 && sumPollution.sumPm10 <= 50 && sumPollution.sumO3 <= 120) {
      qualityAir = 'Fair';
    } else if (sumPollution.sumNo2 <= 200 && sumPollution.sumPm10 <= 90 && sumPollution.sumO3 <= 180) {
      qualityAir = 'Moderate';
    } else if (sumPollution.sumNo2 <= 400 && sumPollution.sumPm10 <= 180 && sumPollution.sumO3 <= 240) {
      qualityAir = 'Poor';
    } else if (sumPollution.sumNo2 > 400 && sumPollution.sumPm10 > 180 && sumPollution.sumO3 > 240) {
      qualityAir = 'Very Poor';
    } else {
      qualityAir = 'Very Poor';
    }

    return (
      <div className="details_container">
        <div className="countries_container">
          <button type="button" onClick={backButton}>Back Home</button>
        </div>
        <header className="country_selected_detail">
          <div className="europe_img" />
          <div className="header_container_details">
            <h2 className="country_name_details">{setRegion}</h2>
            <p className="details_stats">
              Air Pollution Quality is&nbsp;
              {qualityAir.toUpperCase()}
            </p>
          </div>
        </header>
        <div className="division_details">
          <h3 className="title_details">STATS BY COUNTRY</h3>
        </div>
        {countires.filter((cntry) => cntry.Country === detailCtry).map((data) => (
          <DetailsRender
            key={`books-lisk-card-${data.Name}`}
            {...data}
          />
        ))}
      </div>
    );
  }
  return false;
};

export default Details;
