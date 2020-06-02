import React, {Component} from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card}  from 'react-bootstrap';
import {Link }  from 'react-router-dom';

class ShowProduct extends Component{
	constructor(props){
		super(props);
		this.state={
			product:[],
			key:''
		}
	}
componentDidMount(){
	const ref = firebase.firestore().collection('Products').doc(this.props.match.params.id);
	ref.get().then((doc)=>{
		if(doc.exists){
			this.setState({
				product:doc.data(),
			key:doc.id,
			isLoading:false
		});
		}
		else{
			console.log("NO such file or directory");
		}
	})
}
delete(id){
	var deserRef = firebase.storage().refFromURL(this.state.product.url);
	firebase.firestore().collection('Products').doc(id).delete().then(()=>{
		console.log("document is successfully deleted");
		this.props.history.push("/");
	}).catch((error)=>{
		console.log("Error is",error);
	});
	deserRef.delete().then(function(){
		console.log("file deleted");
	}).catch(function(error){
		console.log("error while deleting the file");
	});
}
	render(){
		const CardStyles ={
  width:'40rem',
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
			 	<div class="upload-btn-wrapper">
			 	<img src={this.state.product.url} height="200" width="200" />
			 	</div>
			 	<div class="container">
			 	<div class="panel panel-default">
			 	<h3 class="panel-title">{this.state.product.name}</h3>
			 	</div>
			 	<div class="panel-body">
					<dl>
					<dt>Description</dt>
					<dd>{this.state.product.description}</dd>

					</dl>
					<Link to={`/edit/${this.state.key}`} class="btn  btn-success">Edit</Link>
					<button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
			 	</div>
			 	</div>
			

			</Card>

			</div>
			);
	}
}
export default ShowProduct;