import React, { useState } from 'react';
import './styles/app.css';
import Header from './pages/header/header.jsx';
import TabBar from './pages/tabBar/tabBar.jsx';
import CallLogsList from './component/CallLogs/CallLogList.jsx';
import Footer from './pages/footer/footer.jsx';
import { AppText } from './enum/appText.js';

function App() {
    const [selectedTab, setSelectedTab] = useState(AppText.INBOX);
    const [activeCallsCount, setActiveCallsCount] = useState(0);

    const handleTabChange = (newTab) => {
        setSelectedTab(newTab);
    };
    const handleActiveCallsCountChange = (count) => {
        setActiveCallsCount(count); 
    };


    return (
        <div className='main'>
            <Header className='header' activeCallsCount={activeCallsCount} />
            <TabBar className='tabBar' onTabChange={handleTabChange} />
            <div className='callLogsList'>
                <CallLogsList currentTab={selectedTab} onActiveCallsCountChange={handleActiveCallsCountChange} />
            </div>
            <Footer className='footer' activeCallsCount={activeCallsCount}/>
        </div>
    );
}

export default App;

