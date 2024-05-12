import { lab } from 'd3-color';

export function contrastingColor(color) {
	const colorLab = lab(color);

	const MIN_DIFF = 50;
	const MAX_DIFF = 90;

	let l = colorLab.l;
	let output = 100 - l;
	let contrast = Math.abs(l - output);
	let textColor;
	let hoverBgColor;
	let textOutlineColor;

	if (l < output) {
		if (contrast < MIN_DIFF) {
			output = l + MIN_DIFF;
		} else if (contrast > MAX_DIFF) {
			output = l + MAX_DIFF;
		}

		textColor = lab(output, colorLab.a, colorLab.b);
		textOutlineColor = 'rgba(0, 0, 0, 0.5)';
		hoverBgColor = colorLab.brighter();
	} else {
		if (contrast < MIN_DIFF) {
			output = l - MIN_DIFF;
		} else if (contrast > MAX_DIFF) {
			output = l - MAX_DIFF;
		}

		textColor = lab(output, colorLab.a, colorLab.b);
		textOutlineColor = 'rgba(255, 255, 255, 0.5)';
		hoverBgColor = colorLab.darker();
	}

	return {
		textColor: textColor.formatRgb(),
		textOutlineColor,
		hoverBgColor: hoverBgColor.formatRgb()
	};
}

