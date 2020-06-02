import React, {Component} from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card}  from 'react-bootstrap';
import {Link }  from 'react-router-dom';

class EditProduct extends Component{
	constructor(props){
		super(props);
		this.state={
			key:'',
			name:'',
			description:'',
			url:'',
			image:''
		}
	}
	componentDidMount(){
	const ref = firebase.firestore().collection('Products').doc(this.props.match.params.id);
	ref.get().then((doc)=>{
		if(doc.exists){
			const documents = doc.data();
			this.setState({
			name:documents.name,
			description:documents.description,
			url:documents.url,
			key:doc.id,
			isLoading:false
		});
		}
		else{
			console.log("NO such file or directory");
		}
	})
}
handleChange = (e) =>{
	if(e.target.files[0]){
		this.setState({
			image:e.target.files[0]
		})
	}
}
handleUpload = () =>{
	const {image,url} = this.state;
	var deserRef = firebase.storage().refFromURL(url);

	const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image)
	uploadTask.on('state_changed',(snapshot)=>{console.log('snapshot')},
		(error) =>{console.log(error);},
		()=>{firebase.storage().ref('images').child(image.name).getDownloadURL().then(url=>this.setState({url}))})

	deserRef.delete().then(function(){
		console.log("file deleted");
	}).catch(function(error){
		console.log("error while deleting the file");
	});
}
onChange = (e) =>{
 
 const state = this.state;
 state[e.target.name]=e.target.value;
 this.setState({
 	documents:state
 });
}
onSubmit = (e) =>{
	e.preventDefault();
	const {name,description,url}= this.state;
	const updateRef = firebase.firestore().collection('Products').doc(this.state.key);
	console.log("hey",name);
	updateRef.set({
		name,
		description,
		url
	}).then((docRef) =>{
		this.setState({
			key:'',
			name:'',
			description:'',
			url:''
		});
		this.props.history.push("/show/"+this.props.match.params.id)
	})
	.catch((error)=>{
		console.log("Error Editing the documents",error);
	})
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
			 	<img src={this.state.url} height="200" width="200" />
			 	</div>
			 	<div class="upload-btn-wrapper">
			 	<input type="file" name="myfile" className="file" onChange={this.handleChange}/>

			 	</div>
			 	<div className="Buttons">
			 	<button className="submit-button" onClick={this.handleUpload}>Upload Image</button>
	
			 	</div>
			 	<div class="container">
			 	<div class="panel panel-default">
			 	
			 	
			 	<div class="panel-body">
				<form onSubmit={this.onSubmit}>
<div>
			 	<div class="form-group"></div>
			 	<label for="name">Product Name:</label>
			 	<input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Enter Name" />
			 	</div>
			 	<div>
			 	<div class="form-group"></div>
			 	<label for="description">Product Description:</label>
			 	<textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3" >{this.state.description}</textArea>
			 	</div>
			 	<button type="submit" class="btn btn-success">Submit</button>
	
				</form>	

				</div>
			 	</div>
			</div>
			    
			 	
			 	
			</Card>
			</div>

			);
	}
}
export default EditProduct;