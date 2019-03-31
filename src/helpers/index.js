export const keyMirror = obj => {
	if (!obj) return {};

	for (var key in obj) obj[key] = key;

	return obj;
};