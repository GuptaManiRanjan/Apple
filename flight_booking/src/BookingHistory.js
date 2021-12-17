import React, {Component, useState} from 'react';
import { getUser, getUserEmail } from './Common';
import {NavLink } from 'react-router-dom';
import axios from 'axios';
import './App.css'; 

class BookingHistory extends Component{

    user = getUser();
    userEmail = getUserEmail();
    constructor(props){
        super(props) 
        this.bookedHistory();
        this.state = {        
            bookList:[],
            isLoading: false,
            showing: false,
            airlineName:'',
            flightNumber:'',
            airlineName:'',
            passengername:'',
            age:'',
            departureTime:'',
            arrivalTime:'',
            source:'',
            destination:'',
            flightDate:'',
            pnrNo:'',
            ticketPrice:'',
            pnrValue:''     
        }        
    }
    printFlight=(e)=>{
        console.log(e.passengername);
        console.log(e.bookingId);
        console.log(e.flightNumber);            
            this.setState({
                showing: true,
                airlineName:e.airlineName,
                flightNumber:e.flightNumber,
                passengername:e.passengername,
                age:e.age,
                departureTime:e.departureTime,
                arrivalTime:e.arrivalTime,
                source:e.source,
                destination:e.destination,
                flightDate:e.flightDate,
                pnrNo:e.pnrNo,
                ticketPrice:e.ticketPrice  })          
    }

    renderTableHeader = () => {
        console.log(this.state.bookList);
        return Object.keys(this.state.bookList[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
      }    

    renderTableRows = () => {
        return this.state.bookList.map(flight => {
          return (
            <tr key={flight.bookingId}>
              <td>{flight.bookingId}</td>
              <td>{flight.airlineName}</td>
              <td>{flight.flightNumber}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.ticketPrice}</td>
              <td>{flight.duration}</td>
              <td>{flight.flightDate}</td>
              <td>{flight.pnrNo}</td>
              <td>{flight.status}</td>
              <td>{flight.email}</td>
              <td>{flight.passengername}</td>
              <td>{flight.age}</td>              
              <td>{flight.govtId}</td>              
              <td><button onClick ={(e)=>this.printFlight(flight)}>Print</button></td>
              <td><button onClick ={(e)=>this.cancelFlight(flight)}>Cancel</button></td>
            </tr>
          )
        })
      }

      cancelFlight=(e)=>{
        console.log(e.bookingId);
        var result = window.confirm("Want to cancel?");
        if(result){
        axios.delete('http://localhost:7072/flight/ticket/delete/'+e.bookingId).then(response => {
            console.log(response);
            alert("Ticket Cancel Succefully ...."); 
            this.bookedHistory();
          }).catch(error => {          
          });
          
        }
          
      }
    
    bookedHistory()  {
        this.setState({ isLoading: true })
        axios.get('http://localhost:7072/flight/ticket/list/'+this.userEmail).then(response => {            
            if (response.status===200) {
                var bookList = response.data
                this.setState({ bookList, isLoading: false })
                console.log(this.state.bookList.length); 
                if(this.state.bookList.length===0){
                this.setState({ isLoading: false })
                alert("No Booked History to view...");
                }
              }  
          }).catch(error => {          
          }); 
      }       
      searchByPNR=(e)=>{
        this.pnrValue=e.target.value;
      }
      handleSearchByPNR=(e)=>{
        console.log(this.pnrValue);
        var temp=[];
        this.setState({ isLoading: true })
        axios.get('http://localhost:7072/flight/ticket/view/'+this.pnrValue).then(response => { 
            console.log(response.data);
            if (response.status===200) {
                temp.push(response.data);
                var bookList = temp;
                this.setState({ bookList, isLoading: false })
                console.log(this.state.bookList.length); 
              }  
          }).catch(error => {          
          }); 
      }

    render(){
        const { bookList, showing,flightNumber,airlineName,passengername,age,departureTime,arrivalTime,source,destination,flightDate,pnrNo,ticketPrice} = this.state
        return(
        <div class="print-parent">
                <ul>
                <li>
                <div className="header">
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/dashboard">Search Flight</NavLink>
                    <NavLink activeClassName="active" to="/dashboard">User Home</NavLink>
                    <NavLink activeClassName="active" to="/bookinghistory" onClick={this.bookedHistory.bind(this)}>Booked History</NavLink>
                    <NavLink activeClassName="active" to="/">Logout</NavLink>                    
                </div>
                </li>
                <li>
                    <div>
                        <input onChange={this.searchByPNR} className="input"value={this.pnrValue} type="text" />
                        <input className="search" type="button" onClick={this.handleSearchByPNR} value="Search By PNR" />
                    </div>
                </li>
                </ul>
                    Welcome! {this.user} ({this.userEmail})<br/><br/><br/>
                    <div>
                <table>
                    <thead>
                        <tr>                          
                        {bookList.length>0 && this.renderTableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {bookList.length>0 && this.renderTableRows()}
                    </tbody>
                </table>
                </div>
<br></br>
                { showing 
                    ? <div class="print-me">
                      <table >
                            <tr><td><b>FLIGHT BOOKING APPLICATION</b></td><td><b>TICKET</b></td></tr>
                            <tr>
                                <td>Flight Number</td><td>{flightNumber}</td>
                            </tr>
                            <tr>
                                <td>Airline Name</td><td>{airlineName}</td>
                            </tr>
                            <tr>
                                <td>Age</td><td>{age}</td>
                            </tr>
                            <tr>
                                <td>Departure Time</td><td>{departureTime}</td>
                            </tr>
                            <tr>
                                <td>Arrival Time</td><td>{arrivalTime}</td>
                            </tr>
                            <tr>
                                <td>Source</td><td>{source}</td>
                            </tr>
                            <tr>
                                <td>Destination</td><td>{destination}</td>
                            </tr>
                            <tr>
                                <td>Flight Date</td><td>{flightDate}</td>
                            </tr>
                            <tr>
                                <td>Pnr No</td><td>{pnrNo}</td>
                            </tr>
                            <tr>
                                <td>Ticket Price</td><td>{ticketPrice}</td>
                            </tr>   
                            <button onClick={() => window.print()}>PRINT</button>                         
                        </table>
                        
                  </div>
                    : null
                }
        </div>
        )
    }

}

export default BookingHistory;