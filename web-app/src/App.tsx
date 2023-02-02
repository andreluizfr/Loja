import 'assets/css/styles.css';

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import React from 'react';

import GetUser from 'queries/GetUser';

import LoadingPage from 'pages/LoadingPage';


const HomePage = React.lazy(() => import('pages/HomePage'));
const LoginPage = React.lazy(() => import('pages/LoginPage'));
const SignupPage = React.lazy(() => import('pages/SignupPage'));
const SignupNextStepPage = React.lazy(() => import('pages/SignupNextStepPage'));
const EmailVerificationPage = React.lazy(() => import('pages/EmailVerificationPage'));
const NotFoundPage = React.lazy(() => import('pages/NotFoundPage'));
const ProductPage = React.lazy(() => import('pages/ProductPage'));


function App() {

	const getUserQuery = GetUser();

    if(getUserQuery.isFetching)
		return(
			<RouterProvider router={
				createBrowserRouter([
					{
						path: "*",
						element: <LoadingPage/>, 
					}
				])
			}/>
		);
    
    else if(getUserQuery.isError)
		return (
			<RouterProvider router={
				createBrowserRouter([
					{
						path: "*",
						element: <>{JSON.stringify(getUserQuery.error)}</>,
					}
				])
			}/>
		)

    else
		return (
			<React.Suspense fallback={<LoadingPage/>}>
				<RouterProvider router={
					createBrowserRouter([
						{
							path: "/",
							element: <HomePage/>,
						},
						{
							path: "/login",
							element: <LoginPage/>,
						},
						{
							path: "/cadastro",
							element: <SignupPage/>,
						},
						{
							path: "/cadastro/confirmeSeuEmail",
							element: <SignupNextStepPage/>,
						},
						{
							path: "/verificacao/:verificationEmailCode",
							element: <EmailVerificationPage/>,
						},
						{
							path: "/produto/:productId",
							element: <ProductPage/>,
						},
						{
							path: "*",
							element: <NotFoundPage/>,
						},
					])
				}/> 
			</React.Suspense>
		);

}

export default App;
