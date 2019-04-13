import React, { Component } from 'react'
import './assets/styles/index.scss'
import config from './config'
//router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from './containers/Main'
import NotFound from './components/shared/NotFound'
import Loading from './components/shared/Loading'

//animations
import posed, { PoseGroup } from 'react-pose'

const RouteContainer = posed.div({
  enter: {
    opacity: 1,
    delay: 10000,
    beforeChildren: true,
    staggerChildren: 50
  },
  exit: { opacity: 0 }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    this.setState({ loading: false })
  }
  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <div className="App">
              {/* <main style={{ 'backgroundImage': `url(${DefaultBg})`, 'backgroundPosition': 'center' }}> */}
              <main>
                <Loading visible={this.state.loading} />
                <PoseGroup>
                  <RouteContainer key={location.pathname}>
                    <Switch>
                      <Route path="/" exact component={Main} />
                      <Route component={NotFound} />
                    </Switch>
                  </RouteContainer>
                </PoseGroup>
              </main>
            </div>
          )}
        />
      </Router>
    )
  }
}

export default App
