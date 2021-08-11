import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

// import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

const Map = ({
	coordinates,
	places,
	setCoordinates,
	setBounds,
	setChildClicked,
	weatherData,
}) => {
	const matches = useMediaQuery('(min-width:600px)');
	const classes = useStyles();

	// mock coordinates
	// const coordinates = { lat: 0, lng: 0 };

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyDxv6R1PXhQnQqOoB6K9rJes0B3lcusbfE' }}
				defaultCenter={coordinates}
				center={coordinates}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={''}
				onChange={e => {
					setCoordinates({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
				}}
				onChildClick={''}
			></GoogleMapReact>
		</div>
	);
};

export default Map;
