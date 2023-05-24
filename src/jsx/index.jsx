import React, { useState } from 'react'
/// React router dom
import {Switch, Route } from 'react-router-dom'
/// Css
import './index.css'
import './chart.css'
import './step.css'
import './custom.css'

/// Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'

/// Dashboard
import Screen from "./components/screen";

//Scroll To Top
import ScrollToTop from './layouts/ScrollToTop';
import Media from './components/media'
import Settings from './components/settings'
// import Webplayer from './components/web-player'
import ScreenDetails from './components/screen/details'
import Layout from './components/layout/Layout'
import ChooseLayout from './components/layout/ChooseLayout'
import CreateComposition from './components/layout/Composition/CreateComposition'
import Push from './components/push/PushScreen'
import SelectComparison from './components/push/SelectComparison'
import EditComposition from './components/layout/Composition/EditComposition'



const Markup = () => {
  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]
  let pagePath = path.split('-').includes('page')
  const [activeEvent, setActiveEvent] = useState(!path)

  const routes = [
    /// Dashboard
    { url: "", component: Screen },
    { url: "display", component: Screen },
    { url: "assets", component: Media },
    {url: "settings", component: Settings},
    {url: "layout", component: Layout},
    {url: "chooselayout", component: ChooseLayout},
    {url: "createComposition", component: CreateComposition},
    {url: "composition/edit", component: EditComposition},
    { url: "push", component: Push },
    { url: "SelectComparison", component: SelectComparison },
    // {url: "web-player", component: Webplayer},
    {url: "display/:id", component: ScreenDetails},
  ]
console.log(path)
  return (
       <> 
          <div
            id={`${!pagePath ? 'main-wrapper' : ''}`}
            className={`${!pagePath ? 'show' : 'mh100vh'}`}
          >
            {!pagePath && path !== "web-player" && (
              <Nav
                onClick={() => setActiveEvent(!activeEvent)}
                activeEvent={activeEvent}
                onClick2={() => setActiveEvent(false)}
                onClick3={() => setActiveEvent(true)}
              />
            )}
            <div
              className={` ${!path && activeEvent ? 'rightside-event' : ''} ${
                !pagePath ? 'content-body content-body-custom' : ''
              } ${path === 'web-player' ? 'web-player-body' : ''}`}
            >
              <div
                className={`${!pagePath ? 'container-fluid' : ''}`}
                style={{ minHeight: window.screen.height - 60 }}
              >
                <Switch>
                  {routes.map((data, i) => (
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                  ))}
                </Switch>
              </div>
            </div>
            {!pagePath && <Footer />}
          </div>
         <ScrollToTop />
       </>
  )
}

export default Markup
