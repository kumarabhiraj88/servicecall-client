import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useFetching = async action => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(action());
	}, [dispatch, action]);
};


//************************NOTES**********************

//No dependency passed:
// useEffect(() => {
// 	//Runs on every render
//   });


//An empty array:
// useEffect(() => {
// 	//Runs only on the first render
//   }, []);

//Props or state values:
// useEffect(() => {
// 	//Runs on the first render
// 	//And any time any dependency value changes
//   }, [prop, state]);


//useDispatch
//This hook returns a reference to the dispatch function from the Redux store. 
//You may use it to dispatch actions as needed.

//************************NOTES**********************