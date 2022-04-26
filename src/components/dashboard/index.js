import React, { useEffect } from 'react'
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Row, Col } from 'react-bootstrap';
import LineChart from '../charts/lineChart';
import BarChart from '../charts/barChart';
import DoughnutChart from '../charts/doughnutChart';

import { connect } from "react-redux";
import { 
	getScFiled, 
	getScCategorised, 
	getScProgress, 
	getScPending, 
	getScResolved, 
	getScClosed
} from "../../redux/actions/servicecallActions";

const useStyles = makeStyles((theme)=>({
    filed: {
      //color: theme.palette.secondary.dark,
      color: 'rgba(51, 51, 51, 1)',
      borderColor: '#333333',
      width:'140px',
      height:'90px',
    },
    categorised: {
       // color: theme.palette.warning.dark, 
        color: 'rgba(255 ,193 ,7, 1)',
        borderColor: '#333333',
        width:'140px',
        height:'90px',
      },
    progress: {
        //color: theme.palette.primary.light, 
        color: 'rgba(0, 123 ,255, 1)',
        borderColor: '#333333',
        width:'140px',
        height:'90px',
      },
    pending: {
       // color: theme.palette.error.main, 
        color: 'rgba(220 ,53 ,69, 1)',
        borderColor: '#333333',
        width:'140px',
        height:'90px',
      },
    resolved: {
        //color: theme.palette.info.dark, 
        color: 'rgba(23 ,162 ,184, 1)',
        borderColor: '#333333',
        width:'140px',
        height:'90px',
      },
    closed: {
        //color: theme.palette.success.dark, 
        color: 'rgba(40 ,167 ,69, 1)',
        borderColor: '#333333',
       // fontSize: 18,
        width:'140px',
        height:'90px',
      }
    
  }));

const Dashboard = props => {
    const classes = useStyles();

	const { 
		scFiledCount,
		scCategorisedCount,
		scProgressCount,
		scPendingCount,
		scResolvedCount,
		scClosedCount,
		getScFiled,
		getScCategorised,
		getScProgress,
		getScPending,
		getScResolved,
		getScClosed
	 } = props;
  

	 useEffect(()=>{
			getScFiled();	
			getScCategorised();
			getScProgress();	
			getScPending();	
			getScResolved();
			getScClosed();
	},[])


	return (
            <Container className="pageContainer" >
                <Row className='pageHeading'>
                    <Col>
                        <Card body inverse className={classes.filed} >
                            <Card.Title  className="cardTitle">Filed</Card.Title>
                            <Card.Title className="cardContent">{scFiledCount}</Card.Title>
                        </Card>
                    </Col>
                    <Col>
                        <Card body inverse  className={classes.categorised}>
                            <Card.Title className="cardTitle">Categorized</Card.Title>
                            <Card.Title className="cardContent">{scCategorisedCount}</Card.Title>
                        </Card>
                    </Col>
                    <Col>
                        <Card body inverse color="primary" className={classes.progress}>
                            <Card.Title className="cardTitle">In Progress</Card.Title>
                            <Card.Title className="cardContent">{scProgressCount}</Card.Title>
                        </Card>
                    </Col>
                    <Col>
                        <Card body inverse className={classes.pending}>
                            <Card.Title className="cardTitle">Pending</Card.Title>
                            <Card.Title className="cardContent">{scPendingCount}</Card.Title>
                        </Card>
                    </Col>
                    <Col>
                        <Card body inverse color="info" className={classes.resolved}>
                            <Card.Title className="cardTitle">Resolved</Card.Title>
                            <Card.Title className="cardContent">{scResolvedCount}</Card.Title>
                        </Card>
                    </Col>
                    <Col>
                        <Card body inverse color="success" className={classes.closed}>
                            <Card.Title className="cardTitle">Closed</Card.Title>
                            <Card.Title className="cardContent">{scClosedCount}</Card.Title>
                        </Card>
                    </Col>
                </Row>

                <div style={{ 'display': 'flex'}}>

                        <div className="chart">
                            <LineChart
                                Filed={scFiledCount} 
                                Categorized={scCategorisedCount}
                                InProgress={scProgressCount}
                                Pending={scPendingCount}
                                Resolved={scResolvedCount}
                                Closed={scClosedCount} 
                            />
                        </div>

                        <div className="chart">
                            <BarChart 
                                Filed={scFiledCount} 
                                Categorized={scCategorisedCount}
                                InProgress={scProgressCount}
                                Pending={scPendingCount}
                                Resolved={scResolvedCount}
                                Closed={scClosedCount}
                            />
                        </div>
                </div>
                <div  style={{ justifyContent:'center', alignItems: 'center', display: 'flex'}}>
                    <div className="chart" >
                        <DoughnutChart 
                            Filed={scFiledCount} 
                            Categorized={scCategorisedCount}
                            InProgress={scProgressCount}
                            Pending={scPendingCount}
                            Resolved={scResolvedCount}
                            Closed={scClosedCount}
                        />
                    </div>
                </div>
            </Container>

		);
};

const mapStateToProps = (state) => ({
	scFiledCount: state.servicecallReducer.scFiledCount,
	scCategorisedCount: state.servicecallReducer.scCategorisedCount,
	scProgressCount: state.servicecallReducer.scProgressCount,
	scPendingCount: state.servicecallReducer.scPendingCount,
	scResolvedCount: state.servicecallReducer.scResolvedCount,
	scClosedCount: state.servicecallReducer.scClosedCount
});

export default connect(mapStateToProps, { 
	getScFiled,
	getScCategorised,
	getScProgress,
	getScPending,
	getScResolved,
	getScClosed
	  })(Dashboard);