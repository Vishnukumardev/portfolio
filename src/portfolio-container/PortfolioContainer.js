import React, { Suspense } from 'react'
import { TOTAL_SCREENS } from '../utilities/commonUtils'
import './PortfolioContainer.css'

/* LOADING FALLBACK COMPONENT */
const ScreenLoadingFallback = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <p>Loading...</p>
  </div>
);

export const PortfolioContainer = () => {

    const mapAllScreens = () => {
        return (
            TOTAL_SCREENS.map((screen) => (
               (screen.component) ? (
                 <Suspense key={screen.screen_name} fallback={<ScreenLoadingFallback />}>
                   <screen.component screenName={screen.screen_name} id={screen.screen_name} />
                 </Suspense>
               ) : <div key={screen.screen_name} ></div>
            ))
        )
    }

    return (
        <div className="portfolio-container">
            { mapAllScreens() }
        </div>
    )
}