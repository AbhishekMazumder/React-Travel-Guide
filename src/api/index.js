import axios from 'axios';

const URL =
	'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw, ne) => {
	try {
		const {
			data: { data }
		} = await axios.get(URL, {
			params: {
				bl_latitude: sw.lat,
				tr_latitude: ne.lat,
				bl_longitude: sw.lng,
				tr_longitude: ne.lng,
			},
			headers: {
				'x-rapidapi-key': '4600c5656cmshf7cb4d02ac33f17p15b0e2jsn41bd1b0c4bde',
				'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
			},
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};
