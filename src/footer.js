import React from 'react';
import ReactDOM from 'react-dom';


function Facebook(props){
    return (
        <span>
        <a style= {{padding : "5px"}} id="facebook" aria-controls="facebook" role="button"  aria-label="facebook page" href="https://facebook.com">
        <i className="fab fa-facebook-f fa-2x"></i>
        </a>
        </span>
        )
    }

function Twitter(props){
    return (
        <span>
        <a style= {{padding : "5px"}} id="twitter" aria-controls="twitter" role="button" aria-label="twitter handle" href="https://twitter.com">
        <i className="fab fa-twitter  fa-2x" ></i>
        </a>
        </span>
        )
    }

function Youtube(props){
        return (
            <span>
            <a style= {{padding : "5px"}} id="youtube" aria-controls="youtube" role="button" aria-label="youtube channel" href="https://youtube.com">
            <i className="fab fa-youtube  fa-2x"></i>
            </a>
            </span>  
            )
        }


function Footer(props){
    return (
        <footer id= "footer" className="footer mt-2">
        <div className="row">
          <div className="col-sm-6">
            <span>© COPYRIGHT {(new Date().getFullYear())} ALL RIGHTS RESERVED.</span>
          </div>
          <div className="col-sm-6">
             <Facebook/>
             <Twitter/>
             <Youtube/>
          </div>   
        </div>
        </footer>
    )
}

export { Footer };