import React, { Component } from 'react';

export default class Help extends Component{

    render(){
        return(
            <div className="container-fluid">
                <div className="row top-margin">
                    <h3> Search guideline</h3>  
                </div>
                
                {/* <div className="row top-margin">                   
                    <div className="col-sm-6 border-right">
                        <h4> Simple search </h4>
                        <p>
                            The simple search is to search one word. <br />
                            <span className="label label-info">Search</span> Find topics that "information" appears 
                            in titles or keywords.
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value="e.g. information" disabled/>
                            </div>
                        </form>
                        <p>
                            You could search "information" and check "In title" and "In keywords".
                            If you want to know more information about the pre-defined terms in H2020 like topic, call, keyword, tag, please click <a href="#"> About H2020</a> 
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <h4> Boolean search (AND)</h4>
                        <p>
                            The words are connected with AND by default, and you will get topics that include all of the words. <br />
                            <span className="label label-info">Search</span> Find topics that the titles contain "ICT" and "smart cities".
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value="e.g. ICT smart cities" disabled/>
                            </div>
                        </form>
                        <p>
                            <span className="label label-danger">Warning</span> Please do not use AND to connect the words, it will not be recognised.
                        </p>
                    </div>
                </div> */}

                <div className="row">                   
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
            </div>
        )
    }
}