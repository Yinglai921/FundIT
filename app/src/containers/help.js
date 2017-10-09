import React, { Component } from 'react';

export default class Help extends Component{

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <h3> Simple search queries </h3>
                </div>
                
                <div className="row">                   
                    <div className="col-sm-6 border-right">
                        <h4> Search one word in multiple scopes </h4>
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
                        <h4> Search words with OR logic</h4>
                        <p>
                            The words are connected with OR by default, and you will get topics that fulfill at least one of the word. <br />
                            For example:
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
                                <input type="text" className="form-control" value="hospital OR ICT OR smart OR cities" />
                            </div>
                        </form>
                        <p>
                        Assume that you've selected "In title", the whole search query means: "To find topics that contain hospital or ICT or smart or
                        cities in their titles".
                        </p>
                    </div>
                </div>

                <div className="row top-margin">                   
                    <div className="col-sm-6 border-right">
                        <h4> Search words with AND logic </h4>
                        <p>
                            If you want the topics contain more than one word, you could use AND to connect the words. <br />
                            For example:
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value="data AND security" />
                            </div>
                        </form>
                        <p>
                            If you've selected "in title", then all the topics' titles must contain data and security.
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <h4> Search a phrase</h4>
                        <p>
                            For example, if you want to search natural language processing, please make sure to quote it.
                            Do: "natural language processing".
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value='"natural language processing"' />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row top-margin">                   
                    <div className="col-sm-6 border-right">
                        <h4> Wildcard</h4>
                        <p>
                            For example, if you want to search image and imaging, you can simply search imag*
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" value="imag*" />
                            </div>
                        </form>
                        <p>
                           This search will return all the topics that include the words start with imag.
                        </p>
                    </div>
                    <div className="col-sm-6">
                        <h4> Advanced search</h4>
                        <p>
                            If you feel these queries are not enough for your needs, you can check our user guides
                            to read how to form the advanced search queries. You can also contact the developer for
                            more support.
                        </p>
                        <button className="btn btn-default"> User guides </button>
                    </div>
                </div>
                
            </div>
        )
    }
}