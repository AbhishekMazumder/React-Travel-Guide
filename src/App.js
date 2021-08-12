import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header.jsx';
import List from './components/List/List.jsx';
import Map from './components/Map/Map.jsx';
import { getPlacesData } from './api/index';

function App() {
	const [places, setPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [filteredPlaces, setFilteredPlaces] = useState([]);

	const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState('');

	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Getting User's Geo-Location during app starts
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	// Filtering Places Based On Rating
	useEffect(() => {
		const filteredPlaces = places.filter(place => place.rating > rating);
		setFilteredPlaces(filteredPlaces);
	}, [rating]);

	// Getting/Fetching The Places
	useEffect(() => {
		setIsLoading(true);
		getPlacesData(type, bounds.ne, bounds.sw).then(data => {
			setPlaces(data);
			setFilteredPlaces([]);
			setIsLoading(false);
		});
	}, [coordinates, bounds, type]);

	return (
		<>
			<CssBaseline />
			<Header />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List
						places={filteredPlaces.length ? filteredPlaces : places}
						childClicked={childClicked}
						isLoading={isLoading}
						type={type}
						setType={setType}
						rating={rating}
						setRating={setRating}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						setCoordinates={setCoordinates}
						setBounds={setBounds}
						coordinates={coordinates}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChildClicked={setChildClicked}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
