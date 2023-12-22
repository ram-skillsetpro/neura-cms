import React, { useEffect, useState } from 'react';
import style from './Dashboard.module.scss';
import ActiveTrials from './dashboard-components/ActiveTrials';
import ScheduledDemos from './dashboard-components/ScheduledDemos';
import DemoManagers from './dashboard-components/DemoManagers';
import WinLoss from './dashboard-components/WinLoss';
import ChartLeadGenerated from './dashboard-components/ChartLeadGenerated';
import NewLeads from './dashboard-components/NewLeads';
import LeadStatus from './dashboard-components/LeadStatus';
import Notifications from './dashboard-components/Notifications';
import LeadGeneratedCard from './dashboard-components/LeadGeneratedCard';
import userImg from '../../assets/images/profileImg.jpg'; 
import ChartGoLeads from './dashboard-components/ChartGoLeads';
import ChartLeadsWeekly from './dashboard-components/ChartLeadsWeekly';
import fetcher from '../../utils/fetcher';
import ActiveClients from './dashboard-components/ActiveClients';
import { monthNames, monthShortNames } from '../../utils/utility';

const Dashboard = () => {
    const [dashboardMetrics, setDashboardMetrics] = useState({});
    const [salesManagers, setSalesManagers] = useState([]);

    const fetchDashboardMetrics = async () => {
        try {
          const res = await fetcher.get(`dashboard-metrics`);
          setDashboardMetrics(res.response);
        } catch (error) {
          console.log(error);
        }
    };

    const fetchSalesManagers = async () => {
        try {
          const res = await fetcher.get(`sales-managers`);
          setSalesManagers(res.response);
        } catch (error) {
          console.log(error);
        }
    };

    const topMonthCard = (dashboardMetrics?.topMonth && Object.entries(dashboardMetrics.topMonth))
        ? Object.entries(dashboardMetrics.topMonth).map(([date, value]) => {
        const [year, month] = date.split("-");
        return (
            <LeadGeneratedCard
              title="Top Month"
              subTitle={year}
              value={monthNames[parseInt(month, 10) - 1]} 
            />
        );
    }) : null;

    const topWeekCard = (dashboardMetrics?.topWeek && Object.entries(dashboardMetrics.topWeek))
        ? Object.entries(dashboardMetrics?.topWeek).map(([week, value]) => {
        const year = week.substring(0, 4);
        const weekNumber = parseInt(week.substring(4), 10);
    
        // Calculate the date range for the week
        const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
    
        // Format the date range as "DD-Month"
        const formattedStartDate = `${startDate.getDate()} ${monthShortNames[startDate.getMonth()]}`;
        const formattedEndDate = `${endDate.getDate()} ${monthShortNames[endDate.getMonth()]}`;
    
        return (
            <LeadGeneratedCard
              title="Top Week"
              subTitle={`${value} Leads`}
              value={`${formattedStartDate}-${formattedEndDate}`}
            />
        );
    }) : null;

    useEffect(() => {
        fetchDashboardMetrics();
        fetchSalesManagers();
    }, []);

    return(
        <>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='row'>
                        <div className="col-sm-6 mb-4">
                            <ActiveTrials dashboardMetrics={dashboardMetrics}/>
                        </div>
                        <div className="col-sm-6 mb-4">
                            <ActiveClients dashboardMetrics={dashboardMetrics}/>
                        </div>

                        <div className='col-12 mb-4'>
                            <DemoManagers salesManagers={salesManagers} />
                        </div>

                        <div className='col-12 mb-4'>
                            <ChartLeadGenerated />
                        </div>

                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-sm-4 mb-4'>
                                    {topMonthCard}
                                </div>
                                <div className='col-sm-4 mb-4'>
                                    {topWeekCard}
                                </div>
                                <div className='col-sm-4 mb-4'>
                                    <LeadGeneratedCard title="Top Demo Manager" subTitle={dashboardMetrics?.topLeadManager?.user_name} value="" image={userImg}  />
                                </div>
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <ChartGoLeads />
                        </div>
                        <div className='col-md-6'>
                            <ChartLeadsWeekly />
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <div className='mb-4'>
                        <WinLoss dashboardMetrics={dashboardMetrics}/>
                    </div>
                    <div className='mb-4'>
                        <Notifications />
                    </div>
                    <div className='mb-4'>
                        <LeadStatus dashboardMetrics={dashboardMetrics} />
                    </div>
                    <div className='mb-4'>
                        <NewLeads />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;