import React from 'react';
//import { Button, Input, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Grid, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { makeStyles, fade } from '@material-ui/core/styles';
//import { green } from '@material-ui/core/colors';
//import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme)=>({
	appBar: {
		//backgroundColor: fade(theme.palette.common.white, 0.15)
		//backgroundColor: '#30b8e2',
		backgroundColor: '#0973b9',
	},
	addButton: {
		backgroundColor: theme.palette.success.dark
	}
}));

const PageHeading = props => {
	const classes = useStyles();
	const history = useHistory();
	const { 
			showButton = false, 
			buttonLabel, 
			showSearch = false,
			searchAction,
			heading,
			onClick,
			showBackButton = false,
			backButtonUrl,
			submitButton = false,
		} = props;


	const searchQuery = async (searchTerm) => {
		//if(searchAction) await searchAction(searchTerm); 
	}

	const backToPage = () =>{
		history.push(backButtonUrl);
	}
	return (
		<>	
			<AppBar position="static" className="Pagehead" >
				<Toolbar variant="dense" className={classes.appBar}>
					<Grid
						container
						direction="row"
					>		
							{showBackButton &&
								<Grid item xs={2}>
									<Button color='warning' onClick={backToPage}>
										<ArrowBack />
									</Button>	
								</Grid>
							}

							<Grid item xs={showBackButton ?  8 : 10 }>								
								<Typography variant="h6" color="inherit">
									{heading}
								</Typography>
							</Grid>

							<Grid item xs={2}>
								{showButton && (<Button className={classes.addButton} variant="contained" color="primary" onClick={onClick}> {buttonLabel} </Button>)}
							</Grid>
					</Grid>
				</Toolbar>
			</AppBar>

			{/* <SearchBar
			value={searched}
			onChange={(searchVal) => requestSearch(searchVal,contentFlag)}
			onCancelSearch={() => cancelSearch()}
			/> */}

			</>

		// <Row className='pageHeading' >
		// 	<Col xs='12' md={ showButton && showExport && showSearch ? 5 : (showButton && showExport && !showSearch ? 6 : (showButton && !showExport && showSearch ? 6 : (submitButton && showBackButton && !showExport && !showSearch ? 8 : 10 ) ) )}>
		// 		<h3>{heading}</h3>
		// 	</Col>
		// 	{showBackButton && <Col xs='12' md={2}>
		// 	<Button color='warning' onClick={backToPage}>
		// 				{'Back'}
		// 			</Button>
		// 	</Col>
		// 	}
		// 	{showSearch && (<Col  xs='12' md={3} ><Input onChange={(e) => searchQuery(e.target.value)} placeholder='Search' type='text' /></Col>)}
		// 	{showButton && (<Col  xs='12' md={2} ><Button color='success' onClick={onClick}> {buttonLabel} </Button></Col>)}
		// 	{submitButton && (<Col  xs='12' md={2} ><Button color='success' type='submit'> {buttonLabel} </Button></Col>)}
		// </Row>
		);
};

export default PageHeading;