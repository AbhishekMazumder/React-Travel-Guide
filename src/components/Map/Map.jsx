import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import {mapStyles} from './mapStyles';
import useStyles from './styles.js';
import resturantImg from '../../images/resturantImg.jpg';

const Map = ({
	coordinates,
	places,
	setCoordinates,
	setBounds,
	setChildClicked,
	weatherData,
}) => {
	
	const classes = useStyles();
	const isDesktop = useMediaQuery('(min-width:600px)');
	

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
				options={{
					disableDefaultUI: true,
					zoomControl: true,
					styles: mapStyles,
				}}
				onChange={e => {
					setCoordinates({ lat: e.center.lat, lng: e.center.lng });
					setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
				}}
				onChildClick={child => setChildClicked(child)}
			>
				{places?.map((place, i) => (
					<div
						key={i}
						className={classes.markerContainer}
						lat={Number(place.latitude)}
						lng={Number(place.longitude)}
					>
						{!isDesktop ? (
							<LocationOnOutlinedIcon color="primary" fontSize="large" />
						) : (
							<Paper elevation={3} className={classes.paper}>
								<Typography
									className={classes.typography}
									gutterBottom
									variant="subtitle2"
								>
									{place.name}
								</Typography>
								<img
									className={classes.pointer}
									src={
										place.photo ? place.photo.images.large.url : resturantImg
									}
									alt={place.name}
								/>
								<Rating size="small" value={Number(place.rating)} readOnly />
							</Paper>
						)}
					</div>
				))}
				{weatherData?.list?.length &&
					weatherData.list.map((data, i) => (
						<div key={i} lat={data.coord.lat} lng={data.coord.lon}>
							<img
								src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
								height="60px"
							/>
						</div>
					))}
			</GoogleMapReact>
		</div>
	);
};

export default Map;
