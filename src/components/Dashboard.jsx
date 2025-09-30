import { useEffect, useState, useRef } from 'react';
import { getEnerfipQueryResult, parseEnerfipResponse } from '../enerfip_api/client';
import { parseEnerfipAmountData } from '../enerfip_api/client';
import { convertNumberToEuro } from '../utils/currency_converter';
import SlotCounter from 'react-slot-counter';
import milliong from '../assets/DES-MILLIONGS.gif';
import song from '../assets/Multiplex-Canal.mp3';


function Dashboard() {

  const [totalAmount, setTotalAmount] = useState(0);
  const [amountCurrentYear, setAmountCurrentYear] = useState(0);
  const [previousAmountCurrentYear, setPreviousAmountCurrentYear] = useState(0);
  const [amountCurrentDay, setAmountCurrentDay] = useState(0);
  const [amountCurrentMonth, setAmountCurrentMonth] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const audioRef = useRef(null);


  const triggerAnimationIfReady = () => {
    const animationThresholdAmount = 1000000.0;
    const differenceAmount = Math.floor(amountCurrentYear/animationThresholdAmount) - Math.floor(previousAmountCurrentYear/animationThresholdAmount);
  
    if (differenceAmount === 1) {
      // Trigger animation
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 60000);
    }
  }

  const retrieveAmountForDisplay = async (queryId, apiKey) => {
    const rawData = await getEnerfipQueryResult(queryId, apiKey); // returns response.data from redash query
    const collectedAmount = parseEnerfipAmountData(rawData); // rawData.query_result.data.rows[0].collected_amount
    return convertNumberToEuro(collectedAmount); // affichage des chiffre en Euro
  };
  const retreiveTotalAmount = async () => {
    const amount = await retrieveAmountForDisplay(772, "7kScPIQlpk96VM6Oaw9nwQAeuWn0KFirlePkVXDW");
    setTotalAmount(amount);
  };

  const retrieveAmountCurrentDay = async () => {
    const amount = await retrieveAmountForDisplay(1003, "Ellha3oyOl5R88IxpzRUHx7RAJ0BG2zFG5yNoUUo");
    setAmountCurrentDay(amount);
  };

  const retreiveAmountCurrentYear = async () => {
    const amount = await retrieveAmountForDisplay(739, "nxSL9zPbhQ89auEd9l8lHNXUuBV2AuDFjekTwXKx");
    setAmountCurrentYear(amount);
  };

  const retrieveMonthlyAmounts = async (queryId, apiKey) => {
    const rawData = await getEnerfipQueryResult(queryId, apiKey);
    return parseEnerfipResponse(rawData); // retourne directement toutes les rows
  };

  const retrieveAmountCurrentMonth = async () => {
    const monthlyAmounts = await retrieveMonthlyAmounts(805, "SJMTKOS2Hb7dqGVOP8urA284ApO2sy2meCcr1rig");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 = january
  
    const thisMonthRow = monthlyAmounts.find(row => {
      const rowDate = new Date(row.month);
      return rowDate.getFullYear() === currentYear && rowDate.getMonth() === currentMonth;
    });
  
    setAmountCurrentMonth(thisMonthRow ? convertNumberToEuro(thisMonthRow.collected_by_month) : 0);
  };
  

  useEffect(() => {
      retreiveAmountCurrentYear().then(() => setPreviousAmountCurrentYear(amountCurrentYear));
      retreiveTotalAmount();
      retrieveAmountCurrentDay();
      retrieveAmountCurrentMonth();
  }, []);

  useEffect(() => {
    const refreshTimeOut = setInterval(() => {
      setPreviousAmountCurrentYear(amountCurrentYear)
      retreiveAmountCurrentYear();
      retreiveTotalAmount();
      retrieveAmountCurrentDay();
      retrieveAmountCurrentMonth();
      triggerAnimationIfReady();
    }, 60000);
    return () => clearInterval(refreshTimeOut);
  }, []);

  useEffect(() => {
    if (showAnimation && audioRef.current) {
      audioRef.current.play();
    }
  }, [showAnimation]);

  return (
    <>
      <section className='invest-page'>

        <div className='secondaryAmountInfo'>
          <div className='amountBox totalInvest'>
            <p>Total raised :</p>
            <p style={{fontWeight: "bold"}}><SlotCounter value={totalAmount} /></p>
          </div>

          <div className='amountBox monthInvest'>
            <p>This month :</p>
            <p style={{fontWeight: "bold"}}><SlotCounter value={amountCurrentMonth} /></p>
          </div>

          <div className='amountBox todayInvest'>
              <p>Today :</p>
              <p style={{fontWeight: "bold"}}><SlotCounter value={amountCurrentDay} /></p>
          </div>
        </div>

        
        <div className='currentInvest'>
          <p className='currentYear'>Raised in {new Date().getFullYear()} :</p>
          <p className='currentAmount'><SlotCounter value={amountCurrentYear} /></p>
        </div>
       

        {showAnimation && (
          <>
            <div className='gifJulien'>
              <img src={milliong} alt="Celebration gif" />
            </div>

            <div className='gifSeb'>
              <img src={milliong} alt="Celebration gif" />
            </div>

            <audio ref={audioRef} src={song} />
          </>
        )}
      </section>
    </>
  )
}

export default Dashboard;
