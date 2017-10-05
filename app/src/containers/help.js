import React, { Component } from 'react';

export default class Help extends Component{

    render(){
        return(
            <div className="container-fluid">
                <p> Results not found. </p>
                <hr />
                <div className="row">
                    <h3> User guides </h3>
                </div>
                <div className="row">                   
                    <div className="col-sm-6 border-right">
                        <h4> Simple Search </h4>
                        <p>
                            The basic search is to search one word, for example:
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value="bioinformatics" />
                            </div>
                        </form>
                        <p>
                            You can choose to search this word in different scopes. The word should appear in the title of 
                            the topics, the keywords of the topics, the tags of the topics or in the topics' descriptions.
                            To know more about the definition of keywords, tags and other H2020 terms, please click <a href="#"> About H2020</a> 
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <h4> Search topics contain more than one word</h4>
                        <p>
                            The words are connected with AND by default, for example:
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value="hospital ICT smart cities" />
                            </div>
                        </form>
                        <p>
                           This equals:
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value="hospital AND ICT AND smart AND cities" />
                            </div>
                        </form>
                        <p>
                        Assume that you've selected "In title", the whole search query means: "To find topics that contain hospital, ICT, smart and
                        cities in their titles".
                        </p>
                    </div>
                </div>
                
            </div>
        )
    }
}