import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props); 
    this.state={
      hasError: false
    };
  } 

  static getDerivedStateFromError(error) {
    return {
      hasError:true
    };
  } 

  componentDidCatch(error, info){
    console.error("Error caught by ErrorBoundary:", error, info);
  } 

  render(){
    if(this.state.hasError){
      return <h1>Something went wrong. Please check the console.</h1>;
    }
    return this.props.children;
  }
}

const root=ReactDOM.createRoot(document.getElementById("root")); 
root.render(<ErrorBoundary><App/></ErrorBoundary>);