import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import { connect } from 'react-redux';
import {
	setKey,
	setData
} from '../../store/actions/index';
import ENDPOINTS from '../../constants/api';

import Grid from '../../components/Grid/Grid';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

class ExploreScreen extends Component {
	componentDidMount(){
		Promise.resolve(this.checkStorage(ENDPOINTS.BASE))
		.then(() => {
			document.addEventListener("keypress", this.keyPressHandler)
		})

	}

	fetchDataHandler = key => {
		return fetch(key)
		.then(response => response.json())
		.then(responseJson => {
			Promise.resolve(localStorage.setItem(key, JSON.stringify(responseJson.colors)))
			.then(() => this.props.onSetData("initialColors", responseJson.colors))
		})
	};

	checkStorage = key => {

		let storage = localStorage.getItem(key)
		let randoms =[]

		if(storage !== null){
			storage = this.props.onSetData("initialColors", JSON.parse(storage))
		}else{
			storage = this.fetchDataHandler(key)
		}
		
		Promise.resolve(storage)
		.then(() => {
			randoms = this.randoms_func()
			Promise.resolve(this.props.onSetData("randomColors", randoms))

		})
		.then(() => this.props.onSetKey("isLoading", false))
	};

	itemSelectedHandler = hex => {
		let color = this.props.selectedColors.find(item => {
			return item.hex === hex
		})

		let selections = this.props.selectedColors

		if(color !== undefined){
			//remove color from selected colors list
			selections = selections.filter(item => {
				return item.hex !== hex
			})
		}else{
			let color = this.props.initialColors.find(item => {
				return item.hex === hex
			})

			selections = selections.concat(color)
		}

		Promise.resolve(this.props.onSetData("selectedColors", selections))
	};

	keyPressHandler = event => {
		// :: space key code, 32
		let randoms = []
		if(event.keyCode === 32){
			randoms = this.randoms_func()
			Promise.resolve(this.props.onSetData("randomColors", randoms))
		}
	};

	randoms_func = () => {
		let check = {}
		let randomNum = 0
		let randoms = []
		let max = this.props.initialColors.length

		let checkRandoms = list => {
			check = list.find(item => {
				return item.hex === this.props.initialColors[randomNum].hex
			})

			return check
		}

		while(randoms.length < 5 ){
			randomNum = Math.floor(Math.random() * (+max - + 0)) + + 0
			check = checkRandoms(randoms)
			if(check === undefined){
				randoms.push(this.props.initialColors[randomNum])
			}
		}

		return randoms
	}

	render(){
		let colorSelected = key => {
			let color = this.props.selectedColors.find(item => {
				return item.hex === key
			})

			return color
		}
		let getColorScheme = () => {
			let randoms = this.props.randomColors
			let scheme = []
			randoms.forEach(random => {
				scheme.push(random.hex.slice(1))
			})

			return scheme
		}
		if(this.props.isLoading){
			return(
				<div className="flex-column align-items-center">
				<h1>loading ...</h1>
				</div>
			)
		}
		return(
			<div>
				<span className="flex-row hpx50" style={{zIndex:1, position:"absolute", top:50, left:0, right:0, backgroundColor:"#f8f9fa"}}>
					<span className="flex-column col-12 col-sm-6 justify-content-center">
						<p>Press the spacebar to generate a color scheme</p>
					</span>
					<span className="flex-column col-12 col-sm-6 justify-content-center">
						<ul className="flex-row justify-content-end">
							<Link
							to={`${ROUTES.PROJECT_HOME}/pdf/${getColorScheme()}`} 
							target="_blank"><li className="pxxs">Export pdf</li></Link>
						</ul>
					</span>
				</span>
				<Grid gridContainerStyle={{maxWidth:"100%", height:"100vh"}}>
					{this.props.randomColors.map((item, index) => 
						<span key={index} style={{width:"20%", height:"100%", padding:0}}>
							<div className="card hoverable flex-column align-items-center justify-content-center"
							 onClick={() => this.itemSelectedHandler(item.hex)} 
							style={{backgroundColor:item.hex ? item.hex:null, 
								width:"100%", height:"100%", borderRadius:0}}
							>
							{colorSelected(item.hex) !== undefined && <IoIosCheckmarkCircleOutline 
							style={{position:"absolute", top:100, right:10}} size={20} color="black"/>}
							<span style={{width:"100%", height:100}}>
							
							<p style={{paddingBottom:20, textAlign:"center", fontFamily:"Montserrat", fontSize:24, 
							color:"rgba(0,0,0,.5)"}}>{item.hex}</p>
							<p style={{textAlign:"center", fontFamily:"Montserrat", fontSize:20, color:"rgba(0,0,0,.5)"}}>{item.name}</p>
						
							</span>
							</div>
						</span>
					)}
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		isLoading:state.ui.isLoading,
		initialColors:state.data.initialColors,
		selectedColors:state.data.selectedColors,
		randomColors:state.data.randomColors
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetKey: (key, value) => dispatch(setKey(key, value)),
		onSetData: (key, value) => dispatch(setData(key, value))
	}
} 

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExploreScreen);