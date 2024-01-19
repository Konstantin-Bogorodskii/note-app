import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Tag, UniqueId } from '../../types/types';

const initialState: Tag[] = [];

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		createTag(state, action: PayloadAction<string>) {
			state.push({
				id: nanoid(),
				label: action.payload
			});
		},
		removeTag(state, action: PayloadAction<UniqueId>) {
			state = state.filter(tag => tag.id !== action.payload);
		},
		updateTag(state, action: PayloadAction<Tag>) {
			state = state.map(tag => {
				if (tag.id === action.payload.id) {
					return { ...tag, label: action.payload.label };
				} else {
					return tag;
				}
			});
		}
	}
});

export const { createTag, removeTag, updateTag } = tagsSlice.actions;

export default tagsSlice.reducer;
