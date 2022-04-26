import React from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from  'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    if(rest.tokenExpire){
        localStorage.removeItem('token')
    }

    return (
        <Route 
            {...rest}
            component={(props)=>{
               
                const token = window.localStorage.getItem('token');
                if(token){
                    return <Component {...props} />
                }
                else{
                    return <Redirect path='/admin/dashboard' />
                }
            }}
        />
    )
}

const mapStateToProps = (state) => ({
    tokenExpire: state.userReducer.tokenExpire
})

export default connect(mapStateToProps)(PrivateRoute);


// function PrivateRoute({ component, ...rest }) {
//     if(rest.tokenExpire){
//         localStorage.removeItem('token')
//     }
//         return (
//             <Route
//                 {...rest}
//                 render={({ location }) =>
//                     localStorage.getItem('token') && rest.tokenExpire !== true ? (
//                         component ? (
//                             component
//                         ) : (
//                             <Redirect to='/admin/dashboard' />
//                         )
//                     ) : (
//                         <Redirect
//                             to={{
//                                 pathname: '/',
//                                 state: { from: location }
//                             }}
//                         />
//                     )
//                 }
//             />
//         );
//     }
    
//     const mapStateToProps = (state) => ({
//         tokenExpire : state.userReducer.tokenExpire
//     });
    
//   export default connect(mapStateToProps)(PrivateRoute);