import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ROUTES from './constants/routes';
import ExploreScreen from './screens/Explore/Explore';
import PDFScreen from './screens/PDF/PDF';

const NavBar = props => {
	return(
		<nav className="main hpx50" style={{backgroundColor:"#f8f9fa"}}>
			<a href={ROUTES.PROJECT_HOME} className="brand off-white"
			style={{color:"#333333"}}>Palette</a>
		</nav>
	)
}
const AppLayout = props => {
	return(
		<div className="container-fluid no-gutters" style={{height:"100vh"}}>
			{props.navBar ? React.createElement(props.navBar) : null}
            {props.children}
		</div>
	)
}

const AppRoute = ({ component, ...routeProps }) => {
	return(
		<Route {...routeProps} render={(props) => {
            return (
                <AppLayout { ...props} {...routeProps}>
                    {React.createElement(component, props)}
                </AppLayout>
            );
        }} />
	)
}

const App = appProps => (
	<Router>
		<Switch>
			<AppRoute exact path={ROUTES.PROJECT_HOME} navBar={NavBar} component={ExploreScreen} {...appProps} />
			<AppRoute exact path={ROUTES.PROJECT_HOME+"/pdf/:scheme"} component={PDFScreen} {...appProps} />
		</Switch>
	</Router>
)


export default App;