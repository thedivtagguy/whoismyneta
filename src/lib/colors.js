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
	party_x: { backgroundColor: 'color_x', textColor: 'black' },
	BJP: { backgroundColor: '#FF9933', textColor: 'black' },
	INC: { backgroundColor: '#0000CC', textColor: 'white' },
	BSP: { backgroundColor: '#660099', textColor: 'white' },
	SAD: { backgroundColor: '#FF0000', textColor: 'white' },
	AAP: { backgroundColor: '#008000', textColor: 'white' },
	AIUDF: { backgroundColor: '#008080', textColor: 'white' },
	SHS: { backgroundColor: '#FF9933', textColor: 'black' },
	NCP: { backgroundColor: '#FF6600', textColor: 'black' },
	'Revolutionary Socialist Party': { backgroundColor: '#FF0000', textColor: 'white' },
	'CPI(M)': { backgroundColor: '#FF0000', textColor: 'white' },
	DMK: { backgroundColor: '#FF0000', textColor: 'white' },
	YSRCP: { backgroundColor: '#006400', textColor: 'white' },
	'Kerala Congress (M)': { backgroundColor: '#FFFF00', textColor: 'black' },
	IUML: { backgroundColor: '#008000', textColor: 'white' },
	'Jammu & Kashmir National Conference': { backgroundColor: '#0066CC', textColor: 'white' },
	AIADMK: { backgroundColor: '#0066CC', textColor: 'white' },
	TDP: { backgroundColor: '#008080', textColor: 'white' },
	TRS: { backgroundColor: '#FF0000', textColor: 'white' },
	AIMIM: { backgroundColor: '#008080', textColor: 'white' },
	'JD(U)': { backgroundColor: '#FF0000', textColor: 'white' },
	JMM: { backgroundColor: '#000080', textColor: 'white' },
	CPI: { backgroundColor: '#FF0000', textColor: 'white' },
	'Viduthalai Chiruthaigal Katchi': { backgroundColor: '#FFA500', textColor: 'black' },
	'Apna Dal (Soneylal)': { backgroundColor: '#FFD700', textColor: 'black' },
	SP: { backgroundColor: '#0000FF', textColor: 'white' },
	LJP: { backgroundColor: '#FFA500', textColor: 'black' },
	'AJSU Party': { backgroundColor: '#0066CC', textColor: 'white' },
	IND: { backgroundColor: '#808080', textColor: 'white' },
	BJD: { backgroundColor: '#FF6600', textColor: 'black' },
	AITC: { backgroundColor: '#008000', textColor: 'white' },
	NPP: { backgroundColor: '#FFA500', textColor: 'black' },
	NPF: { backgroundColor: '#FFA500', textColor: 'black' },
	MNF: { backgroundColor: '#008000', textColor: 'white' },
	'Nationalist Democratic Progressive Party': { backgroundColor: '#FF6600', textColor: 'black' },
	'Sikkim Krantikari Morcha': { backgroundColor: '#FF0000', textColor: 'white' },
	'Rashtriya Loktantrik Party': { backgroundColor: '#FFA500', textColor: 'black' },
	'JD(S)': { backgroundColor: '#FF0000', textColor: 'white' }
};
