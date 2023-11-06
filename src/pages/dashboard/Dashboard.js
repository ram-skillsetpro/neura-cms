import React from 'react';
import style from './Dashboard.module.scss';
import ActiveTrials from './dashboard-components/ActiveTrials';
import ScheduledDemos from './dashboard-components/ScheduledDemos';
import DemoManagers from './dashboard-components/DemoManagers';
import WinLoss from './dashboard-components/WinLoss';
import LeadGenerated from './dashboard-components/LeadGenerated';
import NewLeads from './dashboard-components/NewLeads';
import LeadStatus from './dashboard-components/LeadStatus';
import Notifications from './dashboard-components/Notifications';

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
                            <LeadGenerated />
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