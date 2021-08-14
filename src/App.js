import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header.jsx';
import List from './components/List/List.jsx';
import Map from './components/Map/Map.jsx';
import { getPlacesData, getWeatherData } from './api/index';

const App = () => {
	const [places, setPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState({});
	const [filteredPlaces, setFilteredPlaces] = useState([]);

	const [autocomplete, setAutocomplete] = useState('');

	const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState('');

	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [weatherData, setWeatherData] = useState([]);

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
		if (bounds.sw && bounds.ne) {
			setIsLoading(true);

			getWeatherData(coordinates.lat, coordinates.lng).then(data => setWeatherData(data));

			getPlacesData(type, bounds.ne, bounds.sw).then(data => {
				setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
				setFilteredPlaces([]);
				setIsLoading(false);
			});
		}
	}, [bounds, type]);

	const onLoad = autoC => setAutocomplete(autoC);

	const onPlaceChanged = () => {
		const lat = autocomplete.getPlace().geometry.location.lat();
		const lng = autocomplete.getPlace().geometry.location.lng();

		setCoordinates({ lat, lng });
	};

	return (
		<>
			<CssBaseline />
			<Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
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
						weatherData={weatherData}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default App;
