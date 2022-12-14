import { NavLink } from "react-router-dom";

export const sliderItems = [
	{
		id: 1,
		img: "https://i.ibb.co/cXFnLLV/3.png",
		title: (
			<NavLink style={{ color: "black" }} to='/shop'>
				Buy&Sell
			</NavLink>
		),
		desc: "New Arrivals!!",
		bg: "f5fafd",
	},
	{
		id: 2,
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOm3J8udvv4ElTDt6e-ijl5FL_p_k3F9P0eg&usqp=CAU",
		title: (
			<NavLink style={{ color: "black" }} to='/carpool'>
				Car Pool
			</NavLink>
		),
		desc: "POOL YOUR VEHICLE HERE, AND SAVE MONEY!!",
		bg: "fcf1ed",
	},
	{
		id: 3,
		img: "https://nationaltoday.com/wp-content/uploads/2022/07/5-Recycle-Awareness-Week.jpg.webp",
		title: (
			<NavLink style={{ color: "black" }} to='/recycle'>
				Recycle
			</NavLink>
		),
		desc: "DON'T THROW IT, RECYCLE IT!!",
		bg: "fbf0f4",
	},
];

export const BuySell = [
	{
		id: 1,
		img: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		button: (
			<NavLink style={{ color: "black" }} to='/shop'>
				Buy and Sell
			</NavLink>
		),
	},
];

export const CarPool = [
	{
		id: 1,
		img: "https://media.istockphoto.com/id/1154420286/photo/man-entering-ride-sharing-car.jpg?s=612x612&w=0&k=20&c=I2kHUNC_Tc0YEtzBgXhN2es_I-4FmGRLaFaQUkDytSM=",
		button: (
			<NavLink style={{ color: "black" }} to='/carpool'>
				Car Pooling
			</NavLink>
		),
	},
];

export const Recycle = [
	{
		id: 1,
		img: "https://www.nspackaging.com/wp-content/uploads/sites/4/2019/03/shutterstock_1492626947.jpg",
		button: (
			<NavLink style={{ color: "black" }} to='/recycle'>
				Recycle
			</NavLink>
		),
	},
];

export const popularProducts = [
	{
		id: 1,
		img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
		title: "H&M",
		desc: "$10",
	},
	{
		id: 2,
		img: "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
		title: "ZARA",
		desc: "$10.5",
	},
	{
		id: 3,
		img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
		title: "NIKE",
		desc: "$12",
	},
	{
		id: 4,
		img: "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
		title: "PARADA",
		desc: "$20",
	},
];

export const AvailableVehicles = [
	{
		id: 1,
		img: "https://media.istockphoto.com/photos/illustration-of-generic-compact-white-car-front-side-view-picture-id1150931120?b=1&k=20&m=1150931120&s=612x612&w=0&h=y9F9VD231jV3hVKDJkOYkzgOpfbIzjk9JYkX8z7Ztpg=",
		title: "TOYOTA",
		desc: "Available",
	},
	{
		id: 2,
		img: "https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?b=1&k=20&m=1157655660&s=612x612&w=0&h=ekNZlV17a3wd_yN9PhHXtIabO_zFo4qipCy2AZRpWUI=",
		title: "HONDA",
		desc: "Available",
	},
	{
		id: 3,
		img: "//media.istockphoto.com/photos/illustration-of-generic-compact-white-car-front-side-view-picture-id1150931120?b=1&k=20&m=1150931120&s=612x612&w=0&h=y9F9VD231jV3hVKDJkOYkzgOpfbIzjk9JYkX8z7Ztpg=",
		title: "MAHINDRA",
		desc: "Available",
	},
	{
		id: 4,
		img: "https://media.istockphoto.com/photos/generic-red-suv-on-a-white-background-side-view-picture-id1157655660?b=1&k=20&m=1157655660&s=612x612&w=0&h=ekNZlV17a3wd_yN9PhHXtIabO_zFo4qipCy2AZRpWUI=",
		title: "BMW",
		desc: "Available",
	},
];

export const recycledProducts = [
	{
		id: 1,
		img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
		title: "Biodegradable",
	},
	{
		id: 2,
		img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
		title: "Non-Biodegradable",
	},
	{
		id: 3,
		img: "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
		title: "Biodegradable",
	},
	{
		id: 4,
		img: "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
		title: "Non-Biodegradable",
	},
];
