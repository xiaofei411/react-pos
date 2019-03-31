const _showId = state => state.modal.id;

export const toShowId = state => _showId(state);
export const toHideId = state => _showId(state);