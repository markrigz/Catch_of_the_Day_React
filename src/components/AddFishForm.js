import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
	static propTypes = { addFish: PropTypes.func };

	createFish = event => {
		event.preventDefault();

		const fish = {
			name: this.refs.nameRef.value,
			price: parseFloat(this.refs.priceRef.value),
			status: this.refs.statusRef.value,
			desc: this.refs.descRef.value,
			image: this.refs.imageRef.value
		};
		this.props.addFish(fish);

		//Refresh the form
		event.currentTarget.reset();
	};

	render() {
		return (
			<form className="fish-edit" onSubmit={this.createFish}>
				<input name="name" ref="nameRef" type="text" placeholder="Name" />
				<input name="price" ref="priceRef" type="text" placeholder="Price" />
				<select name="status" ref="statusRef">
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name="desc" ref="descRef" placeholder="Desc" />
				<input name="image" ref="imageRef" type="text" placeholder="Image" />
				<button type="submit">+ Add Fish</button>
			</form>
		);
	}
}

export default AddFishForm;
