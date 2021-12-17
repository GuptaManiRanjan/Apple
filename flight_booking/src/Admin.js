import React, {Component, useState} from 'react';
import {NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css'; 

class Admin extends Component {

     
    constructor(props){
        super(props) 
        this.state = {
            showing:true,
            showingflight:false,
            flightList:[],
            airlineName:'',
            flightNumber:'',
            totalSeats:'',
            destination:'',
            departureTime:'',
            arrivalTime:'',
            source:'',
            duration:'',
            flightDate:'',
            ticketPrice:'',
            mealType:''
        }
    }
    cityList = [
        { label: "Delhi", value: "Delhi" },
        { label: "Bengaluru", value: "Bengaluru" },
        { label: "Pune", value: "Pune" },
        { label: "Indore", value: "Indore" },
        { label: "Kolkata", value: "Kolkata" },
        { label: "Mumbai", value: "Mumbai" },
        { label: "Patna", value: "Patna" },
        { label: "Darbhanga", value: "Darbhanga" },
        { label: "Lucknow", value: "Lucknow" },
        { label: "Hyderabad", value: "Hyderabad" }
    ]
    mealList = [
        { label: "VEG", value: "VEG" },
        { label: "Non-VEG", value: "Non-VEG" },
        { label: "NONE", value: "NONE" }
    ]

    handleairlineName = (e) => {
        this.airlineName=e.target.value;
    }
    handleflightNumber = (e) => {
        this.flightNumber=e.target.value;
    }
    handletotalSeats = (e) => {
        this.totalSeats=e.target.value;
    }
    handledestination = (e) => {
        this.destination=e.target.value;
    }
    handledepartureTime = (e) => {
        this.departureTime=e.target.value;
    }
    handlearrivalTime = (e) => {
        this.arrivalTime=e.target.value;
    }
    handlesource = (e) => {
        this.source=e.target.value;
    }
    handleduration = (e) => {
        this.duration=e.target.value;
    }
    handleflightDate = (e) => {
        this.flightDate=e.target.value;
    }
    handleticketPrice = (e) => {
        this.ticketPrice=e.target.value;
    }
    handlemealType = (e) => {
        this.mealType=e.target.value;
    }

    currentDateHandle = ()=>{
      //Date formate : "2021-12-13"
      var month = new Date().getMonth()+1
      return new Date().getFullYear()+'-'+month+'-'+new Date().getDate();
    }

    //ADD NEW FLIGHT IN DATABASE
    handleSubmit = (e) => {       
        //this.setState({showing: false })
        if(this.airlineName===undefined || this.flightNumber===undefined || this.totalSeats===undefined ||
            this.destination===undefined || this.departureTime===undefined || this.arrivalTime===undefined ||
            this.source===undefined || this.duration===undefined || this.flightDate===undefined ||
            this.ticketPrice===undefined || this.mealType===undefined){
            alert("Kindly fill all the fields....")        
          }
          else if(this.destination===this.source){
            alert("Source and Destination city are same....");
          }
          else if(this.totalSeats<1){
            alert("Total Seats are invalid....");
          }
          else{
            this.setState({showing: false})
            axios.post('http://localhost:7071/flight/airline/addFlight',{ 
            airlineName: this.airlineName,
            flightNumber: this.flightNumber,
            totalSeats: this.totalSeats,
            destination: this.destination,
            departureTime: this.departureTime,
            arrivalTime: this.arrivalTime,
            source: this.source,
            duration: this.duration,
            flightDate: this.flightDate,
            ticketPrice: this.ticketPrice,
            mealType: this.mealType,
            status: '1'
        }).then(response => {
          alert(response.data);
          this. getFlightList();
        }).catch(error => {
        if (error.response.status === 401)
            console.log(error.response.data.message);
        else
            console.log("Something went wrong. Please try again later.");
        });
        } 
        
    }

    renderTableHeader = () => {
        return Object.keys(this.state.flightList[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
      }    

    renderTableRows = () => {
        return this.state.flightList.map(flight => {
          return (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.airlineName}</td>
              <td>{flight.flightNumber}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.ticketPrice}</td>
              <td>{flight.totalSeats}</td>
              <td>{flight.mealType}</td>
              <td>{flight.duration}</td>
              <td>{flight.flightDate}</td>
              <td>{flight.status}</td>
              <td><button onClick ={(e)=>this.cancelFlight(flight)}>Cancel</button></td>
              <td><button onClick ={(e)=>this.updateFlight(flight)}>Update</button></td>
            </tr>
          )
        })
      }

      updateFlight=(e)=>{
          alert("Update is under maintenance....");
      }

      cancelFlight=(e)=>{
        var result = window.confirm("Want to cancel?");
        if(result){
          axios.get('http://localhost:7071/flight/airline/deleteFlight', { params: {id: e.id} })
          .then(response => {  
                this. getFlightList();                
                console.log(response);          
        }).catch(error => {
          
        });
        }
        console.log(e.id);       
        
      }

      getFlightList(event) {
        this.setState({showing: false,showingflight:true })
        axios.get('http://localhost:7071/flight/airline/flights')
        .then(response => {       
              const flightList =  response.data;
             if(flightList.length===0){
               alert("Sorry!! error....")
             }    
              this.setState({flightList})    
          
      }).catch(error => {
        
      });
      }

      addAirline(event){
        this.setState({showing: true,showingflight:false })
      }

render(){
    const { showing, showingflight,flightList } = this.state
    return (
        <div>
            <div className="header">
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                <NavLink activeClassName="active" to="/admin" onClick={this.addAirline.bind(this)}>Add Airline</NavLink>
                <NavLink activeClassName="active" to="/admin" onClick={this.getFlightList.bind(this)}>Manage Airline</NavLink>
                <NavLink activeClassName="active" to="/admin" onClick={this.getFlightList.bind(this)}>Cancel Airline</NavLink>
                <NavLink activeClassName="active" to="/admin" onClick={this.getFlightList.bind(this)}>Update Airline</NavLink>
                <NavLink activeClassName="active" to="/">Logout</NavLink>
            </div>
            { showing 
                    ? 
            <form>
                <div class="row">
                    <div class="col-sm-4">
                    <div class="form-group">

          <label className="label">Airline Name</label>
          <input onChange={this.handleairlineName} className="input" value={this.airlineName} placeholder="✈" type="text" required/>   

        </div>
      </div>

      <div class="col-sm-4">
        <div class="form-group">

           <label className="label">Flight Number</label>
           <input onChange={this.handleflightNumber} className="input" value={this.flightNumber} placeholder="0000" type="text" />   

        </div>
      </div>

      <div class="col-sm-4">
        <div class="form-group">

           <label className="label">Total Seats</label>
           <input onChange={this.handletotalSeats} className="input" value={this.totalSeats} placeholder="💺" type="number" />   
        </div>
      </div>
                </div>

    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
           <label className="label">Destination</label>
           <select onChange={this.handledestination}>  
           <option value="">Select the Destination City</option>              
            {this.cityList.map((city) => <option value={city.value}>{city.label}</option>)}
          </select>  
        </div>
      </div>

      <div class="col-sm-4">
        <div class="form-group">
					<label className="label">DepartureTime</label>
                    <input onChange={this.handledepartureTime} className="input" value={this.departureTime} type="time" />   
        </div>
      </div>


      <div class="col-sm-4">
        <div class="form-group">

          <label className="label">ArrivalTime</label>
                    <input onChange={this.handlearrivalTime} className="input" value={this.arrivalTime} type="time" />   

        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">         
          <label className="label">Source</label>
          <select onChange={this.handlesource}>  
            <option value="">Select the Source City</option>              
            {this.cityList.map((city) => <option value={city.value}>{city.label}</option>)}
          </select>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="form-group">

          <label className="label">Duration</label>
                    <input onChange={this.handleduration} className="input" value={this.duration} type="text" />   

        </div>
      </div>

      <div class="col-sm-4">
        <div class="form-group">
         <label className="label">Flight Date</label>
                <input type="date" id="date" name="date" min={this.currentDateHandle()} onChange={this.handleflightDate} />  
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label className="label">Ticket Price</label>
          <input onChange={this.handleticketPrice} className="input" value={this.ticketPrice} placeholder="₹" type="number" />   
        </div>
      </div>

      <div class="col-sm-4">
        <div class="form-group">
          <label className="label">Meal Type</label>
          <select onChange={this.handlemealType}>  
          <option value="">Select the Meal Type</option>             
            {this.mealList.map((city) => <option value={city.value}>{city.label}</option>)}
          </select>        
        </div>
      </div>
    </div>  
    <input className="search" type="button" onClick={this.handleSubmit} value="Submit" />
    </form>   : null
    } 

    { showingflight ?
            <table>
                 <thead>
                        <tr>                          
                        {flightList.length>0 && this.renderTableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {flightList.length>0 && this.renderTableRows()}
                    </tbody>
            </table> 
        :null
    }                

   </div>
  );
 }
}
export default Admin;