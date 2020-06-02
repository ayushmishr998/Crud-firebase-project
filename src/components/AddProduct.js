import React, {Component} from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card}  from 'react-bootstrap';
import {Link }  from 'react-router-dom';

class AddProduct extends  Component{
	constructor(props){
		super(props);
		this.ref=firebase.firestore().collection('Products');
		this.state = {
			name:'',
			description:'',
			url:'',
			image:''
		}
	}
onChange = (e) =>{
 
 const state = this.state;
 state[e.target.name]=e.target.value;
 this.setState({
 	state
 });
}
handleChange = (e) =>{
	if(e.target.files[0]){
		this.setState({
			image:e.target.files[0]
		})
	}
	console.log(e.target.files[0]);
}
handleUpload = () =>{
	const {image} = this.state;
	const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image)
	uploadTask.on('state_changed',(snapshot)=>{console.log('snapshot')},
		(error) =>{console.log(error);},
		()=>{firebase.storage().ref('images').child(image.name).getDownloadURL().then(url=>this.setState({url}))})
}
onSubmit = (e) =>{
	e.preventDefault();
	const {name,description}= this.state;
	console.log("hey",name);
	this.ref.add({
		name,
		description,
		url:this.state.url
	}).then((docRef) =>{
		this.setState({
			name:'',
			description:'',
			url:''
		});
		this.props.history.push("/")
	})
	.catch((error)=>{
		console.log("Error adding documents",error);
	})
}

	render(){
const {name,description}= this.state;
const CardStyles ={
  width:'auto',
  height:'auto',
  backgroundColor:'white',
  margin:'auto',
  display:'block',
  marginTop:'60px',
  opacity:0.5,
  paddingTop:'10px',
  paddingLeft:'20px', 
  paddingRight:'20px',
  paddingBottom:'10px',
  borderStyle:'outset',
  borderLeft:'50px solid black',
  borderRadius:'20px',

}

		return(	
			<div>
			<Card style={CardStyles}>
				<div className="Buttons">
			      	<Link to="/">
			      		<button class="Edit-button" >Show product</button>
			      	</Link>
			 	</div>
			 <div>
	<div>
			 	<div class="form-group"></div>
			 	<label for="name">Product Name:</label>
			 	<input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Enter Name" />
			 	</div>
			 	<div>
			 	<div class="form-group"></div>
			 	<label for="description">Product Description:</label>
			 	<textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3" >{description}</textArea>
			 	</div>
			</div>
			 	<div class="upload-btn-wrapper">
			 	<input type="file" name="myfile" className="file" onChange={this.handleChange}/>

			 	</div>
			 	<div class="upload-data">
			 	<img src={this.state.url} height="200" width="200" />
			 	</div>
			 	<div className="Buttons">
			 	<button className="submit-button" onClick={this.handleUpload}>Upload Image</button>
			 	<button class="submite-button" onClick={this.onSubmit}>Save All</button>	
	
			 	</div>
			    
			      
			</Card>
			</div>

			);
	}
}
export default AddProduct;