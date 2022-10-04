import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchGlobalData } from '../redux/global/globalReduce';
import loadingStatus from '../redux/loadStats';

const MainStat = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.globaStats.status);
  console.log('loading', loading);
  const countires = useSelector((store) => store.globaStats.stateArr);
  console.log('countries', countires);

  useEffect(() => {
    if (loading === loadingStatus.idle) {
      dispatch(fetchGlobalData());
    }
  }, [dispatch, loading]);

  // if (rockets.status === 'SUCCEEDED') {
  //   const rocketsAll = rockets.rockets;
  //   return (
  //     <div>
  //       {
  //         rocketsAll.map((rocket) => {
  //           return (
  //             <RocketsRender
  //               key={`books-lisk-card-${rocket.id}`}
  //               {...rocket}
  //             />
  //           );
  //         })
  //       }
  //     </div>
  //   );
  // }
  // return false;
};

export default MainStat;
