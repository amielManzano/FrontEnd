import {useEffect } from 'react';
import Router from 'next/router';

export default function index(){
    function unsetUser(){
        localStorage.clear()
    }
	useEffect(() => {
		unsetUser();
		Router.push('/register');
	}, [])

	return null;
}
