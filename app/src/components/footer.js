import React, { Component } from 'react';
import SkyLight from 'react-skylight';

export default class Footer extends Component {

  constructor(props){
      super(props);
  }
  render() {

    var myBigGreenDialog = {
        backgroundColor: '#fff',
        color: '#000',
        width: '70%',
        height: '600px',
        marginTop: '-300px',
        marginLeft: '-35%',
      };

    return (
        <div className="row">
            <nav className="navbar navbar-default navbar-fixed-bottom">
                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="col-md-5 col-md-offset-2" style={{textAlign: "center"}}>
                            <p>The website is a Beta version, please be so kind and give us feedback! </p>
                        </div>
                        <div className="col-md-4">
                            <a className="btn btn-warning" href="https://goo.gl/forms/fjQ6zwEynPzJBWAF2"> Send Feedback </a>
                        </div>  */}
                            <div className="col-md-6">
                                <ul className="bottom_ul">
                                   <li> 2017 -  FundIT </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="bottom_ul">
                                    <li>
                                        <button className="footerBtn" onClick={() => this.simpleDialog.show()}>About the project</button>
                                        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="About the project">
                                        <p>The funding landscape is becoming increasingly complex involving
                                        different constraints and requirements, both financial and organizational. It
                                        is therefore important that KTH researchers have access to simple and
                                        practical tools that can support them in orienting them among the different
                                        funding opportunities to find the most suitable ones.</p>
                                        
                                        <p>The project is a prototype web-based software,
                                        henceforth called FundIT, for visualizing EU-H2020 funding opportunities
                                        within the Life Science Technology (LST) subject area. FundIT is
                                        based on a design that allows subsequent extension of functionality to
                                        cover funding landscape from other actors and other subject areas. The
                                        intended users are KTH researchers that are eligible to apply for research
                                        funding and the project is done together with KTH ICT-platform.</p>

                                        <p>Aim: Provide FundIT, a web-based software for real-time visualization of
                                        EU-H2020 funding opportunities within the LST subject area for KTH
                                        researchers
                                        Expected effect: FundIT will allow KTH researchers to better understand
                                        the EU-H2020 funding landscape and facilitate them to easily identify
                                        appropriate funding for their research project. This is expected to increase
                                        the number of H2020-applications from KTH researchers within LST. </p>
                                        </SkyLight>
                                    </li>
                                    <li>
                                        <button className="footerBtn" onClick={() => this.simpleDialog2.show()}>Contact us</button>
                                        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog2 = ref} title="Contact us">
                                        Please contact yinglai@kth.se if you have any questions.
                                        </SkyLight>
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
            </nav>
        </div>
    );
  }
}
