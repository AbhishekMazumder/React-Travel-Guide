import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat,
					tr_latitude: ne.lat,
					bl_longitude: sw.lng,
					tr_longitude: ne.lng,
				},
				headers: {
					'x-rapidapi-key':
						'4600c5656cmshf7cb4d02ac33f17p15b0e2jsn41bd1b0c4bde',
					'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
				},
			}
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};

// Getting Weather Data from Open Weather Map Of RapidAPI
export const getWeatherData = async (lat, lng) => {
	try {
		if (lat && lng) {
			const { data } = await axios.get(
				'https://community-open-weather-map.p.rapidapi.com/find',
				{
					params: { lat, lon: lng },
					headers: {
						'x-rapidapi-key':
							'4600c5656cmshf7cb4d02ac33f17p15b0e2jsn41bd1b0c4bde',
						'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
					},
				}
			);
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};
