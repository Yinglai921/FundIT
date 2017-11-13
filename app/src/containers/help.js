import React, { Component } from 'react';

export default class Help extends Component{

    
    SearchGuide(){
        return(
            <div className="row" id="searchGuide">                   
                <div className="col-sm-6 border-right">
                    <h4> Search any of these words </h4>
                    <p>
                        {/* You could use OR to connect words. <br /> */}
                        <span className="label label-info">Search</span> Find topics that contain "information technology" or "security" or "data".
                    </p>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" value="e.g. information technology OR security OR data" disabled/>
                        </div>
                    </form>
                    <p>
                        <span className="label label-default">Tips</span> You can concat as many words as you want.
                    </p>
                </div>
                <div className="col-sm-6">
                    <h4> Search without these unwanted words </h4>
                    <p>
                        {/* You could use NOT to exclude the words. <br /> */}
                        <span className="label label-info">Search</span> Find topic titles that contain "information", but excludes
                        "space", "business" and "commercial".
                    </p>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" value='e.g. information NOT space business commercial' disabled/>
                        </div>
                    </form>
                    <p> 
                        <span className="label label-danger">Warning</span> Please add NOT at the end of the query. If you write "information NOT chemistry OR security"
                        it will be interpreted as to exclude the words "chemistry", "OR" and "security".
                    </p>
                </div>
            </div>  
        )
    }

    
    
    render(){
        return(
            <div className="container-fluid">
                <div className="row top-margin">
                    <h3> Search guideline</h3>  
                </div>
                {this.SearchGuide()}
            </div>
        )
    }
}