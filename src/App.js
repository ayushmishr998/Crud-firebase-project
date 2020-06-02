import React, {Component} from 'react';
import './App.css';
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card}  from 'react-bootstrap';
import {Link }  from 'react-router-dom';

class App extends Component{
  constructor(props){
    super(props);
    this.ref=firebase.firestore().collection('Products');//this will refer to our firebase firestore db where we created products table.
    this.unsubscribe = null;
    this.state ={
      products:[],
    }    

  }
  componentDidMount(){
    this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = (querySnapshot) =>{
    const products =[];
    console.log("aayush",querySnapshot);
    querySnapshot.forEach((doc) =>{
      const{name,description,url}= doc.data();
      products.push({
        key:doc.id,
        doc,
        name,
        description,
        url
      });
    });
    this.setState({
      products 
    });
  }
  render(){
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
      <Link to="/create">
      <button class="Add-button" >Add product</button>
      </Link>
      </div>
      <div className="container">
        <div class="panel panel-heading">
          <h3 class="panel heading" >Product Details</h3>
        </div>
      </div>
      <div class="panel-body">
        <table class="table table-stripe">
        <thead>
        <tr>
          <th>Product name</th>
          <th>Description</th>
          <th>Image</th>
           
        </tr>
        </thead>
        <tbody>
          {this.state.products.map(product =>
              <tr>
                <td><Link to={`/show/${product.key}`}>{product.name}</Link></td>
                <td>{product.description}</td>
                <td><img src={product.url} height="200" width="200"></img></td>
              </tr>

            )}
        </tbody>
        </table>
      </div>
      </Card>
      </div>
      );
  }
}
export default App; 