export const partyColors = {
	AAP: {
		fullName: 'Aam Aadmi Party',
		backgroundColor: '#0072b0',
		textColor: '#FFFFFF'
	},
	AIADMK: {
		fullName: 'All India Anna Dravida Munnetra Kazhagam',
		backgroundColor: '#009546',
		textColor: '#FFFFFF'
	},
	AIMIM: {
		fullName: 'All India Majlis-E-Ittehadul Muslimeen',
		backgroundColor: '#0c6b4b',
		textColor: '#FFFFFF'
	},
	AINRC: {
		fullName: 'All India N.R. Congress',
		backgroundColor: '#fda209',
		textColor: '#FFFFFF'
	},
	AIUDF: {
		fullName: 'All India United Democratic Front',
		backgroundColor: '#348017',
		textColor: '#000000'
	},
	AJSU: {
		fullName: 'All Jharkhand Students Union',
		backgroundColor: '#6827b5',
		textColor: '#FFFFFF'
	},
	AIFB: {
		fullName: 'All India Forward Bloc',
		backgroundColor: '#ac1313',
		textColor: '#FFFFFF'
	},
	BJD: {
		fullName: 'Biju Janata Dal',
		backgroundColor: '#70a548',
		textColor: '#000000'
	},
	BJP: {
		fullName: 'Bharatiya Janata Party',
		backgroundColor: '#ff9933',
		textColor: '#FFFFFF'
	},
	BSP: {
		fullName: 'Bahujan Samaj Party',
		backgroundColor: '#22409a',
		textColor: '#FFFFFF'
	},
	CPIML: {
		fullName: 'Communist Party of India (Marxist-Leninist)',
		backgroundColor: '#ff0000',
		textColor: '#FFFFFF'
	},
	BPF: {
		fullName: "Bodoland People's Front",
		backgroundColor: '#ff6600',
		textColor: '#FFFFFF'
	},
	'CPI(M)': {
		fullName: 'Communist Party of India (Marxist)',
		backgroundColor: '#cc0d0d',
		textColor: '#000000'
	},
	DMDK: {
		fullName: 'Desiya Murpokku Dravida Kazhagam',
		backgroundColor: '#ffea19',
		textColor: '#000000'
	},
	DMK: {
		fullName: 'Dravida Munnetra Kazhagam',
		backgroundColor: '#ff0d0d',
		textColor: '#ffffff'
	},
	GFP: {
		fullName: 'Goa Forward Party',
		backgroundColor: '#353982',
		textColor: '#000000'
	},
	INC: {
		fullName: 'Indian National Congress',
		backgroundColor: '#19aaed',
		textColor: '#FFFFFF'
	},
	INLD: {
		fullName: 'Indian National Lok Dal',
		backgroundColor: '#336600',
		textColor: '#FFFFFF'
	},
	IUML: {
		fullName: 'Indian Union Muslim League',
		backgroundColor: '#006600',
		textColor: '#FFFFFF'
	},
	JCC: {
		fullName: 'Janta Congress Chhattisgarh',
		backgroundColor: '#ffc0db',
		textColor: '#000000'
	},
	JD: {
		fullName: 'Janata Dal',
		backgroundColor: '#2e8b57',
		textColor: '#000000'
	},
	JDU: {
		fullName: 'Janata Dal (United)',
		backgroundColor: '#003366',
		textColor: '#ffffff'
	},
	JKNC: {
		fullName: 'Jammu & Kashmir National Conference',
		backgroundColor: '#fe0000',
		textColor: '#FFFFFF'
	},
	JJP: {
		fullName: 'Jannayak Janata Party',
		backgroundColor: '#026d37',
		textColor: '#FFFFFF'
	},
	MNF: {
		fullName: 'Mizo National Front',
		backgroundColor: '#2e5694',
		textColor: '#FFFFFF'
	},
	MNS: {
		fullName: 'Maharashtra Navnirman Sena',
		backgroundColor: '#5f2301',
		textColor: '#FFFFFF'
	},
	NCP: {
		fullName: 'Nationalist Congress Party',
		backgroundColor: '#00b2b2',
		textColor: '#FFFFFF'
	},
	NPF: {
		fullName: "Naga People's Front",
		backgroundColor: '#1717cc',
		textColor: '#FFFFFF'
	},
	PDP: {
		fullName: 'Peoples Democratic Party',
		backgroundColor: '#ed1c24',
		textColor: '#FFFFFF'
	},
	MPC: {
		fullName: "Mizoram People's Conference",
		backgroundColor: '#fd7793',
		textColor: '#FFFFFF'
	},
	PDF: {
		fullName: "People's Democratic Front",
		backgroundColor: '#ffff34',
		textColor: '#FFFFFF'
	},
	PPA: {
		fullName: "People's Party of Arunachal",
		backgroundColor: '#008000',
		textColor: '#FFFFFF'
	},
	PMK: {
		fullName: 'Pattali Makkal Katchi',
		backgroundColor: '#ffff00',
		textColor: '#FFFFFF'
	},
	RLD: {
		fullName: 'Rashtriya Lok Dal',
		backgroundColor: '#006400',
		textColor: '#000000'
	},
	RLP: {
		fullName: 'Rashtriya Loktantrik Party',
		backgroundColor: '#ffd42a',
		textColor: '#000000'
	},
	RJD: {
		fullName: 'Rashtriya Janata Dal',
		backgroundColor: '#056d05',
		textColor: '#FFFFFF'
	},
	RSP: {
		fullName: 'Revolutionary Socialist Party',
		backgroundColor: '#d84c4c',
		textColor: '#FFFFFF'
	},
	SAD: {
		fullName: 'Shiromani Akali Dal',
		backgroundColor: '#0f204a',
		textColor: '#FFFFFF'
	},
	SDF: {
		fullName: 'Sikkim Democratic Front',
		backgroundColor: '#fbec5d',
		textColor: '#FFFFFF'
	},
	SHS: {
		fullName: 'Shiv Sena',
		backgroundColor: '#f37020',
		textColor: '#FFFFFF'
	},
	SP: {
		fullName: 'Samajwadi Party',
		backgroundColor: '#ff2222',
		textColor: '#FFFFFF'
	},
	BRS: {
		fullName: 'Bharat Rashtra Samithi',
		backgroundColor: '#f84996',
		textColor: '#FFFFFF'
	},
	TDP: {
		fullName: 'Telugu Desam Party',
		backgroundColor: '#ffed00',
		textColor: '#FFFFFF'
	},
	YSRCP: {
		fullName: 'Yuvajana Sramika Rythu Congress Party',
		backgroundColor: '#1569c7',
		textColor: '#FFFFFF'
	},
	JMM: {
		backgroundColor: '#337316',
		textColor: 'white',
		fullName: 'Jharkhand Mukti Morcha'
	},
	CPI: {
		backgroundColor: '#cb0922',
		textColor: 'white',
		fullName: 'Communist Party of India'
	},
	VCK: {
		backgroundColor: '#1e90ff',
		textColor: 'black',
		fullName: 'Viduthalai Chiruthaigal Katchi'
	},
	ADS: {
		backgroundColor: '#27176d',
		textColor: 'black',
		fullName: 'Apna Dal (Soneylal)'
	},
	LJP: {
		backgroundColor: '#0093dd',
		textColor: 'black',
		fullName: 'Lok Janshakti Party'
	},
	IND: {
		backgroundColor: '#808080',
		textColor: 'white',
		fullName: 'Independent'
	},
	AITC: {
		backgroundColor: '#20c646',
		textColor: 'white',
		fullName: 'All India Trinamool Congress'
	},
	NPP: {
		backgroundColor: '#ffca61',
		textColor: 'black',
		fullName: 'National People’s Party'
	},
	NDPP: {
		backgroundColor: '#ed1b24',
		textColor: 'black',
		fullName: 'Nationalist Democratic Progressive Party'
	},
	SKM: {
		backgroundColor: '#ed1e26',
		textColor: 'white',
		fullName: 'Sikkim Krantikari Morcha'
	},
	JDS: {
		backgroundColor: '#02865a',
		textColor: 'white',
		fullName: 'Janata Dal (Secular)'
	}
};
