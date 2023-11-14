import React from 'react';
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

const Dashboard = () => {
    return(
        <>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='row'>
                        <div className="col-sm-6 mb-4">
                            <ActiveTrials />
                        </div>
                        <div className="col-sm-6 mb-4">
                            <ScheduledDemos />
                        </div>

                        <div className='col-12 mb-4'>
                            <DemoManagers />
                        </div>

                        <div className='col-12 mb-4'>
                            <ChartLeadGenerated />
                        </div>

                        <div className='col-12 mb-4'>
                            <div className='row'>
                                <div className='col-4'>
                                    <LeadGeneratedCard title="Top Month" subTitle="2023" value="September" />
                                </div>
                                <div className='col-4'>
                                    <LeadGeneratedCard title="Top Week" subTitle="28 Leads" value="21-27 Nov"  />
                                </div>
                                <div className='col-4'>
                                    <LeadGeneratedCard title="Top Demo Mgr" subTitle="Mohit Sethi" value="" image={userImg}  />
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
                        <WinLoss />
                    </div>
                    <div className='mb-4'>
                        <Notifications />
                    </div>
                    <div className='mb-4'>
                        <LeadStatus />
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