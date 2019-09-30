import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};

	static propTypes = {
		match: PropTypes.object
	};

	componentDidMount() {
		const { params } = this.props.match;

		//First reinstate our localStorage
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: "fishes"
		});
	}

	componentDidUpdate() {
		localStorage.setItem(
			this.props.match.params.storeId,
			JSON.stringify(this.state.order)
		);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish = fish => {
		const fishes = { ...this.state.fishes };
		fishes[`fish${Date.now()}`] = fish;
		this.setState({
			fishes: fishes
		});
	};

	updateFish = (key, updatedFish) => {
		//1. Take copy of current fish state
		const fishes = { ...this.state.fishes };
		//2. Update that state
		fishes[key] = updatedFish;
		//3. Set that to state
		this.setState({ fishes });
	};

	deleteFish = key => {
		//1. Take copy of state
		const fishes = { ...this.state.fishes };
		//2. Update the state
		fishes[key] = null; //For Firebase' sake
		//3. Update state
		this.setState({ fishes });
	};

	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = key => {
		//1. Take a copy of state
		const order = { ...this.state.order };
		//2. Either add to order, or update order if it exists
		order[key] = order[key] + 1 || 1;
		//3. call setState to update state object
		this.setState({ order });
	};

	removeFromOrder = key => {
		//1. Take a copy of state
		const order = { ...this.state.order };
		//2. Remove that item from order
		delete order[key];
		//3. call setState to update state object
		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish
								key={key}
								index={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						))}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
