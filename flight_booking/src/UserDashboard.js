import React, {Component, useState} from 'react';
import { getUser, getUserEmail } from './Common';
import {NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css'; 

class UserDashboard extends Component{

    constructor(props){
        super(props) 
        this.state = {
        showing: false,
        isError: false,
        setSourceCity:'',
        setDestCity:'',
        setDate:'',
        flightList:[],
        passengername:'',
        age:'',
        govtId:'',
        ticketBookData:{},
        pnrGenerate:''
        }
    }
    
    user = getUser();
    userEmail = getUserEmail();
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
    
    handleSourceCityChange = (e) => {
      this.setSourceCity=e.target.value;
    }
    
    handleDestCityChange = (e) => {
      this.setDestCity=e.target.value;
    }
    
    handleDate=(e)=>{
      this.setDate=e.target.value;
    }

    bookFlight=(e)=>{
      console.log(e);
      this.ticketBookData=e;
      this.setState({showing: true })
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
              <td><button onClick ={(e)=>this.bookFlight(flight)}>Book</button></td>
            </tr>
          )
        })
      }

      
    currentDateHandle = ()=>{
      //Date format : "2021-12-13"
      var month = new Date().getMonth()+1
      return new Date().getFullYear()+'-'+month+'-'+new Date().getDate();
    }

    searchFlight = ()=>{
        this.setState({ isLoading: true })
        console.log(this.setSourceCity);
        console.log(this.setDestCity);
        console.log(this.setDate);
        console.log(this.user);
        if(this.user===null){
          alert("Kindly Login with User ID");
        }
        else if(this.setDate===undefined || this.setDestCity===undefined || this.setSourceCity===undefined){
          alert("Kindly choose Source City, Destination City & Date")
          this.setState({showing: false }) 
        }
        else if(this.setSourceCity===this.setDestCity){
          alert("Source City & Destination City are same")
          this.setState({showing: false }) 
        }
        else{
          axios.get('http://localhost:7071/flight/airline/search',{ params:{source:this.setSourceCity, destination:this.setDestCity, date:this.setDate}})
          .then(response => {       
                const flightList =  response.data;
               if(flightList.length===0){
                 alert("Sorry, There are no any running flight for this locations.....")
               }    
                console.log(flightList);
                this.setState({flightList , isLoading: false, showing: false })    
            
        }).catch(error => {
          
        });
        }
         
    }

    handlePassengername=(e)=>{
      this.passengername=e.target.value;
    }

    handleAge=(e)=>{
      this.age=e.target.value;
    }

    handleGovtId=(e)=>{
      this.govtId=e.target.value;
    } 
    
    handleBookTicket= ()=>{
      console.log(this.passengername)
      console.log(this.age)
      console.log(this.govtId)
      console.log(this.ticketBookData)
      console.log(this.ticketBookData.airlineName)
      this.pnrGenerate="PNR"+(new Date).getUTCMilliseconds()+(new Date).getUTCMinutes()+(new Date).getUTCHours();
      console.log(this.pnrGenerate);
      if(this.passengername!==undefined || this.age!==undefined || this.govtId!==undefined){
        this.setState({showing: false })
        axios.post('http://localhost:7072/flight/booking/ticket',{
        passengername:this.passengername,
        age:this.age,
        govtId:this.govtId,
        airlineName:this.ticketBookData.airlineName,
        flightNumber:this.ticketBookData.flightNumber,
        source:this.ticketBookData.source,
        destination:this.ticketBookData.destination,
        departureTime:this.ticketBookData.departureTime,
        arrivalTime:this.ticketBookData.arrivalTime,
        ticketPrice:this.ticketBookData.ticketPrice,
        duration:this.ticketBookData.duration,
        flightDate:this.ticketBookData.flightDate,
        pnrNo:this.pnrGenerate,
        status:'1',
        email:this.userEmail
      })
      .then(response => {             
            console.log(response);
            if(response.status===200){                
                alert('Ticket Booked Successfully & PNR No. : '+this.pnrGenerate)
             }       
    }).catch(error => {
      
    });
  }
  else alert("Kindly fill all the field...");
  }

    render(){
        const { flightList, showing, isError } = this.state
        return(

            <div>                  
                <div className="header">
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/bookinghistory">Search By PNR</NavLink>
                    <NavLink activeClassName="active" to="/bookinghistory">Booked History</NavLink>
                    <NavLink activeClassName="active" to="/">Logout</NavLink>
                </div>
                    Welcome! {this.user} ({this.userEmail})<br/><br/><br/>
                    
                <label for="city">Source City :</label>&nbsp;
                <select onChange={this.handleSourceCityChange}> 
                    <option value="">Select the Source City</option>              
                    {this.cityList.map((city) => <option value={city.value}>{city.label}</option>)}
                </select> &nbsp;&nbsp;&nbsp;
        
                <label for="city">Destination City :</label>&nbsp;
                <select onChange={this.handleDestCityChange}>  
                    <option value="">Select the Destination City</option>        
                    {this.cityList.map((city) => <option value={city.value}>{city.label}</option>)}
                </select> &nbsp;&nbsp;&nbsp;
                <input type="date" id="date" name="date" min={this.currentDateHandle()} onChange={this.handleDate} />&nbsp;&nbsp;&nbsp;
                <input className="search" type="button" onClick={this.searchFlight} value="Search" />
              <br></br> <br></br>
                <div>
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
                </div>
                <br></br>
            
                { showing 
                    ? <div>
                      <form>
                    {/* Labels and inputs for form data */}
                    <label className="label">Passenger Name</label>
                    <input onChange={this.handlePassengername} className="input"
                    value={this.passengername} type="text" />
                
                    <label className="label">Age</label>
                    <input onChange={this.handleAge} className="input"
                    value={this.age} type="text" />
                
                    <label className="label">Govt. Id</label>
                    <input onChange={this.handleGovtId} className="input"
                    value={this.govtId} type="text" />
                    <br></br>
                    <input className="search" type="button" onClick={this.handleBookTicket} value="Book Ticket" />
                  </form>
                  </div>
                    : null
                }
            
        </div>
        )
    
    }

}

export default UserDashboard;