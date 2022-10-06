import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import loadingStatus from '../redux/loadStats';
import './main.css';
import MainRenderer from './MainRender';
import { fetchGlobalData, updateRegion, detailsCtry } from '../redux/global/globalReduce';

const MainStatTest = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.myState);
  const countires = useSelector((store) => store.myState);
  const regions = useSelector((store) => store.myState);

  const updateStore = ((event) => {
    const getEvent = event.target.innerText;
    dispatch(updateRegion(getEvent));
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
    const setRegion = regions.toUpperCase();
    const sumPollution = {
      sumNo2: 0,
      sumO3: 0,
      sumPm10: 0,
    };
    let count = 1;
    const regionStat = countires.filter((cntry) => cntry.Region === regions).map((data) => {
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
      <div className="main_container">
        <div className="regions_container">
          <button type="button" onClick={updateStore}>South America</button>
          <button type="button" onClick={updateStore}>Europe</button>
          <button type="button" onClick={updateStore}>Africa</button>
          <button type="button" onClick={updateStore}>Oceania</button>
          <button type="button" onClick={updateStore}>North America & Caribbean</button>
        </div>
        <header className="country_selected">
          <div className="europe_img" />
          <div className="header_container">
            <h2 className="country_name">{setRegion}</h2>
            <p className="region_stats">
              Air Pollution Quality is&nbsp;
              {qualityAir.toUpperCase()}
            </p>
          </div>
        </header>
        <div className="division_main">
          <h3 className="title_main">STATS BY CONTINENT</h3>
        </div>
        <div className="group_container">
          {countires.filter((cntry) => cntry.Region === regions).map((data) => (
            <MainRenderer
              key={`books-lisk-card-${data.Name}`}
              {...data}
            />
          ))}
        </div>
      </div>
    );
  }
  return false;
};

export default MainStatTest;
